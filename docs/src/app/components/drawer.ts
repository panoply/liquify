
export default class Drawer {

  constructor (drawer, options) {

    this.config = options;
    this.html = document.documentElement;
    this.panel = document.getElementById('drawer');
    this.drawer = document.querySelectorAll('button[data-drawer]');
    this.isOpen = false;
    this.init();

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

   open = (event) => {

     if (!this.isOpen) {
       return this.onOpen(event);
     }

   }

  close = () => {

    if (this.isOpen) {
      return this.onClose();
    }

  }

  touchMove = (event) => {

    if (this.isOpen) {
      if (this.panel.scrollHeight <= this.panel.clientHeight) {
        event.preventDefault();
      }
    }

  }

  keyboard = (event) => {

    if (event.keyCode === 27 || event.keyCode === 32) {
      this.close(event);
    }

  }

  reset () {

    if (this.isOpen) {
      this.panel.classList.add('d-none');
      this.onClose();
      this.panel.classList.remove('d-none');
    }

  }

  init () {

    this.panel.classList.remove('d-none');

    for (const action of this.drawer) {
      action.addEventListener('mouseup', this[action.dataset.drawer], false);
      action.addEventListener('touchend', this[action.dataset.drawer], false);
    }

  }

  onOpen (event) {

    this.isOpen = true;

    this.html.classList.add('drawer-open');

    this.panel.classList.add('drawer-active');
    this.panel.setAttribute('aria-hidden', false);
    this.panel.setAttribute('tabindex', '-1');
    this.panel.addEventListener('touchstart', this.touchStart, { passive: true });
    this.panel.focus();

    if (event) {
      this.activeElement = event.currentTarget;
      this.activeElement.setAttribute('aria-expanded', true);
    }

    document.addEventListener('keydown', this.keyboard);
    document.body.addEventListener('touchmove', this.touchMove);

  }

  onClose () {

    this.isOpen = false;
    this.html.classList.remove('drawer-open');
    this.panel.classList.remove('drawer-active');
    this.panel.setAttribute('aria-hidden', true);
    this.panel.removeEventListener('touchstart', this.touchStart);

    if (this.activeElement) {
      this.activeElement.setAttribute('aria-expanded', false);
      this.activeElement.focus();
    }

    document.removeEventListener('keydown', this.keyboard);
    document.body.removeEventListener('touchmove', this.touchMove);

  }

  opacity ({ propertyName }) {

    if (propertyName === 'opacity') {
      if (this.isOpen) {
        this.html.classList.add('drawer-open');
      } else {
        this.html.classList.remove('drawer-open');
      }
    }

  }

  touchStart ({
    target: {
      scrollTop,
      offsetHeight
    }
  }) {

    const position = scrollTop + offsetHeight;

    if (scrollTop === 0) {
      scrollTop = 1;
    } else if (position === scrollHeight) {
      scrollTop = scrollTop - 1;
    }

  }

}
