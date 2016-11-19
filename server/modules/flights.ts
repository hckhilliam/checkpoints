import * as fetch from 'node-fetch';
import * as queryString from 'querystring';
import * as dateformat from 'dateformat';

export function getFlights(query: CheckpointsServer.FlightQuery): Promise<CheckpointsServer.Flight[]> {

  let body = {
    originplace: query.originCode,
    destinationplace: query.destinationCode,
    outbounddate: dateformat(query.departureDate, 'yyyy-mm-dd'),
    apiKey: process.env['SKYSCANNER_APIKEY'],
    Country: 'CA',
    currency: 'CAD',
    locale: 'en-US',
    adults: 1,
    locationschema: 'Iata',
  };

  console.log('body: ', body);
  
  let init: _fetch.RequestInit = {
    method: 'POST',
    body: queryString.stringify(body)
  }

  let headers = {} as _fetch.Headers;
  headers['Accept-header'] = 'application/json';
  headers['Content-Type'] = 'application/x-www-form-urlencoded';
  init.headers = headers;
  
  return fetch('http://partners.api.skyscanner.net/apiservices/pricing/v1.0', init).then(res => {
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
      return flightsList.map(normalizeFlight);
    });
  });
}

function normalizeFlight(flight): CheckpointsServer.Flight {
  flight.url = flight.DeeplinkUrl;
  delete flight.DeeplinkUrl;
  return flight as CheckpointsServer.Flight;
}
