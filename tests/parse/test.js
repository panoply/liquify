import m from 'mithril'
import { Icon, List, ListItem, Collapse, Card, Colors } from 'construct-ui'
import locale from '../locales/navigation'
import { pathexp } from '../utilities/common'

/**
 * Sidebar Component (Navigation)
 *
 * @param {*} params
 */
export default {
  view: ({ attrs: { actions, state } }) => m(List, {
    style: {
      backgroundColor: 'transparent',
      maxHeight: '100%'
    }
  }, locale.map(
    (

      {
        label,
        icon,
        route,
        subnav
      }

    ) => {
      m(m.route.Link, { href: route }, (
        m(ListItem, {
          label,
          contentLeft: m(Icon, { name: icon })
        })
      )),
        subnav ? m(Collapse, { isOpen: pathexp() === route }, (
          m(Card, {
            elevation: 0,
            size: 'xs',
            interactive: true,
            fluid: true,
            class: 'p-0',
            style: {
              borderLeft: 'none',
              borderTop: 'none',
              borderBottom: 'none',
              backgroundColor: Colors.GREY200
            }
          }, (
            subnav.map(({ label, route }) => (
              m(m.route.Link, { href: route }, (
                m(ListItem, {
                  label,
                  style: {
                    borderBottom: 'none',
                    padding: '5px 0 5px 34px',
                    fontWeight: m.route.get() === route ? 800 : 200
                  }
                })
              ))
            ))
          ))
        )) : null
  ]))
}
