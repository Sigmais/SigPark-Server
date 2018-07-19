SigPark Server
===================================

SigPark sigfox server for testing.

## Installation

### [Node.js](http://nodejs.org/):

~~~
git clone https://github.com/Sigmais/SigPark-Server.git 
cd SigPark-Server
npm install
npm start
~~~

## Usage

You can test the server accessing the follow links

* device = 43CDADA

* CONFIG_REPORT_FRAME

http://127.0.0.1:3001/sigfox/downlink?device=43CDADA&data=031200030c301c02001e82

* REQUEST_CONFIG

http://127.0.0.1:3001/sigfox/downlink?device=43CDADA&data=00

* INFO_FRAME_RAW_DATA - status occupied

http://127.0.0.1:3001/sigfox/uplink?device=43CDADA&data=b0007d004c00a3282436680c

* INFO_FRAME_RAW_DATA - status empty

http://127.0.0.1:3001/sigfox/uplink?device=43CDADA&data=380096005f00b5272432680c

* KEEP_ALIVE - status occupied

http://127.0.0.1:3001/sigfox/uplink?device=43CDADA&data=82

* KEEP_ALIVE - status empty

http://127.0.0.1:3001/sigfox/uplink?device=43CDADA&data=32
