module.exports = function (grunt) {

  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,
    bower: {
      install: {
        options: {
          install: true,
          copy: false,
          verbose: false,
          cleanBowerDir: false
        }
      }
    },
    clean: {
      release: ['release']
    },
    copy: {
      libs: {
        files: [
          {
            expand: true,
            src: [
              'bower_components/jquery/dist/jquery.min.js',
              'bower_components/d3/d3.min.js',
              'bower_components/fastclick/lib/fastclick.js'
            ],
            dest: 'lib/js',
            flatten: true,
            filter: 'isFile'
          }
        ]
      },

      // TODO: use uglify instead of copy
      js: {expand: true, cwd: 'src/js', src: '*.js', dest: 'release/js'},

      // TODO: use cssmin instead of copy
      css: {expand: true, cwd: 'src/css', src: '*.css', dest: 'release/css'},

      static: {
        files: [
          {expand: true, cwd: 'lib',      src: '**/*',   dest: 'release'},
          {expand: true, cwd: 'src/img',  src: '*.*',    dest: 'release/img'},
          {expand: true, cwd: 'src/html', src: '*.html', dest: 'release'    }
        ]
      }
    },
    jasmine: {
      all: {
        src: 'src/js/*.js',
        options: {
          specs: 'spec/*Spec.js',
          helpers: 'spec/*Helper.js'
        }
      }
    },
    watch: {
      js: {
        files: ['src/js/*.js', 'spec/*.js'],
        tasks: ['jasmine:all']
      }
    }
  });

  for (var taskName in pkg.devDependencies) {
    if (/^grunt-(?!cli$)/.test(taskName)) {
      grunt.loadNpmTasks(taskName);
    }
  }

  // grunt.registerTask('default', []);

  // install files for development
  grunt.registerTask('install', ['bower:install', 'copy:libs']);

  // build js and css files
  grunt.registerTask('build', ['clean:release', 'copy:static', 'copy:js', 'copy:css']);

};
