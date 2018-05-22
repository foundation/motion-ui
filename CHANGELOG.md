# Changelog

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
