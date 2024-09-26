# Changelog

# 2.0.6 (26 Sept 2024)

* Move to sass-embedded for faster builds
* Fixed some Sass deprecation warnings

# 2.0.5 (17 August 2023)

* Removed node-sass in favor of DartSass and resolved deprecations
* Updated the packages and got the build working again.
* Build works under Node 18.17.1.

# 2.0.4 (11 July 2022)

* Updated SCSS to remove deprecated slash division.
* Updated the packages and got the build working again.

# 2.0.3 (23 June 2018)

This version makes Motion UI compatible with Meteor > 1.4.1 by allowing Meteor to use newer versions of the `fourseven:scss` dependency. Motion UI stays compatible with Meteor v1.2.1 and above.

## 📄  Changes
* 🐛  #125 - Revise Meteor `fourseven:scss` compatibility to support Meteor>1.4.1 support (@ncoden)

# 2.0.2 (13 June 2018)

This version fixes an issue introduced in `v2.0.1` preventing Meteor build and update Meteor installation documentation. It is fully compatible with `v2.0.1` and do not introduce any API change.

## 📄  Changes
* 🐛  #121 - Revert "6059743 Unpin Meteor fourseven for a better Meteor compatibility" (@ncoden)
* 📖  #120 - Improve standard and Meteor documentation and update Meteor installation instructions (@ncoden)

# 2.0.1 (10 June 2018)

This version fixes various issues with the Meteor `zurb:motion-ui` package. It is fully compatible with `v2.0.0` and do not introduce any API change.

## 📄  Changes
* 🐛  eaf0971 - Add missing source files to Meteor `package.js` (@ncoden)
* 🐛  6059743 - Unpin Meteor fourseven for a better Meteor compatibility (@ncoden)
* 💻  98a6f9c - Remove outdated Meteor lockfile (@ncoden)
* 💻  9fdcbac - Update Lockfiles (@ncoden)

# 2.0.0 (25 May 2018)

We're happy to release Motion UI 2.0 with a better support of macOS Safari, API improvements, some bug fixes and various maintanance stuff. Warning: this release includes breaking changes, please read the migration notes below before upgrading.

## 🚀  Forward/backward defaults for transitions & effects

We changed the default direction of all transition and effect mixins so it depends on the `in` or `out` state. Calling the same mixin with `in` and `out` states now results in the same animation playing forward and backward.

#### ⚠️ Breaking changes

We changed the effects and transitions API the following way:
* All direction-related options now have opposite values as defaults according to the `in` or `out` state.
* The `slide` effect defaults are now `left` and `right` (according to `$state`) for consistency with the `slide` transition.
* The `zoom` transition and effect defaults are now `0` and `1` (according to `$state`) for consistency with others transitions defaults.

#### How to migrate

For the `hinge`, `slide`, `spin`, `zoom` effect functions and `mui-fade`, `mui-hinge`, `mui-slide`, `mui-spin`, `mui-zoom` transition mixins: if `$state: out` is used and no direction parameters are given, manually pass the "forward" parameters to keep them playing forward.

```scss
// Before
@include mui-fade($state: out);
// After
@include mui-fade($state: out, $from: 0, $to: 1);
```

For the `slide` effect function: if no `$direction` is given, manually pass `$direction: up` to keep the effect sliding to top instead of the new default `left`/`right`.

```scss
// Before
$effect: slide();
// After
$effect: slide($direction: up);
```

For the `mui-zoom` transition mixin: if no `$from` or `$to` are given, manually pass `$from: 1.5` and `$to: 1` to keep the previous behavior.

```scss
// Before
@include mui-zoom();
// After
@include mui-zoom($from: 1.5, $to: 1);
```

## 🚀  New pausing behavior for `mui-queue` for Safari support

With the previous `mui-series` behavior, the serie was paused until the `.is-animating` class was added. Unfortately, the implementation behind this did not work on all macOS Safari versions and was even breaking the whole animation. In order to fully support macOS Safari, we changed the `mui-series` paused
behavior and introduced `.is-paused`.

#### ⚠️ Breaking changes

When `.is-animating` is removed from `.mui-series`, the queue is now reset instead of paused. Setting `.is-animating` back will start the queue from its begining.

From now you can:
* **Start** the queue by adding `.is-animating`
* **Pause** the queue by adding `.is-paused`
* **Continue** the queue by removing `.is-paused`
* **Reset** the queue by removing `.is-animating`

#### How to migrate

If you need an animation to pause midway, add `.is-paused` instead of removing `.is-animating`. For example in jQuery:

```js
// Before
function play($elem) {
  $elem.addClass('is-animating');
}
function pause($elem) {
  $elem.removeClass('is-animating');
}

// After
function play($elem) {
  $elem.addClass('is-animating').removeClass('is-paused');
}
function pause($elem) {
  $elem.addClass('is-paused');
}
function reset($elem) {
  $elem.removeClass('is-animating is-paused');
}
```

As a side-effect of this, standard animation names are not supported anymore as `mui-series` queue names. Make sure you use unique names for your `mui-series` queues.

```scss
// Before
@include mui-series {
  .shake          { @include mui-queue(3s, 0s, shake); }
  .spin           { @include mui-queue(3s, 0s, spin); }
}

// After
@include mui-series {
  .my-serie-shake { @include mui-queue(3s, 0s, shake); }
  .my-serie-spin  { @include mui-queue(3s, 0s, spin); }
}
```

## 🐛  Safer animation keyframe names for CSS

Fixes a bug when using decimal values for the `zoom` effect and transition arguments would generate an invalid CSS Keyframes name and break the animation.

We changed the way we validate arguments and generate keyframes in such a way that they will always have a valid CSS name for all effects, transitions and arguments passed in.

## 🐛  Improved support for new Sass first-hand functions alongside function name strings

In order to improve modular namespacing, Sass 4 will only accepts first-class functions as argument for call() so functions will be called in their own context. This allow developers to make their Sass packages more modular while still being able to call functions given by the user. As a first step, Sass 3.5 added `get-function()` to get a first-hand function from its name and throw a warning if a function name string is passed to call(). Developers are now encouraged to use `get-function()`, but this would make their package incompatible to older Sass versions.

We added a set of helpers to support both first-hand function and function name strings in all our functions and mixins in all Sass versions. If you are using Motion UI with Sass >= 3.5, we recommend you to use pass your functions to Motion UI with `get-function(...)`. Otherwise, we may not be able to find them as their were defined in a context we not may have access to.

For more informations, see [Making Function Calls Across Sass Versions](http://oddbird.net/2017/03/30/safe-get/) and [Making sense out of Sass 3.5 first-class functions](https://medium.com/@kaelig/sass-first-class-functions-6e718e2b5eb0).

## 📦  jQuery is now a peerDependency

We think that like for most browser packages, you will want to only have one jQuery version installed and to choose its version by yourself. For this reason, jQuery cannot be considered as an _internal dependency_ (like implementation detail) and should be exposed to you as a _peerDependency_.

We did not include jQuery in the Motion UI **JavaScript** library before. If you use it, you should already have jQuery imported so Motion UI will work the same way as before.

**Note for npm users**: you may now have a warning message asking you to install the `jquery` npm package if you did not have it already. Please do so with a jQuery version that we support: `jquery@>=2.2.0`.


## 📄  All changes

* 📖  #94  - Fix parameter name for zoom animation (@cmarchena)
* 🐛  #100 - Fix deprecation warning for Sass 4.0 (@rediris, closes #99)
* 🐛  #102 - Make animation keyframes names safe for CSS (@ncoden, closes #96)
* 🚀  #103 - Make transitions/effects directions depending on in/out state (@ncoden, closes #83)
* 🚀  #108 - Change mui-series paused behavior for better Safari support (@ncoden, closes #97)
* 🐛  #109 - Ensure `-mui-keyframe-pct` returns a strintg instead of a list (@ncoden, closes #109)
* 📦  #110 - Update development dependencies to latest versions (@ncoden)
* 💻  #111 - Add Travis to run tests on `node-sass` 3/4/latest (@ncoden)
* 💻  #112 - Ensure support of iOS Safari 7 and drop support for Android browser 2.3 (@ncoden)
* 📖  #114 - Add a CHANGELOG file (@ncoden)
* 📖  #115 - Improve README design and installation instructions (@ncoden)
* 📦  #112 - Move jQuery to peerDependencies (@ncoden)
* 🐛  #117 - Fix support for function name strings for Sass < 3.5 (@ncoden, introduced in #100)


## 👩‍💻  Contributors

Thank you to the amazing people who contributed to this release:
* Carlos Marchena (@cmarchena)
* Kevin Ball (@kball)
* Nicolas Coden (@ncoden)
* Roman Edirisinghe (@rediris)


# 1.2.3 (28 June 2017)
> Released by Kevin Ball ([@kball](https://github.com/kball))

Bump jQuery dependency to `~2.2.0` in Bower too.

# 1.2.2 (26 February 2016)
> Released by Geoff Kimball ([@gakimball](https://github.com/gakimball))

Bump jQuery dependency to `~2.2.0`.

# 1.2.1 (10 February 2016)
> Released by Geoff Kimball ([@gakimball](https://github.com/gakimball))

Added a `composer.json`.

# 1.2.0 (2 February 2016)
> Released by Geoff Kimball ([@gakimball](https://github.com/gakimball))

- All of the CSS transition classes have default `transition` properties, which used to be applied using `@extends`. That caused all of those selectors with those properties to be bunched up at the top. Now they're added using an `@include`.
- Fixed an issue with fade keyframes containing invalid characters if a decimal was used as the start or end opacity.
- The built-in animation classes (`.wiggle`, `.shake`, `.spin-cw`, and `.spin-ccw`) now have `animation-duration` properties applied, so they can function without any extra CSS.
- Added a [tutorial on WOW.js integration](https://github.com/zurb/motion-ui/blob/master/docs/wow.md) to the documentation.
- Added a test HTML page to test transition classes.

# 1.1.1 (23 November 2015)
> Released by Geoff Kimball ([@gakimball](https://github.com/gakimball))

Fixed `.slide-out-down` class not working properly.

# 1.1.0 (3 November 2015)
> Released by Geoff Kimball ([@gakimball](https://github.com/gakimball))

**BREAKING CHANGES WEE WOO WEE WOO**

This release changes all of the camelCase CSS classes to be hyphenated. This is consistent with how everything else is written in Foundation-land. This does break semver, but we're ripping this band-aid off now before Foundation for Sites 6 is released.

Also in this release, we removed `-ms-` prefixing from the pre-compiled CSS. IE9 doesn't support transitions _or_ animations at all, and IE10 supports transitions, animations, and transforms unprefixed. This means the `-ms-` prefix isn't necessary at all. The JavaScript library still has a built-in fallback for browsers like IE9 that don't support transitions.

# 1.0.3 (22 October 2015)
> Released by Geoff Kimball ([@gakimball](https://github.com/gakimball))

Fixes an issue where transitions couldn't be created if `motion-ui-transitions` was not included.

# 1.0.2 (20 October 2015)
> Released by Geoff Kimball ([@gakimball](https://github.com/gakimball))

This release fixes a critical issue with `mui-animation()` and `mui-queue()` which prevented effect parameters passed as strings from working. (c72b65851732240dc2a26a0a298e78bdecdcb4de)

# 1.0.1 (19 October 2015)
> Released by Geoff Kimball ([@gakimball](https://github.com/gakimball))

This update fixes a few pressing launch bugs with animation classes. Huge thanks to @HugoGiraudel for submitting over a dozen pull requests that fix bugs and improve code quality!
- #22: `mui-animation` now uses `@at-root` when printing CSS.
- #26: Remove quotes from keyframe percentages.
- #28: Remove quotes from the value of `animation-name`.
- #30: Removed `turn-to-deg` function and use `turn` values for spin animations instead of `deg`.

We also got many, many pull requests (once again, mostly from @HugoGiraudel) that improve the quality of the Sass codebase, as well as the SassDoc documentation backing it.

# 1.0.0 (8 October 2015)
> Released by Geoff Kimball ([@gakimball](https://github.com/gakimball))

Initial release! Includes these effects:
- Shake
- Spin
- Scale
- Fade
- Hinge
- Wiggle
- Shake

Also includes an animation queuing system.
