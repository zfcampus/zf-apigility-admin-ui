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
  console.info('  --api=<api URI>   URI to the Apigility Admin API');
  console.info('  --doc=<doc URI>   URI to API documentation');
  console.info('  --port=<port>     Port on which to serve UI; defaults to 3000');
  console.info('  --src             Use the src directory (instead of dist version)');
  console.info('  --help or -h      This usage message');
  process.exit(0);
}

if (! argv.api) {
  console.error('Cannot start server; no --api option passed');
  process.exit(1);
}

if (! validUrl.isUri(argv.api)) {
  console.error('Invalid URI passed for --api option');
  process.exit(1);
}

var api  = argv.api;
var env  = argv.src ? 'src' : 'dist';
var port = argv.port ? parseInt(argv.port) : 3000;
var base = 'http://localhost:' + port;
var doc  = argv.doc || '/apigility/documentation';

var path  = __dirname + '/' + env + '/zf-apigility-admin';
var index = fs.readFileSync(path + '/index.html', { encoding: 'utf-8' });
index = index.replace(/%BASE_HREF%/g, base);
index = index.replace(/%API_BASE%/g, api);
index = index.replace(/%DOC_URI%/g, doc);

var app = connect();
app.use(timeout());
app.use(morgan((env === 'src') ? 'dev' : 'combined'));
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

console.log('Starting server on port', port);
app.listen(port);
