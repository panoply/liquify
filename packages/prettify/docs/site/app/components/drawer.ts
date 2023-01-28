import { Controller } from '@hotwired/stimulus';
import * as spx from 'spx';

/* -------------------------------------------- */
/* CLASS                                        */
/* -------------------------------------------- */

export class Drawer extends Controller {

  openValue: boolean;

  static values = {
    open: {
      type: Boolean,
      default: false
    }
  };

  static targets = [
    'mount'
  ];

  static classes = [
    'overlay'
  ];

  initialize () {

    if (this.element.classList.contains('d-none')) {
      this.element.classList.remove('d-none');
    }

  }

  connect () {

    // const element = `[data-drawer="${this.element.id}"]`
    // @ts-ignore
    this.buttons.forEach((btn) => btn.addEventListener('click', this.toggle));

    if (window.innerWidth < 400) {
      spx.on('load', () => {

        if (this.openValue) setTimeout(this.doClose, 100);

      });
    }
  }

  disconnect () {

    this.buttons.forEach(btn => btn.removeEventListener('click', this.toggle));

  }

  toggle = (event: MouseEvent) => {

    event.preventDefault();

    if (event.target instanceof Element) {
      if (event.target.getAttribute('data-spinner') === 'true') {
        event.target.classList.add('loading');
      }
    }

    this.openValue = !this.openValue;

    return this.openValue ? this.doOpen() : this.doClose();

  };

  click () {

    if (this.openValue) this.doClose();

  }

  touchMove = (event: TouchEvent) => {

    if (this.openValue) {
      if (this.element.scrollHeight <= this.element.clientHeight) {
        event.preventDefault();
      }
    }

  };

  keyboard = (event: KeyboardEvent) => {

    if (event.keyCode === 27 || event.keyCode === 32) {
      this.doClose();
    }

  };

  doOpen () {

    this.application.element.classList.add('drawer-open');
    this.overlay.addEventListener('click', this.doClose.bind(this), { passive: true });

    if (this.element instanceof HTMLElement) {
      this.element.focus();
      this.element.addEventListener('touchstart', this.touchStart, { passive: true });
      this.element.classList.add('drawer-active');
    }

  }

  doClose = () => {

    this.application.element.classList.remove('drawer-open');

    if (this.element instanceof HTMLElement) {
      this.element.classList.remove('drawer-active');
      this.element.removeEventListener('touchstart', this.touchStart);
      this.overlay.removeEventListener('click', this.doClose);
    }

    this.openValue = false;

  };

  touchStart ({ target }: TouchEvent) {

    if (target instanceof HTMLElement) {

      const { scrollTop, offsetHeight } = target;
      const position = scrollTop + offsetHeight;

      if (scrollTop === 0) {
        target.scrollTop = 1;
      } else if (position === scrollTop) {
        target.scrollTop = scrollTop - 1;
      }
    }
  }

  get transition () {

    const element = document.createElement('div');
    const transitions = {
      transition: 'transitionend',
      WebkitTransition: 'webkitTransitionEnd'
    };

    for (const transition in transitions) {
      if (element.style[transition] !== undefined) {
        return transitions[transition];
      }
    }

  }

  get buttons () {

    const attr = `[data-drawer="${this.element.id}"]`;
    return this.application.element.lastElementChild.querySelectorAll(attr);

  }

  get overlay () {

    return this.application.element.lastElementChild.querySelector('#drawer-overlay');

  }

}
