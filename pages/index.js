'use strict';
var yeoman = require('yeoman-generator');
var util = require('util');
var path = require('path');
var ScriptBase = require('./script-base.js');

var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
};


util.inherits(Generator, ScriptBase);

var AngularFrontendGenerator = yeoman.generators.NamedBase.extend({
  initializing: function () {
    this.log('You called the angular-frontend subgenerator with the argument ' + this.name + '.');
    this.appName = this.name;
  },


  writing: function () {
    this.mkdir('src/modules/' + this.name)
    this.src.copy('template.route.js', 'src/pages/' + this.name +'/'+ this.name +'.route.js' );
    this.src.copy('template.controller.js', 'src/pages/' + this.name +'/'+ this.name +'.controller.js' );
    this.src.copy('template.less', 'src/pages/' + this.name +'/'+ this.name +'.less' );
    this.src.copy('template.jade', 'src/pages/' + this.name +'/'+ this.name +'.jade' );
    this.src.copy('template.spec.js', 'src/pages/' + this.name +'/'+ this.name +'.spec.js' );
  }
});

module.exports = AngularFrontendGenerator;