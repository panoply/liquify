import m from 'mithril';
import { Attrs } from 'types/moloko';

export const Settings: m.Component<Attrs> = {

  view: ({ attrs }) => [

    m('.potion_settings', { class: attrs ? 'open' : 'close' }, [

    ])

  ]

};
