'use strict';

// Polyfill for requestAnimationFrame
(function() {
  if (!Date.now)
    Date.now = function() { return new Date().getTime(); };

  const vendors = ['webkit', 'moz'];
  for (let i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
      const vp = vendors[i];
      window.requestAnimationFrame = window[vp+'RequestAnimationFrame'];
      window.cancelAnimationFrame = (window[vp+'CancelAnimationFrame']
                                 || window[vp+'CancelRequestAnimationFrame']);
  }
  if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent)
    || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
    let lastTime = 0;
    window.requestAnimationFrame = function(callback) {
        const now = Date.now();
        const nextTime = Math.max(lastTime + 16, now);
        return setTimeout(function() { callback(lastTime = nextTime); },
                          nextTime - now);
    };
    window.cancelAnimationFrame = clearTimeout;
  }
})();

const initClasses   = ['mui-enter', 'mui-leave'];
const activeClasses = ['mui-enter-active', 'mui-leave-active'];

// Find the right "transitionend" event for this browser
const endEvent = (function() {
  const transitions = {
    'transition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'OTransition': 'otransitionend'
  }
  const elem = window.document.createElement('div');

  for (const t in transitions) {
    if (typeof elem.style[t] !== 'undefined') {
      return transitions[t];
    }
  }

  return null;
})();

function animate(isIn, element, animation, cb) {
  if ('string' === typeof element) {
    element = document.querySelector(element);
  } else if (element instanceof NodeList) {
    element = element.item(0);
  } else if (!element instanceof HTMLElement) {
    throw new Error('The argument to "animate" function must be one of: CSS selector, HTMLElement.')
  }

  if (endEvent === null) {
    // @todo polyfill show()
    element.hidden = !isIn; // isIn ? element.show() : element.hide();
    cb();
    return;
  }

  const initClass = isIn ? initClasses[0] : initClasses[1];
  const activeClass = isIn ? activeClasses[0] : activeClasses[1];

  // Set up the animation
  reset();
  element.classList.add(animation);
  element.style.transition = 'none';
  requestAnimationFrame(function () {
    element.classList.add(initClass);
    // @todo polyfill show()
    if (isIn) element.hidden = false; // if (isIn) element.show();
  });

  // Start the animation
  requestAnimationFrame(function() {
    element.offsetWidth;
    element.style.transition = '';
    element.classList.add(activeClass);
  });

  // Clean up the animation when it finishes
  element.addEventListener('transitionend', finish, { once: true });

  // Hides the element (for out animations), resets the element, and runs a callback
  function finish() {
    // @todo
    if (!isIn) element.hidden = true; // element.hide();
    reset();
    if (cb) cb.apply(element);
  }

  // Resets transitions and removes motion-specific classes
  function reset() {
    element.style.transitionDuration = 'initial';
    element.classList.remove(initClass, activeClass, animation);
  }
}

const MotionUI = {
  animateIn: function(element, animation, cb) {
    animate(true, element, animation, cb);
  },

  animateOut: function(element, animation, cb) {
    animate(false, element, animation, cb);
  }
};
