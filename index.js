'use strict';

var connect     = require('connect');
var fs          = require('fs');
var minimist    = require('minimist');
var morgan      = require('morgan');
var serveStatic = require('serve-static');
var timeout     = require('connect-timeout');
var url         = require('url');
var validUrl    = require('valid-url');

var argv = minimist(process.argv.slice(2), {
  boolean: 'src'
});

if (argv.help || argv.h) {
  console.info('Usage:');
  console.info('  --host=<host>     Hostname for the UI; defaults to localhost');
  console.info('  --port=<port>     Port on which to serve UI; defaults to 3000');
  console.info('  --api=<api URI>   URI to the Apigility Admin API; defaults to http://{host}/api');
  console.info('  --doc=<doc URI>   URI to API documentation; defaults to http://{host}/apigility/documentation');
  console.info('  --src             Use the source folder instead of /dist');
  console.info('  --help or -h      This usage message');
  process.exit(0);
}

var host = argv.host || 'localhost';
var port = argv.port ? parseInt(argv.port) : 3000;
var api  = argv.api  || 'http://' + host + ':8888/api';
var docs = argv.doc  || 'http://' + host + ':8888/apigility/documentation';
var src  = argv.src  ? 'src' : 'dist';

if (! validUrl.isUri(api)) {
  console.error('Invalid URI passed for --api option');
  process.exit(1);
}

var base  = 'http://' + host + ':' + port;
var path  = __dirname + '/' + src;
var index = fs.readFileSync(path + '/index.html', { encoding: 'utf-8' });
index = index.replace(/%BASE_HREF%/g, base);
index = index.replace(/%API_BASE%/g, api);
index = index.replace(/%DOC_URI%/g, docs);

var app = connect();
app.use(timeout());
app.use(morgan('combined'));
app.use('/', function (req, res, next) {
  if (url.parse(req.url).pathname !== '/') {
    return next();
  }

  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.setHeader('Allow', 'GET');
    res.end();
    return;
  }

  res.end(index);
});
app.use(serveStatic(path, { index: false }));

console.log('Starting server on host', host, ', listening on port', port);
app.listen(port);
