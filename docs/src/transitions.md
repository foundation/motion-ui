---
title: Transitions
sass: src/transitions/*.scss
---

Each transition has its own mixin, with multiple parameters that can customize the details of the effect. To create a transition class, just `@include` the mixin inside a class. Motion UI will create the necessary boilerplate for you.

Here's a basic fade in class. The first parameter of every transition mixin is a *state*, which is either `in` or `out`. In transitions reveal elements, while out transitions hide them.

```scss
.fade-in {
  @include mui-fade(in);
}
```

Here's what the CSS looks like.

```css
.fade-in.mui-enter {
  opacity: 0;
  transition-property: opacity; }

.fade-in.mui-enter.mui-enter-active {
  opacity: 1; }
```

The last three parameters of every transition mixin are the same: `$duration`, which sets the speed of the effect; `$timing`, which adjusts the easing; and `$delay`, which adds a delay before the effect starts.

```scss
.fade-in {
  // A long, long fade
  @include mui-fade(in, $duration: 10s);
}
```
