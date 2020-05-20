import { Controller } from 'stimulus'
import { CountUp } from 'countup.js'
import ScrollOut from 'scroll-out'

export default class extends Controller {

  /**
   * Stimulus Targets
   *
   * @static
   * @memberof Slideshow
   */
  static targets = [ 'number' ];

  /**
   * Stimulus Initialize
   */
  initialize () {

    this.limits = {}
    this.numberTargets.forEach(element => this.count(element))

  }

  /**
   * Stimulus Connect
   */
  connect () {

    this.scroll = ScrollOut({
      scope: document.body,
      targets: this.element,
      onShown: this.onShown,
      onHidden: this.onHidden,
      once: this.data.has('once'),
      threshold: parseFloat(this.data.get('threshold')),
      cssProps: {
        visibleY: true,
        visibleX: false
      }
    })

  }

  /**
   * Stimulus Disconnect
   */
  disconnect () {

    this.scroll.teardown()

  }

  /**
   * Reset
   * Executes on the Turbolinks `before-cache` event
   */
  reset () {

    this.scroll.teardown()

  }

  /**
   * Hydrate
   * Modifies the SSR content
   */
  count (target) {

    const { innerText, dataset: { name } } = target

    this.limits[name] = new CountUp(target, parseInt(innerText), {
      start: 0,
      end: parseInt(innerText),
      decimals: 0,
      duration: 4,
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.'
      }
    })

  }

  onShown = () => {

    Object.values(this.limits).forEach(limit => limit.start())

  }

  onHidden = () => {

    Object.values(this.limits).forEach(limit => limit.reset())

  }

}
