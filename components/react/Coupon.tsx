import React, { useCallback, useEffect, useState } from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { OrderForm } from 'vtex.order-manager'
import { Button, Input, Spinner, withToast } from 'vtex.styleguide'

const CloseIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.13241 22L21.6695 1.9317M20.8705 22L0.330538 0.330416"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)

interface Props {
  showToast: (options: {
    message: string
    type: 'error' | 'success'
    duration?: number
  }) => void
}

const CSS_HANDLES = ['couponContainer', 'couponInput', 'couponButton'] as const

const OrderCouponProvider: React.FC<Props> = ({ showToast }) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { setOrderForm, orderForm } = OrderForm.useOrderForm()

  const [coupon, setCoupon] = useState('')
  const [loading, setLoading] = useState(false)

  const appliedCoupon = orderForm?.marketingData?.coupon

  useEffect(() => {
    if (appliedCoupon) {
      setCoupon(appliedCoupon)
    }
  }, [appliedCoupon])

  const handleCouponAction = useCallback(
    async (isRemove = false) => {
      setLoading(true)
      const couponToPost = isRemove ? '' : coupon

      try {
        await fetch(
          `/api/checkout/pub/orderForm/${orderForm.id}/messages/clear`,
          {
            method: 'POST',
          }
        )

        const response = await fetch(
          `/api/checkout/pub/orderForm/${orderForm.id}/coupons`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({ text: couponToPost }),
          }
        )

        const newOrderForm = await response.json()

        const errorMessages = newOrderForm.messages.filter((m: any) =>
          m.code.toLowerCase().includes('coupon')
        )

        if (errorMessages.length > 0) {
          errorMessages.forEach((m: any) =>
            showToast({ message: m.text, type: 'error' })
          )
          if (!isRemove) setCoupon(appliedCoupon || '')
        } else {
          setOrderForm(newOrderForm)
          showToast({
            message: isRemove
              ? 'Cupom removido!'
              : `Cupom ${couponToPost} aplicado!`,
            type: 'success',
          })
          if (isRemove) setCoupon('')
        }
      } catch (error) {
        showToast({
          message: 'Erro ao processar cupom. Tente novamente.',
          type: 'error',
        })
        console.error('Coupon Error:', error)
      } finally {
        setLoading(false)
      }
    },
    [coupon, orderForm.id, setOrderForm, showToast, appliedCoupon]
  )

  return (
    <section
      className={applyModifiers(
        handles.couponContainer,
        appliedCoupon ? 'applied' : 'none'
      )}
    >
      <div className="flex flex-row items-end w-full w-100">
        <Input
          label="Cupom de desconto"
          value={coupon}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCoupon(e.target.value)
          }
          suffix={loading ? <Spinner size={15} /> : null}
          placeholder="Digite o seu cupom"
          disabled={loading || !!appliedCoupon}
        />
        <div className="ml3">
          <Button
            size="regular"
            variation={appliedCoupon ? 'danger' : 'primary'}
            disabled={!coupon && !appliedCoupon}
            onClick={() => handleCouponAction(!!appliedCoupon)}
          >
            {appliedCoupon ? <CloseIcon /> : 'OK'}
          </Button>
        </div>
      </div>
    </section>
  )
}

export default withToast(OrderCouponProvider as any)
