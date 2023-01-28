import { Controller } from '@hotwired/stimulus';
import stickybits, { StickyBits } from 'stickybits';
import { isOutOfViewport, isScreen } from '../utils/common';

export class Sticky extends Controller {

  /**
   * Stimulus: Targets
   */
  static targets = [
    'viewport',
    'fallback'
  ];

  /**
   * Stimulus: Values
   */
  static values = {
    useParent: Boolean,
    breakpoint: String,
    offset: Number,
    useFixed: Boolean,
    noStyles: Boolean,
    bottom: Boolean,
    bounding: Boolean,
    scrollElement: Boolean,
    offsetElement: String,
    next: String
  };

  /**
   * Stimulus: Classes
   */
  static classes = [
    'parent',
    'sticky',
    'stuck'
  ];

  inViewport = () => {

    if (isOutOfViewport(this.viewportTarget)) {
      console.log('outofview');
    }

  };

  /**
   * Stimulus: Initialize
   */
  initialize () {

    this.target = this.element;
    this.enabled = this.hasBreakpointValue
      ? isScreen(this.breakpointValue)
      : true;

    if (!this.enabled) return;

    this.options = {};

    if (this.hasBottomValue && this.bottomValue) {
      this.options.verticalPosition = 'bottom';
    }

    if (this.hasBoundingValue) {
      this.options.useGetBoundingClientRect = this.boundingValue;
    }

    if (this.hasNoStylesValue) {
      this.options.noStyles = this.noStylesValue;
    }
    if (this.hasOffsetValue) {
      this.options.stickyBitStickyOffset = this.offsetValue;
    }

    if (this.hasScrollElementValue) {
      this.options.scrollEl = this.scrollElementValue;
    }

    if (this.hasUseFixedValue) {
      this.options.useFixed = this.useFixedValue;
    }

    if (this.hasParentClass || this.hasStuckClass || this.hasStickyClass) {
      this.options.useStickyClasses = true;
    }

  }

  /**
   * Stimulus: Connect
   */
  connect () {

    if (!this.enabled && this.sticky instanceof stickybits) {
      this.disconnect();
    } else {

      if (!this.enabled) return;

      if (this.hasOffsetElementValue) {
        this.options.stickyBitStickyOffset = this.getElementOffset();

      }

      if (this.hasUseParentValue && this.useParentValue) {
        this.sticky = stickybits(this.target.parentElement, this.options);
      } else {
        this.sticky = stickybits(this.target, this.options);
      }
    }
  }

  /**
   * Stimulus: Disconnect
   */
  disconnect (): void {

    if (this.sticky) this.sticky.cleanup();
    if (this.hasViewportTarget) removeEventListener('scroll', this.inViewport, false);

  }

  getElementOffset () {

    const elements = this.offsetElementValue.split(',');

    let offset: number = 0;

    for (const selector of elements) {
      const { offsetHeight } = document.querySelector(selector) as HTMLElement;
      offset += offsetHeight;
    }

    return offset;
  }

  /* -------------------------------------------- */
  /* TYPE VALUES                                  */
  /* -------------------------------------------- */

  target: HTMLElement | Element;
  /**
   * Stickybits: The stickybits instance
   */
  sticky: StickyBits;
  /**
   * Stickybits: The stickybits instance
   */
  options: StickyBits.Options;
  /**
   * Stimulus: Whether or not sticky is enabled/disabled
   */
  enabled: boolean;
  /**
   * Stimulus: Breakpoint toggles
   */
  breakpointValue: 'xs' | 'sm' | 'md' | 'lg';
  /**
   * Stimulus:  Whether or not `breakpointValue` value was passed
   */
  hasBreakpointValue: boolean;
  /**
   * Stimulus: Use the parent element as the selector
   */
  useParentValue: boolean;
  /**
   * Stimulus: An offset element id to use as the offset point to stack sticky's.
   */
  offsetElementValue: string;
  /**
   * Stimulus: Whether or not `offsetElement` value was passed
   */
  hasOffsetElementValue: boolean;
  /**
   * Stimulus: Whether or not `useParentValue` value was passed
   */
  hasUseParentValue: boolean;
  /**
   * Stimulus: Sticky offset value
   */
  offsetValue: number;
  /**
   * Stimulus: Whether or not `offsetValue` value was passed
   */
  hasOffsetValue: boolean;
  /**
   * Stimulus: Sticky offset value
   */
  noStylesValue: boolean;
  /**
   * Stimulus: Whether or not `noStylesValue` value was passed
   */
  hasNoStylesValue: boolean;
  /**
   * Stimulus: Stick elements to the bottom - Sets `verticalPosition` to `bottom` when `true`
   */
  bottomValue: boolean;
  /**
   * Stimulus: Whether or not `bottomValue` value was passed
   */
  hasBottomValue: boolean;
  /**
   * Simulus: Disabled use of `offsetTop` - Sets `useGetBoundingClientRect` in Stickybits
   */
  boundingValue: boolean;
  /**
   * Stimulus: Whether or not `boundingValue` value was passed
   */
  hasBoundingValue: boolean;
  /**
   * Stimulus: Disabled the use of `position: sticky` and instead uses `position: fixed`
   */
  useFixedValue: boolean;
  /**
   * Stimulus: Whether or not `useFixedValue` value was passed
   */
  hasUseFixedValue: boolean;
  /**
   * Stimulus: Defines a custom scroll elemement to use
   */
  scrollElementValue: string;
  /**
   * Stimulus: Whether or not `scrollElement` value was passed
   */
  hasScrollElementValue: boolean;
  /**
   * Simulus: Whether or not `fallbackValue` was passed
   */
  hasFallbackValue: boolean;
  /**
   * Stimulus: Whether to use the fallback `.sticky-fallback` multiple selector.
   */
  fallbackValue: boolean;
  /* -------------------------------------------- */
  /* TARGETS                                      */
  /* -------------------------------------------- */

  /**
   * Stimulus: The first matching viewport target
   */
  viewportTarget: HTMLElement;
  /**
   * Stimulus: All viewport targets
   */
  viewportTargets: HTMLElement[];
  /**
   * Stimulus: Whether or not a `viewport` target exists
   */
  hasViewportTarget: boolean;

  /* -------------------------------------------- */
  /* TYPE CLASSES                                 */
  /* -------------------------------------------- */

  /**
   * Stimulus: So that styles can easily be added to the parent of a Stickbit
   */
  parentClass: string;
  /**
   * Stimulus: Whether or not `parentClass` was passes
   */
  hasParentClass: boolean;
  /**
   * Stimulus: If the selected element is stopped at the bottom of its parent.
   */
  stuckClass: string;
  /**
   * Stimulus: Whether or not `stuckClass` was passes
   */
  hasStuckClass: boolean;
  /**
   * Stimulus: If the selected element is sticky.
   */
  stickyClass: string;
  /**
   * Stimulus: Whether or not `stuckClass` was passes
   */
  hasStickyClass: boolean;

}
