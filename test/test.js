var test = require('tape'),
    colorize = require('tap-colorize');

var f = require('fs');
var fs = require('vinyl-fs');
var toDistiller = require('../');

test.createStream().pipe(colorize()).pipe(process.stdout);

test('test',function(t){
  t.plan(1);
  var opts = {
    // adobePDFSettingsPath
    job: "/Library/Application Support/Adobe/Adobe PDF/Settings/PDFX1a 2001 JPN.joboptions"
  };

  fs.src(__dirname+'/test.eps',{read: false})
    .pipe(toDistiller(opts))
    .pipe(fs.dest(__dirname+"/pdf"))
    .on('end',function(){
      f.exists(__dirname+"/pdf/test.pdf",function(exists){
        t.ok(exists,'exists pdf');
      });
    });
  
});

