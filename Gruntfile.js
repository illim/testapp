module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
      jshint: {
          all: ['Gruntfile.js', 'public/js/*.js']
      }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');


};
