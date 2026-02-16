import React, { useCallback, useEffect, useState } from 'react'
import { OrderForm } from 'vtex.order-manager'

import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { Button, Input, Spinner, withToast } from 'vtex.styleguide'

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
  >
    <g clip-path="url(#clip0_17_13886)">
      <path
        d="M1.13241 22C0.908273 22.0007 0.688983 21.9348 0.502439 21.8105C0.315895 21.6863 0.17053 21.5093 0.08484 21.3022C-0.000850451 21.0951 -0.022993 20.8672 0.0212297 20.6475C0.0654523 20.4277 0.174041 20.2261 0.33318 20.0683L20.0682 0.330416C20.2806 0.118073 20.5686 -0.0012207 20.8689 -0.0012207C21.1692 -0.0012207 21.4572 0.118073 21.6695 0.330416C21.8819 0.542759 22.0011 0.830759 22.0011 1.13106C22.0011 1.43136 21.8819 1.71936 21.6695 1.9317L1.93164 21.6696C1.82665 21.7744 1.70203 21.8576 1.5649 21.9143C1.42776 21.971 1.2808 22.0001 1.13241 22Z"
        fill="white"
      />
      <path
        d="M20.8705 22C20.7219 21.9997 20.5748 21.9702 20.4376 21.913C20.3005 21.8558 20.176 21.7721 20.0712 21.6667L0.330538 1.9317C0.118195 1.71936 -0.00109863 1.43136 -0.00109863 1.13106C-0.00109863 0.830759 0.118195 0.542759 0.330538 0.330416C0.542882 0.118073 0.830881 -0.0012207 1.13118 -0.0012207C1.43148 -0.0012207 1.71948 0.118073 1.93182 0.330416L21.6697 20.0683C21.8288 20.2261 21.9374 20.4277 21.9816 20.6475C22.0259 20.8672 22.0037 21.0951 21.918 21.3022C21.8323 21.5093 21.687 21.6863 21.5004 21.8105C21.3139 21.9348 21.0946 22.0007 20.8705 22Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_17_13886">
        <rect width="22" height="22" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

const OrderCouponProvider = ({
  showToast,
}: {
  showToast?: (props: any) => void
}) => {
  const [coupon, setCoupon] = useState('')
  const [loading, setLoading] = useState(false)
  const { setOrderForm, orderForm } = OrderForm.useOrderForm()

  const [appliedCoupon, setAppliedCoupon] = useState('')

  useEffect(() => {
    if (orderForm.marketingData.coupon) {
      setCoupon(orderForm.marketingData.coupon)
      setAppliedCoupon(orderForm.marketingData.coupon)
    }
  }, [orderForm])

  async function addCoupon(text: string, isRemove: boolean) {
    await fetch(`/api/checkout/pub/orderForm/${orderForm.id}/messages/clear`, {
      method: 'POST',
      body: JSON.stringify({}),
    })

    return fetch(`/api/checkout/pub/orderForm/${orderForm.id}/coupons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        text: isRemove ? '' : text,
      }),
    })
  }

  const { handles } = useCssHandles([
    'couponContainer',
    'couponInput',
    'couponButton',
  ] as const)

  const insertCoupon = useCallback(
    async (coupon: string, isRemove: boolean) => {
      setLoading(true)
      const data = await addCoupon(coupon, isRemove)
      const newOrderForm = (await data.json()) as VtexOrderForm

      const messages = newOrderForm.messages.filter((m) =>
        m.code.toLowerCase().includes('coupon')
      )

      if (isRemove) {
        setCoupon('')
        setAppliedCoupon('')
      }

      messages
      showToast

      if (messages.length > 0) {
        messages.forEach((m) =>
          showToast?.({
            message: m.text,
            type: 'error',
            duration: 5000,
          })
        )

        return
      }

      setOrderForm({
        ...orderForm,
        totalizers: newOrderForm.totalizers,
        total: newOrderForm.value,
        value: newOrderForm.value,
        marketingData: newOrderForm.marketingData,
      })
      showToast?.({
        message: `${coupon} aplicado com sucesso!`,
        type: 'success',
        duration: 5000,
      })
      setAppliedCoupon(coupon)
      setLoading(false)
    },
    [setOrderForm, orderForm]
  )

  return (
    <section
      className={applyModifiers(
        handles.couponContainer,
        appliedCoupon ? 'applied' : 'none'
      )}
    >
      <Input
        label="Cupom de desconto: "
        value={coupon}
        onChange={(event) => setCoupon(event.target.value)}
        suffix={loading ? <Spinner size={15} color="#000" /> : null}
        placeholder="Digite o seu cupom"
        disabled={loading || !!appliedCoupon}
      />
      <Button
        disabled={loading}
        onClick={() => insertCoupon(coupon, !!appliedCoupon)}
      >
        {appliedCoupon ? <CloseIcon /> : 'ok'}
      </Button>
    </section>
  )
}

export default withToast(OrderCouponProvider)
