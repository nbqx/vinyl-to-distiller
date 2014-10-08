var fs = require('vinyl-fs');
var toDistiller = require('./');

var opts = {
  // adobePDFSettingsPath
  job: "/Library/Application Support/Adobe/Adobe PDF/Settings/PDFX1a 2001 JPN.joboptions"
};

fs.src('./test/test.eps',{read: false})
  .pipe(toDistiller(opts))
  .pipe(fs.dest("./test/pdf/"));
