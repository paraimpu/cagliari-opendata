var test = require('unit.js');
var should = test.should;
var dateFormat = require('dateformat');


var opendata = require('../index');
var traffic = opendata.traffic;

describe('Traffic Client', function(){

    describe('getStations', function(){
        it('must return a not empty and valid JSON with stations key', function(done){
            traffic.getStations(function(err, stations){
                should(stations).be.ok;
                should(stations).have.property('stations');
                done();

            });

        })
    });

    describe('getStations', function(){
        it('a station must have id and description fields', function(done){
            traffic.getStations(function(err, stations){
                var s = stations.stations[0];
                should(s).be.ok;
                should(s).have.property('id');
                should(s).have.property('descrizione');

                done();

            });

        })
    });


    describe('getStationData for a valid id', function(){
        it('data must be not null', function(done){
            var s = new Date();
            var end = new Date();
            var start = s.setMinutes(s.getMinutes()-60);

            traffic.getStationData(1, start, end, function(err, data){
                data.should.be.ok;
                data.should.have.property('misurazioni');
                if(data.misurazioni.numeroMisurazioni > 0 && data.misurazioni.misurazione.length) {
                    data.misurazioni.misurazione[0].should.have.property('flusso');
                    data.misurazioni.misurazione[0].should.have.property('velocita');
                }
                done();

            });

        })
    });

    describe('getStationData with wrong id', function(){
        it('should return an error', function(done){
            var s = new Date();
            var end = new Date();
            var start = s.setMinutes(s.getMinutes()-60);

            traffic.getStationData(9999, start, end, function(err, data){
                should(data).not.be.ok;
                err.should.be.ok;
                err.error.should.be.ok;

                done();

            });

        })
    });

    describe('getStationData with no end date', function(){
        it('should be OK', function(done){
            var s = new Date();
            var start = s.setMinutes(s.getMinutes()-60);

            traffic.getStationData(2, start, function(err, data){
                should(data).be.ok;
                should(err).be.not.ok;

                done();

            });

        })
    });


    describe('getStation', function(){
        it('a station must have id, nome and description fields', function(done){
            traffic.getStation('2', function(err, station){
                should(station).be.ok;
                should(station).have.property('id');
                should(station).have.property('nome');
                should(station).have.property('descrizione');
                should(err).not.be.ok;
                done();

            });

        })
    });


    describe('getStation with a wrong id', function(){
        it('should return an error object', function(done){
            traffic.getStation('12345', function(err, station){
                err.should.be.ok;
                err.error.should.be.ok;
                should(station).not.be.ok;
                done();

            });

        })
    });

    describe('getStation with missing id', function(){
        it('should return an error object', function(done){
            traffic.getStation('', function(err, station){
                err.should.be.ok;
                err.error.should.be.ok;
                should(station).not.be.ok;

                done();

            });

        })
    });

    describe('getSensorData for a valid id', function(){
        it('data must be not null', function(done){
            var s = new Date();
            var end = new Date();
            var start = s.setMinutes(s.getMinutes()-60);

            traffic.getSensorData(2, start, end, function(err, data){
                data.should.be.ok;
                data.should.have.property('misurazioni');
                data.should.have.property('postazione');
                data.should.have.property('sensore');
                if(data.misurazioni.numeroMisurazioni > 0 && data.misurazioni.misurazione.length) {
                    data.misurazioni.misurazione[0].should.have.property('flusso');
                    data.misurazioni.misurazione[0].should.have.property('velocita');
                }
                done();

            });

        })
    });

    describe('getSensorData with no endDate', function(){
        it('data must be not null', function(done){
            var s = new Date();

            var start = s.setMinutes(s.getMinutes()-60);

            traffic.getSensorData(2, start, function(err, data){
                data.should.be.ok;
                data.should.have.property('misurazioni');
                data.should.have.property('postazione');
                data.should.have.property('sensore');
                if(data.misurazioni.numeroMisurazioni > 0 && data.misurazioni.misurazione.length) {
                    data.misurazioni.misurazione[0].should.have.property('flusso');
                    data.misurazioni.misurazione[0].should.have.property('velocita');
                }
                done();

            });

        })
    });

    describe('getSensorData with wrong id', function(){
        it('should return an error', function(done){
            var s = new Date();
            var end = new Date();
            var start = s.setMinutes(s.getMinutes()-60);

            traffic.getSensorData(9999, start, end, function(err, data){
                should(data).not.be.ok;
                err.should.be.ok;
                err.error.should.be.ok;

                done();

            });

        })
    });

    describe('getSensorData with not valid date start date and no end date', function(){
        it('data must be null and en Error must be raised', function(done){

            var start = '2016-13-01';

            traffic.getSensorData(2, start, function(err, data){
                should(data).not.be.ok;
                err.should.be.ok;
                done();
            });
        })
    });

    describe('getSensorData with a valid date start date and no valid end date', function(){
        it('data must be null and en Error must be raised', function(done){

            var start = new Date();
            var end = '2016-13-01';

            traffic.getSensorData(2, start, end, function(err, data){
                should(data).not.be.ok;
                err.should.be.ok;
                done();
            });
        })
    });

    describe('getSensorData  with an interval > 24h', function(){
        it('data must be null and en Error must be raised', function(done){

            var start = new Date('October 13, 2015 11:13:00');

            traffic.getSensorData(2, start, function(err, data){
                should(data).not.be.ok;
                err.should.be.ok;
                done();
            });
        })
    });


    describe('getStationData with not valid start date and no end date', function(){
        it('data must be null and en Error must be raised', function(done){
            var start = '2016-13-01';

            traffic.getStationData(2, start, function(err, data){
                should(data).not.be.ok;
                err.should.be.ok;
                done();

            });

        })
    });

    describe('getStationData with a valid date start date and no valid end date', function(){
        it('data must be null and en Error must be raised', function(done){
            var start = new Date();
            var end = '2016-13-01';

            traffic.getStationData(2, start, function(err, data){
                should(data).not.be.ok;
                err.should.be.ok;
                done();
            });

        })
    });

    describe('getStationData with an interval > 24h', function(){
        it('data must be null and en Error must be raised', function(done){
            var start = new Date('October 13, 2015 11:13:00');
            traffic.getStationData(2, start, function(err, data){
                should(data).not.be.ok;
                err.should.be.ok;
                done();
            });

        })
    });

});
