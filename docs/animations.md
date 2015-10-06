# Animations

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

.zoomIn {
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
  .fadeZoom { @include mui-queue(1s, 0s, fade, zoom); }
}
```

To add a delay to the start of the queue, add the length in seconds to the `mui-series` mixin.

```scss
// 2 second delay before the first shake
@include mui-series(2s) {
  .shake  { @include mui-queue(shake(), 2s); }
  .spin   { @include mui-queue(spin(), 1s, 2s); }
  .wiggle { @include mui-queue(wiggle()); }
}
```

To trigger the queue, add the class `.is-animating` to the parent container. This can be done easily in JavaScript:

```js
// Plain JavaScript (IE10+)
document.querySelector('.animation-wrapper').classList.add('is-animating');

// jQuery
$('.animation-wrapper').addClass('is-animating');
```


## Mixins

### mui-animation()

Creates a keyframe from one or more effect functions and assigns it to the element by adding the `animation-name` property.

**Parameters:**

- `effects...` (Function) - One or more effect functions to build the keyframe with.

### mui-keyframes()

Creates a keyframe from one or more effect functions. Use this function instead of `mui-animation` if you want to create a keyframe animation *without* automatically assigning it to the element.

**Parameters:**

- `name` (String) - Name of the keyframe.
- `effects...` (Function) - One or more effect functions to build the keyframe with.

### -mui-keyframe-get()

Prints the CSS properties from a specific key in a keyframes map. Used to borrow CSS from keyframe functions for use in transitions.

**Parameters:**

- `kf` (Map) - Keyframe map to extract from.
- `key` (Number) - Key in the map to print the CSS of.

### mui-series()

Creates a new animation queue.

**Parameters:**

- `delay` (Number) - Delay in seconds or milliseconds to place at the front of the animation queue. (**Default:** 0s)

### mui-queue()

Adds an animation to an animation queue. Only use this mixin inside of `mui-series()`.

**Parameters:**

- `duration` (Number) - Length of the animation. (**Default:** 1s)
- `gap` (Number) - Amount of time to pause before playing the animation after this one. Use a negative value to make the next effect overlap with the current one. (**Default:** 0s)
- `keyframes...` (Function) - One or more effect functions to build the keyframe with.

## Functions

### fade()

Creates a fading animation.

**Parameters:**

- `from` (Number) - Opacity to start at. (**Default:** 0)
- `to:` (Number) - Opacity to end at. (**Default:** 1)

### hinge()

Creates a hinge effect by rotating the element.

**Parameters:**

- `state` (Keyword) - State to transition to. (**Default:** in)
- `from` (Keyword) - Edge of the element to rotate from. Can be `top`, `right`, `bottom`, or `left`. (**Default:** left)
- `axis` (Keyword) - Axis of the element to rotate on. Can be `edge` or `center`. (**Default:** edge)
- `perspective` (Number) - Perceived distance between the viewer and the element. A higher number will make the rotation effect more pronounced. (**Default:** 2000px)
- `turn-origin` (Keyword) - Side of the element to start the rotation from. Can be `from-back` or `from-front`. (**Default:** from-back)

### -mui-keyframe-pct()

Creates a string for a CSS keyframe, by converting a list of numbers to a comma-separated list of percentage values.

**Parameters:**

- `input` (List) - List of numbers to use.

### -mui-keyframe-split()

Reformats a map containing keys with a list of values, so that each key is a single value.

**Parameters:**

- `map` (Map) - Map to split up.

### -mui-keyframe-combine()

Combines a series of keyframe objects into one.

**Parameters:**

- `maps...` (Map) - A series of maps to merge, as individual parameters.

### -mui-merge-properties()

Combines two maps of CSS properties into one map. If both maps have a transform property, the values from each will be combined into one property.

**Parameters:**

- `one` (Map) - First map to merge.
- `two` (Map) - Second map to merge.

### shake()

Creates a shaking animation.

**Parameters:**

- `intensity` (Number) - Intensity of the shake, as a percentage value. (**Default:** 7%)

### slide()

Creates a sliding animation.

**Parameters:**

- `state` (Keyword) - Whether to move to (`in`) or from (`out`) the element's default position. (**Default:** in)
- `direction` (Keyword) - Direction to move. Can be `up`, `down`, `left`, or `right`. (**Default:** up)
- `amount` (Number) - Distance to move. Can be any CSS length unit. (**Default:** 100%)

### spin()

Creates a spinning animation.

**Parameters:**

- `direction` (Keyword) - Direction to spin. Should be `cw` (clockwise) or `ccw` (counterclockwise). (**Default:** cw)
- `amount` (Number) - Amount to spin. Can be any CSS angle unit. (**Default:** 360deg)

### wiggle()

Creates a wiggling animation.

**Parameters:**

- `intensity` (Number) - Intensity of the wiggle. Can be any CSS angle unit. (**Default:** 7deg)

### zoom()

Creates a scaling transition. A scale of `1` means the element is the same size. Larger numbers make the element bigger, while numbers less than 1 make the element smaller.

**Parameters:**

- `from` (Number) - Size to start at. (**Default:** 1.5)
- `from` (Number) - Size to end at. (**Default:** 1)
