var express   = require('express');
server 				= express(),
port 					= process.env.PORT || 3001;

var SigParkPayLoad = require('sigsystem-payloads-sigpark');

var sigpark 		= {};
sigpark.config 	= {
	worktime: [ { start : 0, end : 24 }, { start : 0, end : 24 }, { start : 0, end : 24 }, { start : 0, end : 24 }, { start : 0, end : 24 }, { start : 0, end : 24 }, { start : 0, end : 24 } ],
	timezone: 0,
	sensivity: 2,
	magneticSensivity: 2,
	dataType: 0,
	retransmissions: 2,
	timeConfirm: 30,
	timeInactivity: 3600,
	timeDebounce: 30,
	pendingConfig: 1,
	calibrate: 1
};

server.route('/sigfox/uplink')
  .get(function(req, res) {
  	var payload = new SigParkPayLoad(req.param('data'));
  	var data 		= payload.getDataMessage();

  	switch(data.header.type) {
  		case 0: //INFO_FRAME_RAW_DATA
  			console.log('INFO_FRAME_RAW_DATA', data);

  			if(data.header.status == 0) {
  				console.log('SENSOR STATUS EMPTY');
  			} else {
  				console.log('SENSOR STATUS OCCUPIED');
  			}
  		break;

  		case 2: //KEEP_ALIVE
  			console.log('KEEP_ALIVE', data);
  		break;

  		default:
  			res.json({ });
  		break;
  	}

  	res.json({ });    
  })

server.route('/sigfox/downlink')
  .get(function(req, res) {
  	var device 	= req.param('device');
    var payload = new SigParkPayLoad(req.param('data'), sigpark);
  	var data 		= payload.getDataMessage();

  	var result			= {};
  	result[device] 	= { downlinkData: "0000000000000000"};

  	switch(data.header.type) {
  		case -1: //REQUEST_CONFIG
  			console.log('REQUEST_CONFIG', payload.getDownlinkData());
  			result[device].downlinkData = payload.getDownlinkPayload();
  		break; 

  		case 3: //CONFIG_REPORT_FRAME
  			console.log('CONFIG_REPORT_FRAME', payload.getDownlinkData());
  			result[device].downlinkData = payload.getDownlinkPayload();
  		break;

  		default:
  			
  		break;
  	}

  	res.json(result);
  })

server.listen(port);

console.log('server started', 'port', port);
