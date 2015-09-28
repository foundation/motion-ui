var path = require('path');
var True = require('sass-true');

var sassFile = path.join(__dirname, 'test.scss');
True.runSass({ file: sassFile }, describe, it);
