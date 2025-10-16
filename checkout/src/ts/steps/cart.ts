// import { formatCurrency } from '@utils'

interface Step {
  name: string
}

export const Cart = {
  init() {
    this.activeStepBar()
    this.addShareButton()
  },
  addShareButton() {
    $(window).on('orderFormUpdated.vtex', function (_, orderForm) {
      const container = $('.summary-template-holder')

      if (!orderForm?.items?.length) return

      if (container.length && $('#custom-share-button').length === 0) {
        container.prepend(`
            <div class="share" id="custom-share-button">
              <button class="share-button">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                    <g clip-path="url(#clip0_4233_2753)">
                      <path d="M18.7751 4.30197C18.7317 4.45532 18.6871 4.60827 18.6453 4.76201C18.3832 5.72434 17.796 6.423 16.9166 6.87835C16.3987 7.14631 15.8369 7.26993 15.2615 7.22299C14.4881 7.15962 13.7898 6.88265 13.2363 6.31269C13.1181 6.19103 13.0325 6.14291 12.8642 6.25088C11.9645 6.82632 11.0566 7.38924 10.149 7.95295C9.36427 8.44037 8.57759 8.92545 7.78856 9.40583C7.69937 9.4602 7.68489 9.49463 7.71893 9.59869C7.9509 10.3091 7.95129 11.0246 7.71893 11.7346C7.6845 11.8394 7.69976 11.8723 7.78934 11.927C8.75832 12.5228 9.72377 13.1245 10.69 13.7246C11.4747 14.212 12.2599 14.6994 13.0583 15.1954C13.3462 14.8805 13.6756 14.6251 14.0691 14.4444C14.4916 14.2503 14.9223 14.1447 15.3878 14.1369C15.9711 14.1271 16.5203 14.2362 17.0296 14.5214C17.9615 15.0437 18.5365 15.8198 18.6996 16.8869C18.7094 16.9499 18.7493 17.0086 18.7755 17.0692V17.7331C18.7497 17.7871 18.7071 17.8391 18.7 17.8954C18.621 18.5108 18.3581 19.0397 17.9587 19.5071C17.4732 20.0755 16.865 20.435 16.135 20.5943C15.5146 20.73 14.9035 20.6901 14.3163 20.4601C13.5242 20.1499 12.9131 19.61 12.5443 18.8445C12.1429 18.0116 12.083 17.1408 12.4132 16.2603C12.4195 16.2434 12.414 16.2219 12.414 16.2008C11.2169 15.4568 10.0211 14.7139 8.8256 13.971C8.26972 13.6256 7.71345 13.2813 7.15874 12.9344C7.05703 12.8706 6.98975 12.9011 6.91307 12.9829C6.43269 13.4977 5.82557 13.7836 5.14411 13.9026C4.25885 14.0567 3.44165 13.8564 2.72108 13.324C2.0052 12.7951 1.54321 12.0957 1.40747 11.2014C1.24903 10.1565 1.51543 9.24388 2.22662 8.4525C2.73477 7.88684 3.36772 7.53477 4.10042 7.44049C4.97825 7.32783 5.82791 7.48 6.56022 8.03627C6.68775 8.13329 6.81176 8.23891 6.91816 8.35783C7.00148 8.45132 7.07307 8.45093 7.16578 8.39343C8.16997 7.76831 9.17298 7.14162 10.1783 6.51924C10.8727 6.08932 11.5702 5.66449 12.2677 5.24005C12.3803 5.1712 12.4292 5.10978 12.3792 4.95761C12.024 3.87792 12.2086 2.86982 12.8701 1.965C13.3939 1.24834 14.1294 0.844634 15.0084 0.7085C15.0291 0.70537 15.0471 0.684637 15.0666 0.672119C15.3397 0.672119 15.6131 0.672119 15.8862 0.672119C15.9597 0.697938 16.0313 0.735883 16.1068 0.748401C16.7793 0.857543 17.3434 1.18419 17.8136 1.65596C18.1766 2.01977 18.4532 2.45399 18.5901 2.96175C18.6511 3.18786 18.7125 3.41358 18.774 3.63969V4.30354L18.7751 4.30197ZM15.4308 6.01969C16.6478 6.04277 17.5679 5.07379 17.557 3.92839C17.546 2.78572 16.6784 1.9564 15.6229 1.88207C14.26 1.78623 13.4225 2.87687 13.3947 3.88222C13.3618 5.07301 14.3351 6.02438 15.4312 6.0193L15.4308 6.01969ZM13.3888 17.3838C13.4276 18.5483 14.3046 19.4704 15.4281 19.4762C16.6705 19.4829 17.5632 18.5519 17.5531 17.3795C17.5425 16.1902 16.6772 15.3097 15.4222 15.323C14.2753 15.3355 13.4389 16.2078 13.3888 17.3834V17.3838ZM4.52838 12.7392C5.24308 12.7509 5.76337 12.4919 6.18429 12.0319C6.61029 11.566 6.74173 11.0046 6.6768 10.3838C6.58408 9.49697 5.77432 8.56633 4.54598 8.5988C3.43305 8.62853 2.53409 9.52514 2.54466 10.7089C2.55443 11.7964 3.50307 12.7904 4.52838 12.7392Z" fill="#1B1B1B"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_4233_2753">
                        <rect width="20" height="20" fill="white" transform="translate(0 0.672119)"/>
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                Compartilhe sua Sacola
            </div>
          `)

        setTimeout(() => {
          $('.share-button').on('click', () => {
            const text = `Olha a minha sacola na https://www.lojaspontodamoda.com.br/checkout?orderFormId=${orderForm.orderFormId}`

            navigator.clipboard
              .writeText(text)
              .then(() => alert('Link copiado para a área de transferência!'))
              .catch(() =>
                alert('Não foi possível copiar o link. Tente novamente!')
              )
          })
        }, 1000)
      }
    })
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

        // eslint-disable-next-line vtex/prefer-early-return
        if (index === findIndex) {
          const element: JQuery = $(`#${item.name}`)

          element.addClass('active')
          $(`#${item.name} + span`).removeClass('active')
        }
      })
    })
  },
}
