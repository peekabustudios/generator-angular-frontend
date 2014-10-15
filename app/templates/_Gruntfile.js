"use strict";

module.exports = function(grunt) {
  // Project configuration.
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    pkg: grunt.file.readJSON('./package.json'),
    aws: grunt.file.readJSON('./.grunt.aws.json'),

    /* To upload s3 you will need to fill out the information in the .grunt.aws.json file
    with the relevant information */
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

    project: {
      javascript: {
        ours: ['src/app.js', 'src/pages/**/*.js'], //this will get the app.js and any js files in their directories
        lib:  ['src/bower_components/jquery/jquery.min.js', 'src/bower_components/angular/angular.min.js', 'src/bower_components/angular/angular-route.min.js', 'src/bower_components/**/*.min.js']
      },
      app: 'app',
      src: 'src'
    },
    injector: {
        options: {
          template:'<%= project.app %>/index.html'
        },
        local_dependencies: {
          options : {
            starttag: '<!-- injector:js-->',
            endtag: '<!-- endinjector-->',
            transform: function(filePath) {
              filePath = filePath.replace('/src/', '');
              return '<script src="js/' + filePath + '"></script>';
            },
          },
          files: {
            '<%= project.app %>/index.html': ['src/app.js', 'src/pages/**/*.js', '!src/pages/**/*.spec.js']
          }
        },
        vendor_dependencies: {
          options : {
            starttag: '<!-- injector:js lib-->',
            endtag: '<!-- endinjector lib-->',
            transform: function(filePath) {
              filePath = filePath.replace('/app/', '');
              return '<script src="' + filePath + '"></script>';
            },
          },
          files : {
            '<%= project.app %>/index.html': ['<%= project.app %>/lib/*.js'],
          }
      }
    },
    less: {
      build: {
        files: {
          "app/css/style.css": ["src/less/main.less", "src/bower_components/bootstrap/less/bootstrap.less", "src/pages/**/*.less"] // convert all the less files into a single style sheet
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
        files: [{
          expand :true,
          cwd    : '<%= project.src %>',
          src    : ['pages/**/*.jade', 'index.jade'],
          dest   : 'app',
          ext    : '.html'
        }]
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
        dest: 'app/lib/lib.js'
      }
    },
    copy: {
      dev:{
        files: [{expand: true, cwd: 'src/', src: ['**/*.js','!**/*.spec.js', '!bower_components/**/*'], dest: 'app/js/'},
        {expand: true, cwd: 'src/bower_components/jquery', src: ['jquery.min.map'], dest: 'app/lib/'},
        {expand: true, cwd: 'src/assets', src: ['*.{png, jpg, svg, gif}'], dest: 'app/assets/'}]
      },
    },
    clean: {
      dev: ["app"],
    },
    jshint: {
      options: {
          jshintrc: '.jshintrc',
          reporter: require('jshint-stylish')
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
    },
    watch: {
      options: {
        livereload: true
      },
      injectJS: {
        files: ['app/index.html', 'souce/bower_components/**/*.js'],
        tasks: ['injector']
      },
      styles: {
        files: ['source/less/**/*.less', 'source/less/*.less' ],
        tasks: ['less'],
        options: {
          nospawn: true,

        }
      },
      jade: {
        files: ['src/pages/**/*.jade', 'src/index.jade'],
        tasks: ['jade'],
        options: {
          nospawn: true,
        }
      },
      javascriptLib: {
        files: '<%= project.javascript.lib %>',
        tasks: ['jshint', 'concat:javascript_lib']
      },
      gruntfile: {
        files: 'Gruntfile.js'
      }
    }
  });

  grunt.event.on('watch', function(action, filepath, target) {
    grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
  });

  // Default task(s).
  grunt.registerTask('serve', ['clean', 'less', 'jshint', 'concat', 'jade', 'injector', 'copy:dev',  'connect', 'concurrent', 'watch']);
  grunt.registerTask('default', ['serve']);
  grunt.registerTask('deploy', ['s3']);
};