# CSS Classes

The Sass mixins are the heart of Motion UI, but the library also includes many pre-made CSS classes to get you up and running faster.

## Defaults

The pre-made classes all use these transition/animation defaults:

- **Speed:** 500ms
- **Timing:** Linear
- **Delay:** 0s

These defaults can be changed by modifying the [Motion UI settings](configuration.md);

## Transition Classes

- **Slide:**
  - `.slideInDown`
  - `.slideInLeft`
  - `.slideInUp`
  - `.slideInRight`
  - `.slideOutDown`
  - `.slideOutLeft`
  - `.slideOutUp`
  - `.slideOutRight`
- **Fade:**
  - `.fadeIn`
  - `.fadeOut`
- **Hinge:**
  - `.hingeInFromTop`
  - `.hingeInFromRight`
  - `.hingeInFromBottom`
  - `.hingeInFromLeft`
  - `.hingeInFromMiddleX`
  - `.hingeInFromMiddleY`
  - `.hingeOutFromTop`
  - `.hingeOutFromRight`
  - `.hingeOutFromBottom`
  - `.hingeOutFromLeft`
  - `.hingeOutFromMiddleX`
  - `.hingeOutFromMiddleY`
- **Scale:**
  - `.scaleInUp`
  - `.scaleInDown`
  - `.scaleOutUp`
  - `.scaleOutDown`
- **Spin:**
  - `.spinIn`
  - `.spinOut`
  - `.spinInCCW`
  - `.spinOutCCW`

## Animation Classes

- `.shake`: shakes the element horizontally.
- `.wiggle`: rotates the element back and forth.
- `.spin-cw`: rotates the element once.
- `.spin-ccw`: rotates the element once, counterclockwise.

## Modifier Classes

Modifiers work with both transitions and animations.

- **Speed:**
  - `.slow` (750ms)
  - `.fast` (250ms)
- **Timing:**
  - `.linear`
  - `.ease`
  - `.easeIn`
  - `.easeOut`
  - `.easeInOut`
  - `.bounceIn`
  - `.bounceOut`
  - `.bounceInOut`
- **Delay:**
  - `.short-delay` (300ms)
  - `.long-delay` (700ms)



