---
title: Animations
sass: src/animations/*.scss
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

Keyframe functions can customized with a state of `in` or `out` by default, and one or more special options depending on the animation. For example, with `shake()` and `wiggle()` you can set the intensity of the effect, and with `spin()` you can set how many degrees the spin goes.

---

## Combination Effects

Multiple keyframe effects can be combined into one. For example, you can combine a fade, slide, and spin into one animation, for something truly monstrous.

Use the `combo()` function to generate a multi-faceted animation.

```scss
.slide-and-fade-and-spin {
  $combo-keyframe: combo(slide(), fade(), spin());
  @include mui-animation($combo-keyframe);
}
```

**Note that this doesn't work with the `shake()` or `wiggle()` animations. Only animations with single start and end keyframes can be combined.**

---

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

Begin your series with the `mui-series()` mixin. Inside this mixin, attach animations to classes with the `mui-queue()` mixin. Like `mui-animation()`, it accepts a keyframe function. The mixin also accepts an animation duration, and a gap, which creates a pause between the current animation and the next one.

```scss
@include mui-series {
  // 2 second shake
  .shake  { @include mui-queue(shake(), 2s); }
  // 1 second spin with a 2 second pause
  .spin   { @include mui-queue(spin(), 1s, 2s); }
  // 1 second wiggle (the default)
  .wiggle { @include mui-queue(wiggle()); }
}
```

Add a delay to the start of the queue with the `mui-delay()` mixin.

```scss
@include mui-series {
  // 2 second delay before the first shake
  @include mui-delay(2s);
  .shake  { @include mui-queue(shake(), 2s); }
  .spin   { @include mui-queue(spin(), 1s, 2s); }
  .wiggle { @include mui-queue(wiggle()); }
}
```
