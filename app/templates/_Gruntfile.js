"use strict";

module.exports = function(grunt) {
  // Project configuration.
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    pkg: grunt.file.readJSON('./package.json'),
    aws: grunt.file.readJSON('./.grunt.aws.json'),
    s3: {
      options: {
        accessKeyId: '<%= aws.accessKeyId %>',
        secretAccessKey: '<%= aws.secretAccessKey %>',
        bucket: '<%= aws.bucket %>',
        region:'<%= aws.region %>'
      },
      build: {
        cwd: 'app/',
        src: '**'
      }
    },

    connect: {
      server: {
        options: {
          livereload: true,
          open : true,
          port: 9000,
          hostname: 'localhost',
          base:'app',
        }
      }

    },
    open : {
      dev : {
        path: 'http://localhost:9000'
      }
    },
    project: {
      javascript: {
        ours: ['src/app.js', 'src/modules/**/*.js'], //this will get the app.js and any js files in their directories
        lib:  ['src/bower_components/jquery/jquery.min.js', 'src/bower_components/angular/angular.min.js', 'src/bower_components/angular/angular-route.min.js', 'src/bower_components/**/*.min.js']
      },
    },
    less: {
      build: {
        files: {
          "app/css/style.css": ["src/less/main.less", "src/bower_components/bootstrap/less/bootstrap.less", "src/modules/**/*.less"] // convert all the less files into a single style sheet
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
          "app/index.html": ["src/index.jade"],
          "app/html/main.html": ["src/modules/**/main.jade"], // this will get all the jade anf 'compile' them to html
          "app/html/about.html": ["src/modules/**/about.jade"]
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      styles: {
        files: ['source/less/**/*.less', 'source/less/*.less' ],
        tasks: ['less'],
        options: {
          nospawn: true,

        }
      },
      jade: {
        files: ['src/modules/**/*.jade', 'src/index.jade'],
        tasks: ['jade'],
        options: {
          nospawn: true,
        }
      },
      javascript: {
        files: '<%= project.javascript.ours %>',
        tasks: ['jshint', 'ngtemplates' , 'concat']
      },
      javascriptLib: {
        files: '<%= project.javascript.lib %>',
        tasks: ['jshint','ngtemplates' , 'concat']
      },
      gruntfile: {
        files: 'Gruntfile.js'
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
  grunt.registerTask('default', ['less', 'jshint', 'concat', 'jade',  'open:dev', 'connect', 'concurrent', 'watch']);


  grunt.registerTask('deploy', ['s3']);
};