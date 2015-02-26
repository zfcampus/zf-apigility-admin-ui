'use strict';

/* Gruntfile for zf-apigility-admin-ui
 *
 * Primary Targets:
 * - test: run karma tests
 * - build: build the distribution version
 * - serve: runs a static HTTP server; watches for changes in JS, tests, HTML,
 *   and this file, and runs jshint, runs tests, builds HTML template file, and
 *   reloads the server. Accepts the following options:
 *   - `--port` to specify a port to run the HTTP server on; if none is
 *     specified, 3000 is used.
 *   - `--api` to specify the URI to the API; uses
 *     http://localhost:9000/apigility/api if none is specified.
 *   - `--docs` to specify the URI to documentation (referenced in the
 *     documentation navigation item); uses
 *     http://localhost:9000/apigility/documentation if none is specified.
 *   - `--host` to specify the hostname to use; defaults to "localhost".
 * - default: runs jshint, tests, and build
 */

module.exports = function(grunt) {
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  var fs = require('fs');
  var urlparser = require('url').parse;

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    apigility: {
      dist: 'dist',
      ui: 'src'
    },

    // Connect - static server - settings
    connect: {
      options: {
        port: grunt.option('port') || 3000,
        livereload: 35729,
        hostname: '0.0.0.0',
      },
      livereload: {
        options: {
          base: '<%= apigility.ui %>',
          middleware: function (connect, options, middlewares) {
            middlewares = middlewares || [];

            var host = grunt.option('host') || 'localhost';
            var base = 'http://' + host + ':' + options.port + '/';
            var api  = grunt.option('api')  || 'http://' + host + ':9000/api';
            var docs = grunt.option('docs') || 'http://' + host + ':9000/apigility/documentation';

            var index = fs.readFileSync(options.base + '/index.html', { encoding: 'utf-8' });
            index = index.replace(/%BASE_HREF%/g, base);
            index = index.replace(/%API_BASE%/g, api);
            index = index.replace(/%DOC_URI%/g, docs);

            middlewares.unshift(function (req, res, next) {
              var path = urlparser(req.url).pathname;
              if (path !== '/' && path !== '/index.html') {
                return next();
              }

              if (req.method !== 'GET') {
                res.statusCode = 405;
                res.setHeader('Allow', 'GET');
                res.end();
                return;
              }

              return res.end(index);
            });

            return middlewares;
          }
        }
      }
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['<%= apigility.ui %>/apigility-ui/{,**/}*.js'],
        tasks: ['newer:jshint:all', 'karma']
      },
      jsTest: {
        files: ['test/{,**/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      /*
      less: {
        files: ['<%= apigility.app %>/less/{,**<delete brackets and this message>/}*.less'],
        tasks: ['less:server']
      },
      */
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= apigility.ui %>/{,**/}*.html',
          '<%= apigility.ui %>/apigility-ui/css/{,**/}*.css',
          '<%= apigility.ui %>/apigility-ui/img/{,**/}*',
          '<%= apigility.ui %>/apigility-ui/{,**/}*.js'
        ]
      },

      html2js: {
        files: ['<%= apigility.ui %>/apigility-ui/{,**/}*.html'],
        tasks: ['html2js']
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish'),
        ignores: ['<%= apigility.ui %>/apigility-ui/templates.js'],
      },
      all: [
        'Gruntfile.js',
        '<%= apigility.ui %>/apigility-ui/{,**/}*.js'
      ],
      test: {
        options: {
        },
        src: [
          'test/unit/{,**/}*.js'
        ]
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= apigility.dist %>/*',
            '!<%= apigility.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Compiles Less to CSS
    /*
    less: {
      options: {
        // Adds additional paths for import (so can import bower_components as well)
        paths: [
          '<%= apigility.app %>/less',
          '<%= apigility.app %>/vendor'
        ]
      },
      server: {
        files: {
          '<%= apigility.app %>/css/main.css': '<%= apigility.app %>/less/main.less',
          '<%= apigility.app %>/css/vendor.css': '<%= apigility.app %>/less/vendor.less'
        },
        options: {
          cleancss: false
        }
      }
      // Dist is handled by usemin/cssmin of the above 'server' config
    },
    */

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= apigility.dist %>/index.html',
      options: {
        dest: '<%= apigility.dist %>',
        root: '<%= apigility.ui %>'
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= apigility.dist %>/{,**/}*.html'],
      css: ['<%= apigility.dist %>/{,**/}*.css'],
      options: {
        assetsDirs: ['<%= apigility.dist %>']
      }
    },

    htmlmin: {
      dist: {
        options: {
          // Optional configurations that you can uncomment to use
          // removeCommentsFromCDATA: true,
          // collapseBooleanAttributes: true,
          // removeAttributeQuotes: true,
          // removeRedundantAttributes: true,
          // useShortDoctype: true,
          // removeEmptyAttributes: true,
          // removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= apigility.ui %>',
          src: ['*.html', 'html/**/*.html'],
          dest: '<%= apigility.dist %>'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= apigility.ui %>',
            dest: '<%= apigility.dist %>',
            src: [
              'index.html',
              '*.{ico,png,txt}',
              'apigility-ui/img/**'
            ]
          },
          {
            expand: true,
            dot: false,
            flatten: true,
            cwd: '<%= apigility.ui %>',
            dest: '<%= apigility.dist %>/apigility-ui/fonts',
            src: [
              'vendor/bootstrap/dist/fonts/*.{eot,woff,ttf,svg}',
              'vendor/sass-bootstrap-glyphicons/fonts/*.{eot,woff,ttf,svg}'
            ]
          }
        ]
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        /* 'less:server' */
      ],
      test: [
        /* 'less:server' */
      ],
      dist: [
        /* 'less:server', */
        'htmlmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true,
        autoWatch: false
      }
    },

    //Collect all html views into single template
    html2js: {
      options: {
        base: '<%= apigility.ui %>'
      },
      main: {
        src: ['<%= apigility.ui %>/apigility-ui/**/*.html'],
        dest: '<%= apigility.ui %>/apigility-ui/templates.js'
      },
    },

    rev: {
      files: [
        '<%= apigility.dist %>/apigility-ui/{,**/}*.css',
        '<%= apigility.dist %>/apigility-ui/{,**/}*.js'
      ]
    }
  });

  grunt.registerTask('monkeyPatches', function () {
    // monkeypatch FileProcessor to include utf-8
    var FileProcessor = require('grunt-usemin/lib/fileprocessor');
    FileProcessor.prototype.replaceWithOld = FileProcessor.prototype.replaceWith;
    FileProcessor.prototype.replaceWith = function replaceWith(block) {
      var script = FileProcessor.prototype.replaceWithOld(block);
      if (script.match(/<script src/)) {
        script = script.replace('></script>', ' charset="utf-8"></script>');
      }
      return script;
    };
  });

  grunt.registerTask('serve', function(target) {
    grunt.task.run([
      'clean:server',
      // 'concurrent:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    // 'concurrent:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'html2js',
    'copy:dist',
    'useminPrepare',
    'concurrent:dist',
    'concat',
    'uglify',
    'cssmin',
    'rev',
    'monkeyPatches',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
