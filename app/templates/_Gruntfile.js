"use strict";

module.exports = function(grunt) {
  // Project configuration.
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    connect: {
      server: {
        options: {
          livereload: true,
          port: 8000,
          hostname: 'localhost',
          base:'app',
        }
      }
    },
    project: {
      javascript: {
        ours: ['source/js/app.js', 'source/js/**/*.js'],
        lib:  ['source/bower_components/jquery/jquery.min.js', 'source/bower_components/angular/angular.min.js', 'source/bower_components/angular/angular-route.min.js', 'source/bower_components/**/*.min.js']
      },
      secret: grunt.file.readJSON('./secret.json'),
      pkg: grunt.file.readJSON('./package.json')
    },
    less: {
      build: {
        files: {
          "app/css/style.css": "source/less/main.less"
        }
      }
    },
    jade: {
      compile: {
        options: {
          data: {
            debug: false
          },
          pretty:true
        },
        files: {
          "app/index.html": ["source/jade/index.jade"],
          "app/templates/states/main.html": ["source/jade/templates/states/main.jade"],
          "app/templates/states/about.html": ["source/jade/templates/states/about.jade"]
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      styles: {
        files: ['**/*.less'],
        tasks: ['less'],
        options: {
          nospawn: true,

        }
      },
      jade: {
        files: ['**/*.jade'],
        tasks: ['jade'],
        options: {
          nospawn: true,
        }
      },
      javascript: {
        files: '<%= project.javascript.ours %>',
        tasks: ['jshint', 'ngtemplates', 'concat']
      },
      javascriptLib: {
        files: '<%= project.javascript.lib %>',
        tasks: ['jshint', 'ngtemplates', 'concat']
      }
    },
    concat: {
      javascript_ours: {
        options: {
          banner: '"use strict";\n'
        },
        src: '<%= project.javascript.ours %>',
        dest: 'app/js/main.js'
      },
      javascript_lib: {
        src: '<%= project.javascript.lib %>',
        dest: 'app/js/lib.js'
      }
    },
    jshint: {
      options: {
        strict: false,
        laxbreak: true,
        debug: true,
        globals: {
          angular: true,
          $: true,
          _: true
        }
      },
      all: '<%= project.javascript.ours %>'
    },
    concurrent: {
      target: {
        tasks: ['watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  grunt.event.on('watch', function(action, filepath, target) {
    grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
  });


  // Default task(s).
  grunt.registerTask('default', ['less', 'jshint', 'concat', 'jade', 'connect', 'concurrent']);
};