import type { Attrs } from '../model/types';
import m from 'mithril';
import { Rules } from './rules';
import moloko from '@liquify/moloko';

export const Layout: m.Component<Attrs> = ({
  view: ({
    attrs
  }) => m(
    '.row.g-0.vh-100.d-flex.ai-center.jc-center'
    , m(
      '.col-auto.vh-100.bd-right.rules-bg'
      , { style: 'width: 280px; min-width: 280px;' }
      , m(
        '.px-0.py-1'
        , { id: 'rules' }
        , m(Rules, attrs)
      )
    )
    , m(
      '.col.vh-100.output-bg'
      , m(
        '.panel'
        , {
          oncreate: async ({ dom }) => {
            await moloko.mount(dom);
          }
        }
      )
    )
  )
});
