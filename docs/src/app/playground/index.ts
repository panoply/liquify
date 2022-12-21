import m from 'mithril';
import { state } from './model/state';
import { actions } from './model/actions';
import { Layout } from './editor/layout';

const s = state();
const a = actions(s);

m.route.prefix = '';
m.route(document.querySelector('#playground'), '/playground/prettify', {
  '/playground/prettify': {
    render: () => m(Layout, { s, a })
  }
});
