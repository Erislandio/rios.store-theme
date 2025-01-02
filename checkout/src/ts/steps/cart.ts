// import { formatCurrency } from '@utils'

interface Step {
  name: string
}

export const Cart = {
  init() {
    this.activeStepBar()
  },
  activeStepBar(): void {
    $(window).on('ready hashchange', () => {
      const hash: string = window.location.hash.replace('#/', '')

      const steps: Step[] = [
        { name: 'cart' },
        { name: 'profile' },
        { name: 'shipping' },
        { name: 'payment' },
      ]

      const findIndex: number = steps.findIndex(
        (item: Step) => item.name === hash
      )

      function activateStep(name: string): void {
        const element: JQuery = $(`#${name}`)

        element.addClass('active')
        $(`#${name} + span`).addClass('active')
      }

      if (findIndex === -1) {
        return activateStep('profile')
      }

      function inactiveStep(name: string): void {
        const element: JQuery = $(`#${name}`)

        element.removeClass('active')
        $(`#${name} + span`).removeClass('active')
      }

      steps.forEach((item: Step, index: number) => {
        if (index < findIndex) {
          activateStep(item.name)
        } else if (index > findIndex) {
          inactiveStep(item.name)
        }

        if (index === findIndex) {
          const element: JQuery = $(`#${item.name}`)

          element.addClass('active')
          $(`#${item.name} + span`).removeClass('active')
        }
      })
    })
  },
}
