import { Application } from '@hotwired/stimulus';
import { Accordion } from './components/accordion';
import { Drawer } from './components/drawer';
import { Sticky } from './components/sticky';
import spx from 'spx';

spx.connect({
  targets: [
    '#main'
  ],
  hover: {
    trigger: 'href'
  },
  progress: false
})((state) => {

  const stimulus = Application.start();

  stimulus.register('drawer', Drawer);
  stimulus.register('accordion', Accordion);
  stimulus.register('sticky', Sticky);

});
