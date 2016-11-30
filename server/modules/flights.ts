const debug = require('debug')('checkpoints:flightsModule');

import * as fetch from 'node-fetch';
import * as queryString from 'querystring';
import * as dateformat from 'dateformat';
import { getActiveCheckpoints } from '../modules/checkpoint';

const api = 'http://partners.api.skyscanner.net/apiservices/';
const pricingapi = 'pricing/v1.0/';
const autoSuggestapi = 'autosuggest/v1.0/';

const market = 'CA';
const currency = 'CAD';
const locale = 'en-US';

declare namespace Skyscanner{
   interface Place {
    PlaceId: string;
    PlaceName: string;
    CountryId: string;
    RegionId: string;
    CityId: string;
    CountryName: string;
   }
}

export function getFlights(query: CheckpointsServer.FlightQuery): Promise<CheckpointsServer.Flight[]> {
  if (!query.departureDate) {
    //set query.departureDate to tomorrow
    query.departureDate = new Date();
    query.departureDate.setDate(query.departureDate.getDate() + 1);
  }

  let body = {
    originplace: query.originCode,
    destinationplace: query.destinationCode,
    outbounddate: dateformat(query.departureDate, 'yyyy-mm-dd'),
    apiKey: SERVER_CONFIG['SKYSCANNER_APIKEY'],
    Country: 'CA',
    currency,
    locale,
    adults: 1,
    locationschema: 'Iata',
  };
  let init: _fetch.RequestInit = {
    method: 'POST',
    body: queryString.stringify(body)
  }

  let headers = {} as _fetch.Headers;
  headers['Accept-header'] = 'application/json';
  headers['Content-Type'] = 'application/x-www-form-urlencoded';
  init.headers = headers;

  return fetch(api + pricingapi, init).then(res => {

    //If ['location'] is not defined, then there is a problem happened with the query
    //This can happen if the origin is the same as the destination
    if (!res.headers['_headers']['location']) {
      throw res.json();
    }
    let sessionLocation = res.headers['_headers']['location'][0];
    sessionLocation = sessionLocation + "?" + queryString.stringify({apiKey: SERVER_CONFIG['SKYSCANNER_APIKEY']});

    let fetchResponse;

    let resolvedFlights = function(response, resolve) {
      if (response == undefined || response["status"] == undefined || response["status"] != 200) {
        setTimeout(() => {
          fetch(sessionLocation).then(res => {
            resolvedFlights(res, resolve);
          });
        }, 500);
      } else {
        resolve(response.json());
      }
    }

    let flights = new Promise((resolve, reject) => {
      resolvedFlights(fetchResponse, resolve);
    });

    return flights.then((res) => {

      let itineraries = res['Itineraries'];
      let flightsList = itineraries.map((itinerary) => itinerary["PricingOptions"]);
      flightsList = _.flatten(flightsList);
      return flightsList
        .map(normalizeFlight)
        .map(flight => Object.assign(flight, {
          originName: query.originName,
          destinationName: query.destinationName,
          departureDate: query.departureDate
        })
      );
    });
  });
}

function normalizeFlight(flight): CheckpointsServer.Flight {
  flight.url = flight.DeeplinkUrl;
  delete flight.DeeplinkUrl;
  return flight as CheckpointsServer.Flight;
}

export function autoSuggest(query: string): Promise<Skyscanner.Place[]> {
  let queryObject = {
    query,
    apiKey: SERVER_CONFIG['SKYSCANNER_APIKEY']
  };
  var url = api + autoSuggestapi + market + "/" + currency + "/" + locale + "/?" + queryString.stringify(queryObject);
  return fetch(url).then(res => {
    return res.json().then(obj => obj['Places']);
  });
}

export function autoSuggestOne(query: string): Promise<Skyscanner.Place> {
  return autoSuggest(query).then(places => {
    places = cleansePlaces(places);
    if (places.length == 0) {
      return null;
    }
    return places[0];
  });
}

//If a place is a country, instead of a city or airport, it is not usable for searching
export function cleansePlaces(places: Skyscanner.Place[]) {
  return places.filter(place => place.CityId != '-sky');
}

export function searchUserFlights(user: CheckpointsServer.User): Promise<CheckpointsServer.Flight> {
  let userLocationQuery = user.location.city || user.location.country;
  return Promise.all([
    getActiveCheckpoints(user._id),
    autoSuggestOne(userLocationQuery)
  ]).then(ret => {
    let checkpoints = ret[0] as any as CheckpointsServer.Checkpoint[];
    let titlesConcated = checkpoints.map(checkpoint => checkpoint.title).join("  ").toLowerCase();

    let userLocation = ret[1];
    if (userLocation == null) {
      return Promise.resolve([]);
    }

    let destinations = Array.from(searchablePlaces).filter(destination => titlesConcated.includes(destination.toLowerCase()));

    return Promise.all(destinations.map(destination => {
      return autoSuggestOne(destination).then(place => {
        if (place == null) {
          return Promise.resolve(null);
        }

        let query: CheckpointsServer.FlightQuery = {
          originName: userLocation.PlaceName,
          originCode: userLocation.PlaceId,
          destinationName: place.PlaceName,
          destinationCode: place.PlaceId
        }
        return getFlights(query).then(flights => {
          return flights.length == 0 ? null : flights[0];
        }).catch(error => {
          return null;
        });
      });
    })).then(results => {
      return results.filter((places) => places != null);
    });
  });
}

const places = [
  //http://brilliantmaps.com/top-100-tourist-destinations/
  'Hong Kong', 'Singapore', 'Bangkok', 'London', 'Macau', 'Kuala Lumpur', 'Shenzhen', 'New York City', 'Antalya', 'Paris', 'Istanbul', 'Rome', 'Dubai',
'Guangzhou', 'Phuket', 'Mecca', 'Pattaya', 'Taipei City', 'Prague', 'Shanghai', 'Las Vegas', 'Miami', 'Barcelona', 'Moscow', 'Beijing', 'Los Angeles',
'Budapest', 'Vienna', 'Amsterdam', 'Sofia', 'Madrid', 'Orlando', 'Ho Chi Minh City', 'Lima', 'Berlin', 'Tokyo', 'Warsaw', 'Chennai', 'Cairo', 'Nairobi',
'Hangzhou', 'Milan', 'San Francisco', 'Buenos Aires', 'Venice', 'Mexico City', 'Dublin', 'Seoul', 'Mugla', 'Mumbai', 'Denpasar', 'Delhi', 'Toronto',
'Zhuhai', 'St Petersburg', 'Burgas', 'Sydney', 'Djerba', 'Munich', 'Johannesburg', 'Cancun', 'Edirne', 'Suzhou', 'Bucharest', 'Punta Cana', 'Agra',
'Jaipur', 'Brussels', 'Nice', 'Chiang Mai', 'Sharm el-Sheikh', 'Lisbon', 'East Province', 'Marrakech', 'Jakarta', 'Manama', 'Hanoi', 'Honolulu',
'Manila', 'Guilin', 'Auckland', 'Siem Reap', 'Sousse', 'Amman', 'Vancouver', 'Abu Dhabi', 'Kiev', 'Doha', 'Florence', 'Rio de Janeiro', 'Melbourne',
'Washington D.C.', 'Riyadh', 'Christchurch', 'Frankfurt', 'Baku', 'Sao Paulo', 'Harare', 'Kolkata', 'Nanjing', 'Hong Kong', 'Singapore', 'Thailand',
'UK', 'Macau', 'Malaysia', 'China', 'USA', 'Turkey', 'France', 'Turkey', 'Italy', 'UAE', 'China', 'Thailand', 'Saudi Arabia', 'Thailand', 'Taiwan',
'Czech Republic', 'China', 'USA', 'USA', 'Spain', 'Russia', 'China', 'USA', 'Hungary', 'Austria', 'Netherlands', 'Bulgaria', 'Spain', 'USA', 'Vietnam',
'Peru', 'Germany', 'Japan', 'Poland', 'India', 'Egypt', 'Kenya', 'China', 'Italy', 'USA', 'Argentina', 'Italy', 'Mexico', 'Ireland', 'South Korea',
'Turkey', 'India', 'Indonesia', 'India', 'Canada', 'China', 'Russia', 'Bulgaria', 'Australia', 'Tunisia', 'Germany', 'South Africa', 'Mexico', 'Turkey',
'China', 'Romania', 'Dominican Republic', 'India', 'India', 'Belgium', 'France', 'Thailand', 'Egypt', 'Portugal', 'Saudi Arabia', 'Morocco', 'Indonesia',
'Bahrain', 'Vietnam', 'USA', 'Philippines', 'China', 'New Zealand', 'Cambodia', 'Tunisia', 'Jordan', 'Canada', 'UAE', 'Ukraine', 'Qatar', 'Italy',
'Brazil', 'Australia', 'USA', 'Saudi Arabia', 'New Zealand', 'Germany', 'Azerbaijan', 'Brazil', 'Zimbabwe', 'India', 'China',

//http://www.citymayors.com/statistics/largest-cities-population-125.html
'Tokyo', 'New York Metro', 'Sao Paulo', 'Seoul', 'Mexico City', 'Osaka', 'Manila', 'Mumbai', 'Delhi', 'Jakarta', 'Lagos', 'Kolkata', 'Cairo', 'Los Angeles',
'Buenos Aires', 'Rio de Janeiro', 'Moscow', 'Shanghai', 'Karachi', 'Paris', 'Istanbul', 'Nagoya', 'Beijing', 'Chicago', 'London', 'Shenzhen', 'Essen', 'Tehran',
'Bogota', 'Lima', 'Bangkok', 'Johannesburg', 'Chennai', 'Taipei', 'Baghdad', 'Santiago', 'Bangalore', 'Hyderabad', 'St Petersburg', 'Philadelphia', 'Lahore',
'Kinshasa', 'Miami', 'Ho Chi Minh City', 'Madrid', 'Tianjin', 'Kuala Lumpur', 'Toronto', 'Milan', 'Shenyang', 'Dallas', 'Boston', 'Belo Horizonte', 'Khartoum',
'Riyadh', 'Singapore', 'Washington', 'Detroit', 'Barcelona', 'Houston', 'Athens', 'Berlin', 'Sydney', 'Atlanta', 'Guadalajara', 'San Francisco', 'Montreal.',
'Monterey', 'Melbourne', 'Ankara', 'Recife', 'Phoenix', 'Durban', 'Porto Alegre', 'Dalian', 'Jeddah', 'Seattle', 'Cape Town', 'San Diego', 'Fortaleza',
'Curitiba', 'Rome', 'Naples', 'Minneapolis', 'Tel Aviv', 'Birmingham', 'Frankfurt', 'Lisbon', 'Manchester', 'San Juan', 'Katowice', 'Tashkent', 'Fukuoka',
'Baku', 'St. Louis', 'Baltimore', 'Sapporo', 'Tampa', 'Taichung', 'Warsaw', 'Denver', 'Cologne', 'Hamburg', 'Dubai', 'Pretoria', 'Vancouver', 'Beirut',
'Budapest', 'Cleveland', 'Pittsburgh', 'Campinas', 'Harare', 'Brasilia', 'Kuwait', 'Munich', 'Portland', 'Brussels', 'Vienna', 'San Jose', 'Damman',
'Copenhagen', 'Brisbane', 'Riverside', 'Cincinnati', 'Accra', 'San Bernardino', 'St. Petersburg', 'St. Paul', 'Dusseldorf', 'Kobe', 'Kyoto', 'Yokohama',
'Incheon', 'Fort Worth', 'Sumqayit', 'Japan', 'USA', 'Brazil', 'South Korea', 'Mexico', 'Japan', 'Philippines', 'India', 'India', 'Indonesia', 'Nigeria',
'India', 'Egypt', 'USA', 'Argentina', 'Brazil', 'Russia', 'China', 'Pakistan', 'France', 'Turkey', 'Japan', 'China', 'USA', 'UK', 'China', 'Germany', 'Iran',
'Colombia', 'Peru', 'Thailand', 'South Africa', 'India', 'Taiwan', 'Iraq', 'Chile', 'India', 'India', 'Russia', 'USA', 'Pakistan', 'Congo', 'USA', 'Vietnam',
'Spain', 'China', 'Malaysia', 'Canada', 'Italy', 'China', 'USA', 'USA', 'Brazil', 'Sudan', 'Saudi Arabia', 'Singapore', 'USA', 'USA', 'Spain', 'USA',
'Greece', 'Germany', 'Australia', 'USA', 'Mexico', 'USA', 'Canada', 'Mexico', 'Australia', 'Turkey', 'Brazil', 'USA', 'South Africa', 'Brazil', 'China',
'Saudi Arabia', 'USA', 'South Africa', 'USA', 'Brazil', 'Brazil', 'Italy', 'Italy', 'USA', 'Israel', 'UK', 'Germany', 'Portugal', 'UK', 'Puerto Rico', 'Poland',
'Uzbekistan', 'Japan', 'Azerbaijan', 'USA', 'USA', 'Japan', 'USA', 'Taiwan', 'Poland', 'USA', 'Germany', 'Germany', 'UAE', 'South Africa', 'Canada', 'Lebanon',
'Hungary', 'USA', 'USA', 'Brazil', 'Zimbabwe', 'Brazil', 'Kuwait', 'Germany', 'USA', 'Belgium', 'Austria', 'USA', 'Saudi Arabia', 'Denmark', 'Australia', 'USA',
'USA', 'Ghana'
];
const searchablePlaces = new Set(places);
