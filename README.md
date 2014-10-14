*version 0.0.1*

Angular/LESScss and Jade with amazon aws upload generator for [Yeoman](http://yeoman.io) started from https://github.com/peekabustudios/generator-angular-frontend

## Getting Started

Requirements:

nodejs, npm

First, install all dependencies:

```
$ npm install -g grunt-cli

$ npm install -g bower

$ npm install -g yo

$ npm install -g generator-angular-frontend
```

Finally, navigate into the desired directory and initiate the generator:

```
$ yo angular-frontend

```

To begin working on the app, initiate grunt:

```
$ grunt

```
To add a new page with a route, controller, jade, less and spec file

```
$ yo angular-frontend:route [page name]

```
To use the s3 upload you will need to edit your .grunt.aws.json file and fill out with your aws credentails then when you are ready do

```
$ grunt deploy

```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
