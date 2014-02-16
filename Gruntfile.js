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

    copy: {
      libs: {
        files: [
          {
            expand: true,
            src: [
              'bower_components/jquery/jquery.min.js',
              'bower_components/d3/d3.min.js',
              'bower_components/fastclick/lib/fastclick.js'
            ],
            dest: 'js/',
            flatten: true,
            filter: 'isFile'
          }
        ]
      },

      // TODO: use uglify instead of copy
      js: {expand: true, cwd: 'src/js', src: '*.js', dest: 'js'},

      // TODO: use cssmin instead of copy
      css: {expand: true, cwd: 'src/css', src: '*.css', dest: 'css'}
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
  grunt.registerTask('build', ['copy:js', 'copy:css']);

};
