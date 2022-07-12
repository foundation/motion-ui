<p align="center">
  <a href="https://get.foundation/sites/docs/motion-ui.html">
    <img src="https://user-images.githubusercontent.com/9939075/40385796-108879b6-5e08-11e8-8a12-3bbe7d0bc631.png" alt="Motion UI" width="448px" style="max-width:100%;"/>
  </a>
</p>
 
 


<p align="center">
  <a href="https://github.com/foundation/motion-ui/blob/docs/installation.md"><b>Install</b></a>
  | <a href="https://get.foundation/sites/docs/motion-ui.html">Demo</a>
  | <a href="https://github.com/foundation/motion-ui/blob/docs">Documentation</a>
  | <a href="https://github.com/foundation/motion-ui/releases">Releases</a>
</p>

---

[![CDNJS](https://img.shields.io/cdnjs/v/motion-ui.svg)](https://cdnjs.com/libraries/motion-ui/)

💎 The powerful Sass library for creating CSS transitions and animations. The code is a standalone library, used by [Foundation for Sites](https://get.foundation/sites/).

## Installation

Install Motion UI with npm or Bower.

```sh
npm install motion-ui --save
bower install motion-ui --save
```

Then to build with **Sass** ([Autoprefixer](https://github.com/postcss/autoprefixer) is required):
```scss
// Add the load path "[modules_folder]/motion-ui/src" to your Sass configuration
@import 'motion-ui';

@include motion-ui-transitions;
@include motion-ui-animations;
```

> Autoprefixer is required for the Sass installation as Motion UI uses unprefixed transition and animation properties. We recommend you to install [PostCSS and Autoprefixer](https://github.com/postcss/autoprefixer).

Or to use the equivalent pre-compiled **CSS**, import the Motion UI standalone CSS file `dist/motion-ui.css` or `dist/motion-ui.min.css`.

To easily transition elements in and out using Motion UI classes, import the Motion UI **JavaScript** library `dist/motion-ui.js` or `dist/motion-ui.min.js`.

See the [full installation instructions](https://github.com/foundation/motion-ui/tree/master/docs/installation.md)

## Demos

[View live demo.](https://get.foundation/sites/docs/motion-ui.html)

## Documentation

[View the documentation here.](https://github.com/foundation/motion-ui/tree/master/docs)

## Develop Locally

```sh
git clone https://github.com/foundation/motion-ui
cd motion-ui
npm install
```

- Run `npm start` to compile test Sass/JS files, and to build the documentation.
  To make changes to the documentation, edit the files under `docs/src`.
- Run `npm test` to run the unit tests.
- Run `npm start dist` to compile distribution files.
