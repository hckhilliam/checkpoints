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

const hardcodedOriginCode = 'YTOA-sky';
const hardcodedOriginName = 'Toronto';

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
    apiKey: process.env['SKYSCANNER_APIKEY'],
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
    let sessionLocation = res.headers['_headers']['location'][0];
    sessionLocation = sessionLocation + "?" + queryString.stringify({apiKey: process.env['SKYSCANNER_APIKEY']});

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
    apiKey: process.env['SKYSCANNER_APIKEY'] 
  };
  var url = api + autoSuggestapi + market + "/" + currency + "/" + locale + "/?" + queryString.stringify(queryObject);
  return fetch(url).then(res => { 
    return res.json().then(obj => obj['Places']);
  });
}

//If a place is a country, instead of a city or airport, it is not usable for searching
export function cleansePlaces(places: Skyscanner.Place[]) {
  return places.filter(place => place.CityId != '-sky');
}

export function searchUserFlights(user: CheckpointsServer.User): Promise<CheckpointsServer.Flight> {
  return getActiveCheckpoints(user._id).then(ret => {
    let checkpoints = ret as any as CheckpointsServer.Checkpoint[];
    let titlesConcated = checkpoints.map(checkpoint => checkpoint.title).join(" ");

    let destinations = Array.from(searchablePlaces).filter(destination => titlesConcated.includes(destination));
    
    return Promise.all(destinations.map(destination => {
      return autoSuggest(destination).then(places => {
        places = cleansePlaces(places);
        if (places.length == 0) {
          return Promise.resolve(null);
        }

        let place = places[0];
        
        let query: CheckpointsServer.FlightQuery = {
          originName: hardcodedOriginName,
          originCode: hardcodedOriginCode,
          destinationName: place.PlaceName,
          destinationCode: place.PlaceId
        }
        return getFlights(query).then(flights => {
          return flights.length == 0 ? null : flights[0];
        });
      });
    })).then(results => {
      // debug('results : ', results);
      return results.filter((place) => place != null); 
    });
  });
}

const places = [
  'United States',
  'China',
  'Spain',
  'France',
  'United Kingdom',
  'Thailand',
  'Italy',
  'Germany',
  'Hong Kong',
  'Macau',
  'Australia',
  'Turkey',
  'Shanghai',
  'Pattaya',
  'Miami',
  'Phuket',
  'Guangzhou',
  'Taipei',
  'Rome',
  'Seoul',
  'Dubai',
  'Antalya',
  'Kuala Lumpur',
  'Istanbul',
  'New York',
  'Shenzhen',
  'Paris',
  'Bangkok',
  'Singapore',
  'London',
];
const searchablePlaces = new Set(places);
