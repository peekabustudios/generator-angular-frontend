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
  }
  // ,{
  //   type: 'confirm',
  //   name: 'tRRtoolbelt',
  //   message: 'Would you like to include tRRtoolbelt.less? (a handy library of LessCSS mixins)',
  //   default: true
  // }
  ];

  this.prompt(prompts, function (props) {
    this.appName = props.appName;
    // this.tRRtoolbelt = props.tRRtoolbelt;

    cb();
  }.bind(this));
};

AngularFrontend.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/templates');
  this.mkdir('app/templates/states');
  this.mkdir('app/templates/directives');
  this.mkdir('app/js');
  this.mkdir('app/css');
  this.mkdir('app/img');
  this.mkdir('app/files');
  this.mkdir('app/files/fonts');
  this.mkdir('app/files/misc');

  this.mkdir('source');
  this.mkdir('source/less');
  this.mkdir('source/less/states');
  this.mkdir('source/less/directives');
  this.mkdir('source/js');
  this.mkdir('source/js/controllers');
  this.mkdir('source/js/directives');
  this.mkdir('source/js/factories');
  this.mkdir('source/js/filters');
  this.mkdir('source/js/services');
  this.mkdir('source/jade');
  this.mkdir('source/jade/templates');
  this.mkdir('source/jade/templates/states');
  this.mkdir('source/jade/templates/directives');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
  this.copy('_bowerrc', '.bowerrc');
  this.copy('_Gruntfile.js', 'Gruntfile.js');
  this.copy('_secret.json.template', 'secret.json.template');
  this.copy('_secret.json.template', 'secret.json');
  this.copy('_gitignore', '.gitignore');
  this.copy('style_guide.md', 'Style_Guide.md');
  this.copy('root/index.jade', 'source/jade/index.jade');
  this.copy('root/templatesMain.jade', 'source/jade/templates/states/main.jade');
  this.copy('root/templatesAbout.jade', 'source/jade/templates/states/about.jade');

  this.copy('root/app.js', 'source/js/app.js');
  this.copy('root/mainController.js', 'source/js/controllers/main.js');
  this.copy('root/aboutController.js', 'source/js/controllers/about.js');

  this.copy('root/less/mainLESS.less', 'source/less/main.less');
  this.copy('root/less/statesLESS.less', 'source/less/states.less');
  this.copy('root/less/directivesLESS.less', 'source/less/directives.less');
  this.copy('root/less/generalsLESS.less', 'source/less/generals.less');
  this.copy('root/less/colorsLESS.less', 'source/less/colors.less');
  this.copy('root/less/fontsLESS.less', 'source/less/fonts.less');
  this.copy('root/less/mixinsLESS.less', 'source/less/mixins.less');
  this.copy('root/less/tRRtoolbelt.less', 'source/less/tRRtoolbelt.less');
  this.copy('root/less/statesMainLESS.less', 'source/less/states/main.less');
  this.copy('root/less/statesAboutLESS.less', 'source/less/states/about.less');
};

AngularFrontend.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
