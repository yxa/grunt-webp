'use strict';

var grunt = require('grunt'),
    fs    = require('fs');

exports.webp = {
  compress: function(test) {
    test.expect(1);

    var original = fs.statSync('test/logo.jpg').size;
    var compressed = fs.statSync('tmp/test/logo.jpg.webp').size;
    test.ok(compressed < original, 'should compress images');

    test.done();
  }
 };
