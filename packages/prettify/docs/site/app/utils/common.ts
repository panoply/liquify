import * as viewport from '@panoply/viewports';

/**
 * Check if an element is out of the viewport
 */
export function isOutOfViewport (element: HTMLElement) {

  // Get element's bounding
  const bounding = element.getBoundingClientRect();

  const top = bounding.top < 0;
  const left = bounding.left < 0;
  const bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight);
  const right = bounding.right > (window.innerWidth || document.documentElement.clientWidth);

  return top || left || bottom || right;

};

/**
 * Whether or not we are within a screen viewport
 */
export function isScreen (screens: string) {

  return screens.split('|').some(viewport.active);

}
