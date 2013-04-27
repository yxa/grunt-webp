var path = require('path'),
    fs   = require('fs-extra');

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('webp', 'compress your images files with google webp', function() {
    var options = this.options();

    this.files.forEach(function(pair) {
      var isExpandedPair = pair.orig.expand || false;
      var src = pair.src.filter(function(f) {
        return grunt.file.isFile(f);
      });

      src.forEach(function(file){
        var destFileName = (isExpandedPair) ? pair.dest : path.join(pair.dest || '', file);
        fs.mkdirsSync(path.dirname(destFileName));

        var args = [];
        args.push('-q');
        args.push('100');
        args.push(file);
        args.push('-o');
        args.push(destFileName + '.webp');

        var child = grunt.util.spawn({ cmd: 'cwebp', args: args }, function(error, result, code) {
          grunt.log.writeln(code+''+result);
          if (code !== 0) {
            return grunt.warn(String(code));
          }
        });

       child.stdout.pipe(process.stdout);
       child.stderr.pipe(process.stderr);

      });
    });
  });
};
