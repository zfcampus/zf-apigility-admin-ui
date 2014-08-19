Apigility Admin UI
==================

This is the source code for the Apigility Admin user interface.

Requirements
------------

- [npm](https://npmjs.org/), for installing the various development
  requirements, which primarily includes [Grunt](http://gruntjs.com) and
  [Bower](http://bower.io/), and tools these to utilize.
- [Bower](http://bower.io/) must be installed globally in order to allow using
  it to install development dependencies.

Run the following command from this directory to install dependencies:

```sh
npm install
```

If you have not yet installed Bower, please do so:

```sh
sudo npm install -g bower
```

Finally, invoke Bower to install the relevant CSS and JS libraries:

```sh
bower install
```

Invoking the Admin
------------------

There are two ways to invoke the Admin UI: as part of an Apigility project, or
standalone via [node](https://nodejs.org).

### Via Apigility

Add the admin as a dev requirement to your project:

```console
$ composer require-dev "zfcampus/zf-apigility-admin-ui:~1.0"
```

and add the module `ZF\Apigility\Admin\Ui` to the list of modules in
`config/development.config.php.dist` (and potentially
`config/development.config.php` if already in development mode.

Navigating to the URI `/apigility/ui` in your Apigility application will now hit the UI.

### Standalone

The standalone method fires up a webserver using node. This method requires that
you have a running Apigility Admin API and know the URL, and that that server is
configured to enable CORS; see [the Apigility CORS
documentation](https://apigility.org/documentation/recipes/allowing-request-from-other-domains)
if you need help setting this aspect up. Make a note of the URI for your server;
the API URI will be `<server>/apigility/api`.

Additionally, we recommend noting the URI to your API documentation, so that the
navigation item can point to it.

Fire up the admin UI using:

```console
$ node index.js --api=<URI to Apigility Admin API (ends in /apigility/api)> \
> --doc=<URI to API documentation>
```

(For help with options, see `node index.js -h`.)

By default, if you do not specify a port, the server will run on port 3000; you
can specify a port with the `--port=<port>` option.

Workflow
--------

To develop the Admin UI (e.g., to add features or fix a bug), you will need to
run the server using the source, not distribution, files. How you do this will
depend on whether you are running the UI via an Apigility application or
standalone.

### Via Apigility

You will need to run the following command to enable the application to serve
the development files for the UI:

```sh
(asset) $ ../bin/ui-mode.php --dev
```

(Note that the above command assumes you are in the directory where this README
file lives.)

### Standalone

To develop standalone, pass the `--src` switch when firing up the server:

```console
$ node index.js --src \
> --api=<URI to Apigility Admin API (ends in /apigility/api)> \
> --doc=<URI to API documentation>
```

### All methods

All changes to the admin UI code should be made in the `src/zf-apigility-admin/`
directory. We recommend running `grunt watch` during development so that you may
be alerted of JS syntax errors, LESS compilation errors, etc.

If running in standalone mode, we recommend using [nodemon](http://nodemon.io)
when firing up your server; this utility will restart the server as it sees file
changes.

Once you are happy with the changes you have made, you will need to rebuild the
distribution files. Run the following from this directory:

```sh
(asset) $ grunt clean && grunt build
```

If developing within an Apigility application, re-enable production mode:

```sh
(asset) $ ../bin/ui-mode.php --production
```

Test that everything is working against the distribution on completion.

Be sure to commit both the `src` and `dist` files when done.

Adding JS/CSS Dependencies
--------------------------

If you need to add any new JS or CSS dependencies, please do so as follows:

- Edit the `bower.json` file and add the dependency
- Execute `bower install`
- Add the files to `src/zf-apigility-admin/index.html` in the appropriate
  section of the file.
- Execute `grunt clean && grunt build`.
- Commit your changes.

