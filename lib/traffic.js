/*
 The MIT License (MIT)

 Copyright (c) 2015-2016 Paraimpu srl, https://www.paraimpu.com

 Permission is hereby granted, free of charge, to any person
 obtaining a copy of this software and associated documentation
 files (the "Software"), to deal in the Software without
 restriction, including without limitation the rights to use,
 copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following
 conditions:
 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 OTHER DEALINGS IN THE SOFTWARE.
 */

"use strict";


var conf = require('./conf');
var debug = require('debug')('lib:traffic');
var util = require('util');
var request = require('request');
var _ = require('lodash');
var dateFormat = require('dateformat');


debug("Configuration is: "+ util.inspect(conf));



//get all available stations
exports.getStations = function(cb){
    request(conf.endpoints.traffic.stations, function (error, response, body) {
        try {
            var data = JSON.parse(body).response;
            if (!error && response.statusCode === 200) {
                return cb(null, {stations: data.result.items.item});
            } else {
                return cb(data.errors, null);
            }
        }catch(exception){
            return cb(new Error('Error calling Stations API endpoint'), null);
        }
    });

};

//get a single station
exports.getStation = function(id, cb){
    request(conf.endpoints.traffic.station+'?id='+id, function (error, response, body) {
        try {
            var data = JSON.parse(body).response;
            if (!error && response.statusCode === 200) {
                return cb(null, data.result.postazione)
            } else {
                return cb(data.errors, null);
            }
        }catch(exception){
            return cb(new Error('Error calling Station API endpoint'), null);
        }
    });

};



//get data from a station by id and data range

exports.getStationData = function(stationId, startDate, endDate, cb){
    try{
        var start = dateFormat(startDate,'yyyymmddHHMM');

        var querystring = '?id='+stationId + '&start='+start;
        if(!(arguments.length < 4 && cb === undefined)) {
            var end = dateFormat(endDate,'yyyymmddHHMM');
            querystring += '&end='+end;

        }else{
            cb = endDate;
        }
    }catch(exception){
        if(arguments.length < 4 && cb === undefined){
            cb = endDate;
        }
        return cb(new Error('Error processing dates, please check them'), null);
    }



    request(conf.endpoints.traffic.stationData + querystring, function (error, response, body) {
        try{
            var data = JSON.parse(body).response;
            if (!error && response.statusCode === 200 && data.result !== 'FAILURE') {
                return cb(null, data.result.misurePostazione);
            }else{
                return cb(data.errors, null);
            }

        }catch(exception){
            return cb(new Error('Error calling Station Data API endpoint'), null);
        }

    });

};


//get data from a sensor by id and data range
exports.getSensorData = function(sensorId, startDate, endDate, cb){

    try{
        var start = dateFormat(startDate,'yyyymmddHHMM');
        var querystring = '?id='+sensorId + '&start='+start;
        if(!(arguments.length < 4 && cb === undefined)) {
            var end = dateFormat(endDate,'yyyymmddHHMM');
            querystring += '&end='+end;
        }else{
            cb = endDate;
        }

    }catch(exception){
        if(arguments.length < 4 && cb === undefined){
            cb = endDate;
        }
        return cb(new Error('Error processing dates, please check them'), null);
    }


    request(conf.endpoints.traffic.sensorData + querystring, function (error, response, body) {
        try{
            var data = JSON.parse(body).response;
            if (!error && response.statusCode === 200 && data.result !== 'FAILURE') {
                return cb(null, data.result.misureSensore);
            }else{
                return cb(data.errors, null);
            }
        }catch(exception){
            return cb(new Error('Error calling Station Data API endpoint'), null);
        }

    });
};