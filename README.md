# Motion UI

A Sass library for creating CSS transitions and animations from your friends at ZURB. Used by Foundation for Sites and Foundation for Apps.

## Settings

Motion UI's settings are stored in six Sass variables. Refer to the Motion UI documentation to see what each one does.

```scss
$motion-ui-classes: ();
$motion-ui-states: ();
$motion-ui-speeds: ();
$motion-ui-delays: ();
$motion-ui-easings: ();
$motion-ui-settings: ();
```

## Transitions

Transitions are used to show and hide components, moving them between an active and inactive state. Create a transition by defining it within a class.

```scss
.slideIn {
  @include mui-slide(in, bottom);
}
```

This creates a set of classes that can be used with an animation library, such as Foundation for Sites's Motion library, or ngAnimate.

```css
.slideIn.mui-enter { }
.slideIn.mui-enter.mui-enter-active { }
```

To modify the structure of the transition classes, change the `$motion-ui-classes` variable.

## Animations

Animations are for one-off bits of flair, like making an image shake or a series of elements animate in. Our preset animations can be combined on one element, or strung together into a series.

## Running this repo

Requires Node.

```
git clone https://github.com/zurb/motion-ui.git
cd motion-ui
npm i
npm start
```