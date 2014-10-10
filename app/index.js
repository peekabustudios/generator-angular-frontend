'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var AngularFrontend = module.exports = function AngularFrontend(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AngularFrontend, yeoman.generators.Base);

AngularFrontend.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'appName',
    message: 'What do you want to call your app?'
  }];

  this.prompt(prompts, function (props) {
    this.appName = props.appName;
    // this.tRRtoolbelt = props.tRRtoolbelt;

    cb();
  }.bind(this));
};

AngularFrontend.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/partials');
  this.mkdir('app/partials');
  this.mkdir('app/js');
  this.mkdir('app/css');
  this.mkdir('app/img');
  this.mkdir('app/files');
  this.mkdir('app/files/fonts');
  this.mkdir('app/files/misc');

  //this will make the 2 test directorys
  this.mkdir('src');
  this.mkdir('src/modules');
  this.mkdir('src/modules/main');
  this.mkdir('src/modules/about');
  this.mkdir('src/less')

  //code blocks for copying the pages. Each page will be in its own directory with all the code need for it
  this.copy('main/main.js'      , 'src/modules/main/main.js');
  this.copy('main/main.jade'    , 'src/modules/main/main.jade');
  this.copy('main/main.less'    , 'src/modules/main/main.less');
  this.copy('main/main.spec.js' , 'src/modules/main/main.spec.js');

  this.copy('about/about.js'      , 'src/modules/about/about.js');
  this.copy('about/about.jade'    , 'src/modules/about/about.jade');
  this.copy('about/about.less'    , 'src/modules/about/about.less');
  this.copy('about/about.spec.js' , 'src/modules/about/about.spec.js');

  this.copy('index/index.jade', 'src/index.jade');
  this.copy('index/app.js'    , 'src/app.js');
  this.copy('index/yeoman.png' , 'src/assets/yeoman.png');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
  this.copy('_bowerrc', '.bowerrc');
  this.copy('_Gruntfile.js', 'Gruntfile.js');
  this.copy('_gitignore', '.gitignore');
  this.copy('template.grunt.aws.json', '.grunt.aws.json')
};

AngularFrontend.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
