const path = require('path');
const True = require('sass-true');

const sassFile = path.join(__dirname, 'test.scss');
True.runSass({ describe, it }, sassFile);
