## Motion-UI for Meteor

You can use only Sass version with this package. If you need compiled .css version just copy .css and .js files from `dist` folder and add them to your Meteor project.

### Installation

```bash
$ meteor add zurb:motion-ui
```

### Sass Usage

In your main .scss file in the Meteor project `@import` the library:

```css
@import '{zurb:motion-ui}/src/motion-ui';
```

Autoprefixer is required to use this library. The library uses unprefixed transition and animation properties, which are then prefixed by Autoprefixer. You can use one of two packages (they will be no autoincluded):

- [juliancwirko:postcss](https://atmospherejs.com/juliancwirko/postcss) (Autoprefixer is just a PostCSS plugin)
- [seba:minifiers-autoprefixer](https://atmospherejs.com/seba/minifiers-autoprefixer)

The library includes two mixins which export all of the default CSS for the framework. This includes:

- Transitions for slide, fade, hinge, scale, and spin
- Animation classes for spinning, shaking, and wiggling
- Modifier classes for transition/animation speed, timing, and delay

```css
@include motion-ui-transitions;
@include motion-ui-animations;
```

You can also use special mixins. You'll find more documentation here: [Motion-UI docs](https://github.com/zurb/motion-ui/tree/master/docs) All besides installation details should work the same.