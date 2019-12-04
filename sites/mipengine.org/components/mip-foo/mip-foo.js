export default class MIPFoo extends MIP.CustomElement {
  build () {
    console.log('foo build')
    // this.addEventAction('load', () => console.log('foo done event'))

    this.addEventAction('done', () => {
      console.log('foo done')
    })

    setTimeout(() => {
      MIP.viewer.eventAction.execute('a', this.element, {})
    })
  }
}
