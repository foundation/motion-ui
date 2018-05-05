---
title: Animations
sass:
 - src/effects/*.scss
 - src/util/_animation.scss
 - src/util/_keyframe.scss
 - src/util/_series.scss
---

## Basics

Use the `mui-animation` mixin to create CSS keyframe animations. The mixin accepts a keyframe function, like this:

```scss
.spin-cw {
  @include mui-animation(spin(in, 360deg));
}
```

The CSS output looks like this:

```css
@keyframes spin-cw-360deg {
  0% {
    transform: rotate(0deg); }
  100% {
    transform: rotate(360deg); }
}

.spin-cw {
  animation-name: spin-cw-360deg;
}
```

**Note that in order to play properly, the element must have at least the property `animation-duration` applied to it as well.**

There are seven keyframe functions:

- `fade($from, $to)`
- `hinge($state, $from, $axis, $perspective, $turn-origin)`
- `shake($intensity)`
- `slide($state, $direction, $amount)`
- `spin($state, $direction, $amount)`
- `wiggle($intensity)`
- `zoom($from, $to)`

All keyframe functions have parameters that customize the effect. For example, with `shake()` and `wiggle()` you can set the intensity of the effect, and with `spin()` you can set how many degrees the spin goes.

If you're using a keyframe effect as-is, it can be inserted as a plain string instead of a function call, like so:

.zoom-in {
  @include mui-animation(zoom);
}

## Combination Effects

Multiple keyframe effects can be combined into one. For example, you can combine a fade, slide, and spin into one animation, for something truly monstrous.

To create a combined effect, just add more keyframe functions to the `mui-animation` mixin, as additional parameters.

```scss
.slide-and-fade-and-spin {
  @include mui-animation(slide, fade, spin(120deg));
}
```

**Note that this doesn't work with the `shake()` or `wiggle()` animations. Only animations with single start and end keyframes can be combined.**

## Series Animations

Multiple elements can be animated in series.

To set it up, make sure each animating element shares a common parent.

```html
<div class="animation-wrapper">
  <div class="shake"></div>
  <div class="spin"></div>
  <div class="wiggle"></div>
</div>
```

Begin your series with the `mui-series()` mixin. Inside this mixin, attach animations to classes with the `mui-queue()` mixin. The first parameter is the length of the animation, the second parameter is an optional pause to create before the next animation, and the remaining parameters are a set of keyframe functions.

```scss
@include mui-series {
  // 2 second shake
  .shake    { @include mui-queue(2s, 0s, shake); }
  // 1 second spin with a 2 second pause
  .spin     { @include mui-queue(1s, 2s, spin); }
  // 1 second zoom and fade
  .fade-zoom { @include mui-queue(1s, 0s, fade, zoom); }
}
```

To add a delay to the start of the queue, add the length in seconds to the `mui-series` mixin.

```scss
// 2 second delay before the first shake
@include mui-series(2s) {
  .shake  { @include mui-queue(2s, 0s, shake()); }
  .spin   { @include mui-queue(1s, 2s, spin()); }
  .wiggle { @include mui-queue(wiggle); }
}
```

To trigger the queue, add the class `.is-animating` to the parent container. This can be done easily in JavaScript:

```js
// Plain JavaScript (IE10+)
document.querySelector('.animation-wrapper').classList.add('is-animating');

// jQuery
$('.animation-wrapper').addClass('is-animating');
```

### Paused behavior

From Motion UI v1.3.0, the animation is reset when `.is-animating` is removed from an animated or animating element. This is the only way we found to make animations working on macOS Safari.

To rollback to the previous behavior and make the animation pause when `.is-animating` is removed, add `.mui-pause` to the parent container (or on `<body>` to affect all animations), but animations will not start on macOS Safari.

## Use with WOW.js

Motion UI can be paired with WOW.js to animate elements in as the page scrolls. [Learn more about WOW.js integration.](wow.md);
