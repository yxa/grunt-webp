'use strict';

module.exports = function(grunt) {
  var path      = require('path');
  var fileSize  = require('filesize');
  var fs        = require('fs');

  grunt.registerMultiTask('webp', 'compress your images files with google webp', function() {
    var options = this.options();
    var webpArgs = [ ];

    if (typeof options.quality === 'number') {
      webpArgs.push('-q', options.quality);
    } else {
      webpArgs.push('-q', 100);
    }

    this.files.forEach(function(pair) {
      var isExpandedPair = pair.orig.expand || false;
      var src = pair.src.filter(function(f) {
        return grunt.file.isFile(f);
      });

      src.forEach(function(file){

        var originalSize = fs.statSync(file).size;

        var destFileName = (isExpandedPair) ? pair.dest : path.join(pair.dest || '', file);
        grunt.file.mkdir(path.dirname(destFileName));

        webpArgs.push(file, '-o', destFileName + '.webp');

        var child = grunt.util.spawn({ cmd: 'cwebp', args: webpArgs },function processed(error, result, code) {
          var saved, message;

          if(error) {
            grunt.util.writeln(error);
          }

          saved = originalSize - fs.statSync(dest).size;
          grunt.log.writeln('OK'.green + file + (' (' + message + ')').grey);
        });

        if(child && grunt.option('verbose')) {
          child.stdout.pipe(process.stdout);
          child.stderr.pipe(process.stderr);
        }
      });
    });
  });
};
