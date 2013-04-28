/*
 * grunt-webp
 * https://github.com/yxa/grunt-webp
 *
 * Copyright (c) 2013 torbjorn josefsson
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    webp: {
      firstPair: {
         options: { quality: 50 },
         files:  [ { src: ['test/*.jpg'], dest: 'tmp' } ]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['jshint', 'clean', 'webp', 'nodeunit', 'clean']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['test', 'build-contrib']);
  grunt.registerTask('compress', ['clean', 'webp']);
};
