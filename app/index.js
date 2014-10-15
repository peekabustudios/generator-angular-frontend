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
    this.appName = props.appName + 'App';

    cb();
  }.bind(this));
};

AngularFrontend.prototype.app = function app() {
  //this will make the 2 test directorys
  this.mkdir('src');
  this.mkdir('src/pages');
  this.mkdir('src/pages/main');
  this.mkdir('src/pages/about');
  this.mkdir('src/less')

  //code blocks for copying the pages. Each page will be in its own directory with all the code need for it
  this.copy('main/main.js'        , 'src/pages/main/main.js');
  this.copy('main/main.controller.js'   , 'src/pages/main/main.controller.js');
  this.copy('main/main.jade'            , 'src/pages/main/main.jade');
  this.copy('main/main.less'            , 'src/pages/main/main.less');
  this.copy('main/main.spec.js'         , 'src/pages/main/main.spec.js');

  this.copy('about/about.controller.js'  , 'src/pages/about/about.controller.js');
  this.copy('about/about.js'       , 'src/pages/about/about.js');
  this.copy('about/about.jade'           , 'src/pages/about/about.jade');
  this.copy('about/about.less'           , 'src/pages/about/about.less');
  this.copy('about/about.spec.js'        , 'src/pages/about/about.spec.js');

  this.copy('index/index.jade'  , 'src/index.jade');
  this.copy('index/app.js'      , 'src/app.js');
  this.copy('index/yeoman.png'  , 'src/assets/yeoman.png');

  // copying config and dependencies
  this.copy('_package.json' , 'package.json');
  this.copy('_bower.json'   , 'bower.json');
  this.copy('_bowerrc'      , '.bowerrc');
  this.copy('_Gruntfile.js' , 'Gruntfile.js');
  this.copy('_gitignore'    , '.gitignore');
  this.copy('template.grunt.aws.json', '.grunt.aws.json')
};

AngularFrontend.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('yo-rc.json' , '.yo-rc.json');
};
