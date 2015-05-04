#Cagliari Open Data SDK for node.js
Basic node.js libraries to use Cagliari Open Data API endpoints.


##Supported Datasets and Endpoints

- Traffic

##Installation

#TBD
`npm install cagliari-opendata`

##Basic Example
```js
var opendata = require('cagliari-opendata');
var traffic = opendata.traffic;

traffic.getStations(function(err, stations){

        if(!err){
                    console.log(stations);
        }

});
```

#API

All functions are asynchronous, thus a `callback(err, data)` is *mandatory* as the last parameter in a call.


* <a href="#getStations"><code>traffic.<b>getStations()</b></code></a>
* <a href="#getStation"><code>traffic.<b>getStation()</b></code></a>
* <a href="#getStationData"><code>traffic.<b>getStationData</b></code></a>
* <a href="#getSensorData"><code>traffic.<b>getSensorData()</b></code></a>

----------------------------------------------------------
<a name="getStations"></a>
### getStations(cb)

Gets all available traffic stations installed in the city.

A JSON is returned.

-----------------------------------------------------------
<a name="getStation"></a>
### getStation(id, cb)
Gets info about a particular station given its `id`
A JSON is returned.

- `id` is the numeric or String id of the station

-----------------------------------------------------------
<a name="getStationData"></a>
### getStationData(id, startDate, endDate, cb)
Gets measurement data from all the sensors in a station, given its id

- `id` is the numeric or string id of the station
- `startDate` a Date representing the start date/time for required measurements (mandatory)
- `endDate` a Date representing the end date/time for required measurements (optional)

------------------------------------------------------------
<a name="getSensorData"></a>
### getSensorData(id, startDate, endDate, cb)
Gets measurement data from for a specific sensor, given its id

- `id` is the numeric or string id of the sensor
- `startDate` a Date representing the start date/time for required measurements (mandatory)
- `endDate` a Date representing the end date/time for required measurements (optional)


##Links

- [Cagliari Open Data Portal](http://www.comune.cagliari.it/portale/it/api_rest.page)

##Contributors

<table><tbody>
<tr><th align="left">Antonio Pintus</th><td><a href="https://github.com/pintux">GitHub/pintux</a></td><td><a href="https://twitter.com/apintux">Twitter/@apintux</a></td></tr>

</tbody></table>


##License - "MIT License"
Copyright (c) 2015 Paraimpu srl, https://www.paraimpu.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

