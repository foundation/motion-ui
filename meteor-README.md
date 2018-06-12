<p align="center">
  <a href="https://zurb.com/playground/motion-ui">
    <img src="https://user-images.githubusercontent.com/9939075/40385796-108879b6-5e08-11e8-8a12-3bbe7d0bc631.png" alt="Motion UI" width="448px" style="max-width:100%;"/>
  </a>
</p>
 
 


<p align="center">
  <a href="https://github.com/zurb/motion-ui/blob/docs/installation.md"><b>Install</b></a>
  | <a href="https://zurb.com/playground/motion-ui">Demo</a>
  | <a href="https://github.com/zurb/motion-ui/blob/docs">Documentation</a>
  | <a href="https://github.com/zurb/motion-ui/releases">Releases</a>
</p>

---


[![Build Status](https://travis-ci.org/zurb/motion-ui.svg?branch=develop)](https://travis-ci.org/zurb/motion-ui)
[![CDNJS](https://img.shields.io/cdnjs/v/motion-ui.svg)](https://cdnjs.com/libraries/motion-ui/)
[![dependencies Status](https://david-dm.org/zurb/motion-ui/status.svg)](https://david-dm.org/zurb/motion-ui)
[![devDependencies Status](https://david-dm.org/zurb/motion-ui/dev-status.svg)](https://david-dm.org/zurb/motion-ui?type=dev)


💎  The powerful Sass library for creating CSS transitions and animations. Originally integrated into [Foundation for Apps](http://foundation.zurb.com/apps), the code is now a standalone library, used by [Foundation for Sites](http://foundation.zurb.com/sites) and Foundation for Apps. Made by your friends at [ZURB](http://zurb.com).

## Installation

Install Motion UI from Atmosphere.

```sh
meteor add zurb:motion-ui
```

Then to build with **Sass**
```scss
@import '{zurb:motion-ui}/src/motion-ui';

@include motion-ui-transitions;
@include motion-ui-animations;
```

> This will include all of the Motion UI transition and animation CSS classes. To build transitions, animations, series and more according to your needs, see the [Motion UI documentation](https://github.com/zurb/motion-ui/tree/master/docs).

> Autoprefixer is required for the installation with Sass. We recommand you to install [juliancwirko:postcss](https://atmospherejs.com/juliancwirko/postcss) and [seba:minifiers-autoprefixer](https://atmospherejs.com/seba/minifiers-autoprefixer).

Or to use the equivalent pre-compiled **CSS**, copy or import the Motion UI standalone CSS file `dist/motion-ui.css` or `dist/motion-ui.min.css` in your application.

To easily transition elements in and out using Motion UI classes, copy or import the Motion UI **JavaScript** library `dist/motion-ui.js` or `dist/motion-ui.min.js` in your application.

See the [full installation instructions](https://github.com/zurb/motion-ui/tree/master/docs/installation.md)

## Demos

[View live demos on the ZURB Playground.](http://zurb.com/playground/motion-ui)

## Documentation

[View the documentation here.](https://github.com/zurb/motion-ui/tree/master/docs)

## Develop Locally

```
git clone https://github.com/zurb/motion-ui
cd motion-ui
npm install
```

- Run `npm start` to compile test Sass/JS files, and to build the documentation.
  To make changes to the documentation, edit the files under `docs/src`.
- Run `npm test` to run the unit tests.
- Run `npm start dist` to compile distribution files.
