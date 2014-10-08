var fs = require('fs'),
    exec = require('child_process').exec,
    through = require('through2');

function distill(path,opts,done){
  var scpt = [
    "tell application \"Acrobat Distiller\"",
    (function(p,o){
      var src = "\tDistill sourcePath \""+path+"\"";
      return src 
        + ((opts.job!==undefined)? " adobePDFSettingsPath \""+opts.job+"\"" : "") 
        // + ((opts.dest!==undefined)? " destinationPath \""+opts.dest+"\"" : "");
    })(path,opts),
    "end tell"
  ].join("\n");
  var cmd = ['osascript','-e',"'"+scpt+"'"].join(' ');
  exec(cmd,function(err,stdout,stderr){
    if(err) return done(err);
    done(null,stdout);
  });
};

function toDistiller(opts){
  return through.obj(function(file,enc,cb){
    var self = this;
    var pdfPath = file.path.replace(/\.eps$|\.ps$/,".pdf");
    distill(file.path,opts,function(err){
      if(err) return cb(err)
      file.path = pdfPath;
      file.contents = fs.readFileSync(pdfPath);
      self.push(file);
      cb();
    });
  });
};

module.exports = toDistiller;
