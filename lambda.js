'use strict';

var weather = require('weather-js');

function getWeather(cityName) { 
    return new Promise(function(resolve, reject) {
        weather.find({search: cityName, degreeType: 'C'}, function(err, result) {
            // console.log(JSON.stringify(result, null, 2));
            if(err) { 
                reject(err);
            }
            resolve (result[0].location.name + ': '+ result[0].current.temperature + '°C. ' + result[0].current.skytext);
        });
    });
}

exports.handler = async (event, context) => {
    
    const cityName = event.currentIntent.slots.city;
    return getWeather(cityName).then(result => {
         return {
            'dialogAction': {
                'type': 'Close',
                'fulfillmentState': 'Fulfilled',
                'message': {
                    'contentType': 'PlainText',
                    'content': result
                }
            }
        }
    });

};