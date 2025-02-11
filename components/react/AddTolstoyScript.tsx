// import { useEffect } from 'react'
import { useEffect } from 'react'
import { useOrderGroup } from 'vtex.order-placed/OrderGroupContext'

const AddTolstoyScript = () => {
  const { orders } = useOrderGroup()

  const payloadTolStoy = {
    appKey: '74f7e0fe-eae9-4055-b40c-5b818b681b15',
    appUrl: window.location.hostname,
    currency: 'BRL',
    email: orders[0].clientProfileData.email,
    items: orders[0].items.map((item: any) => {
      return {
        price: item.price / 100,
        productId: item.productId,
        quantity: item.quantity,
        title: item.skuName,
        totalPrice: (item.price / 100) * item.quantity,
        variantId: item.productId,
      }
    }),
    orderId: orders[0].orderId,
    presentmentCurrency: 'BRL',
    totalPrice: orders[0].value,
  }

  useEffect(() => {
    if (
      document.querySelector(
        'script[src="https://widget.gotolstoy.com/track.js"]'
      )
    ) {
      return
    }

    const scriptContent = `
      (function() {
        window.tolstoyConversion = ${JSON.stringify(payloadTolStoy)}
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://widget.gotolstoy.com/track.js";
        var x = document.getElementsByTagName("script")[0];
        x.parentNode.insertBefore(s, x);
      })();
    `

    const script = document.createElement('script')

    script.type = 'text/javascript'
    script.innerHTML = scriptContent
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return null
}

export default AddTolstoyScript
