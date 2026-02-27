import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-apollo'
import { useCssHandles } from 'vtex.css-handles'
import { useProduct } from 'vtex.product-context'
import { ProductContextState } from 'vtex.product-context/react/ProductTypes'
import { useRuntime } from 'vtex.render-runtime'
import { Button, Input, Modal, Textarea, withToast } from 'vtex.styleguide'
import NEW_REVIEW from './graphql/newReview.gql'
import PROFILE from './graphql/profile.gql'

const CSS_HANDLES = [
  'newReviewWrapper',
  'newReviewTrigger',
  'newReviewTriggerLabel',
  'newReviewModalBody',
  'newReviewModalTitle',
  'newReviewStarsRow',
  'newReviewStarsLabel',
  'newReviewStar',
  'newReviewStarActive',
  'newReviewStarInactive',
  'newReviewField',
  'newReviewLabel',
  'newReviewActions',
  'newReviewError',
  'newReviewTitle',
] as const

interface ProfileData {
  profile: {
    id: string
    firstName: string
    lastName: string
    email: string
  }
}

interface ReviewForm {
  rating: number
  reviewerName: string
  title: string
  text: string
}

const STAR_PATH =
  'M7.04618 0C7.07441 0.00870647 7.10222 0.0165423 7.13003 0.0256841C7.27365 0.072699 7.37079 0.177177 7.43762 0.312997C7.55634 0.553731 7.6709 0.797077 7.7863 1.03955C8.23544 1.97985 8.68416 2.92058 9.13288 3.86088C9.18559 3.97146 9.23873 4.08116 9.28895 4.19303C9.31801 4.25746 9.36118 4.28706 9.43009 4.29664C9.87881 4.35846 10.3275 4.42463 10.7758 4.48949C11.2407 4.55696 11.7057 4.62444 12.1706 4.69279C12.5828 4.7533 12.9949 4.81468 13.4071 4.87606C13.4794 4.88694 13.5528 4.89347 13.623 4.91262C13.9837 5.01057 14.1219 5.46026 13.8758 5.75367C13.738 5.91779 13.5827 6.06623 13.4341 6.22034C13.1946 6.46891 12.9534 6.71573 12.7135 6.96387C12.1876 7.50759 11.6617 8.05131 11.1353 8.59503C11.0382 8.69515 10.9415 8.79527 10.8423 8.89322C10.8115 8.92326 10.8049 8.95417 10.8119 8.99552C10.863 9.29154 10.9132 9.58756 10.9635 9.88358C11.0589 10.4486 11.1544 11.0137 11.2495 11.5783C11.3445 12.1416 11.4375 12.7053 11.5346 13.2682C11.5583 13.4053 11.5624 13.5377 11.5052 13.6665C11.3844 13.9386 11.0855 14.0435 10.8169 13.9038C10.6061 13.7945 10.3977 13.6792 10.1889 13.5655C9.51352 13.1977 8.83857 12.8294 8.16404 12.4611C7.81702 12.2718 7.47 12.0828 7.12464 11.89C7.06071 11.8543 7.0109 11.8521 6.94573 11.8887C5.75191 12.5595 4.55684 13.2273 3.36219 13.8964C3.258 13.9547 3.14634 13.9835 3.03094 14.0009H2.92136C2.84249 13.9804 2.76445 13.9578 2.70177 13.899C2.55565 13.7627 2.51539 13.5864 2.53864 13.3923C2.55898 13.2234 2.58886 13.0558 2.61543 12.8873C2.71339 12.2644 2.81177 11.6419 2.91056 11.0189C3.01517 10.3585 3.11936 9.69813 3.22562 9.03818C3.23185 8.99857 3.22355 8.97202 3.1974 8.9459C3.09404 8.84272 2.99151 8.73825 2.88898 8.63464C2.48218 8.22456 2.07539 7.81449 1.66859 7.40442C1.32281 7.05572 0.977038 6.70746 0.632092 6.3579C0.466053 6.18986 0.293372 6.02792 0.138541 5.84944C-0.134594 5.53557 0.0181624 5.06281 0.415826 4.98358C0.666545 4.93352 0.92017 4.89956 1.17255 4.85951C1.70886 4.77419 2.24475 4.68843 2.78105 4.60529C3.30283 4.52432 3.82461 4.44291 4.3468 4.36803C4.55892 4.338 4.70545 4.23744 4.79718 4.02805C5.001 3.56225 5.21519 3.10081 5.42813 2.63937C5.7104 2.02774 5.99598 1.41741 6.28033 0.806654C6.35878 0.638184 6.43557 0.468408 6.51818 0.302114C6.58916 0.159328 6.69418 0.0544154 6.84943 0.0165423C6.86852 0.0117537 6.8872 0.0056592 6.90588 0.000435323C6.95237 0.000435323 6.99886 0.000435323 7.04535 0.000435323L7.04618 0Z'

function StarIcon({ filled, size = 28 }: { filled: boolean; size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      style={{ display: 'block' }}
    >
      <g clipPath="url(#clip_new_review)">
        <path d={STAR_PATH} fill={filled ? '#FFBE3F' : '#ddd'} />
      </g>
      <defs>
        <clipPath id="clip_new_review">
          <rect width="14" height="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

const INITIAL_FORM: ReviewForm = {
  rating: 0,
  reviewerName: '',
  title: '',
  text: '',
}

function NewReview({
  showToast,
}: {
  showToast: (params: { message: string }) => void
}) {
  const { product, selectedItem } = useProduct() as ProductContextState
  const { navigate } = useRuntime()
  const { handles } = useCssHandles(CSS_HANDLES)

  const [isOpen, setIsOpen] = useState(false)
  const [hovered, setHovered] = useState(0)
  const [form, setForm] = useState<ReviewForm>(INITIAL_FORM)
  const [errors, setErrors] = useState<{
    rating?: string
    reviewerName?: string
    title?: string
    text?: string
  }>({})

  const { data: profileData, loading: profileLoading } = useQuery<ProfileData>(
    PROFILE,
    {
      ssr: false,
    }
  )

  const isLoggedIn = !profileLoading && !!profileData?.profile

  const [submitReview, { loading: submitting }] = useMutation(NEW_REVIEW, {
    onCompleted: () => {
      showToast({
        message: 'Avaliação enviada com sucesso! Aguarde a aprovação.',
      })
      setIsOpen(false)
      setForm(INITIAL_FORM)
      setErrors({})
    },
    onError: () => {
      showToast({ message: 'Erro ao enviar avaliação. Tente novamente.' })
    },
  })

  function handleOpen() {
    if (!isLoggedIn) {
      navigate({
        to: `/login?returnUrl=${encodeURIComponent(`/${product?.linkText}/p`)}`,
      })
      return
    }
    // Pre-fill name from profile
    const profile = profileData?.profile
    if (profile) {
      setForm((prev) => ({
        ...prev,
        reviewerName: profile?.firstName ?? '',
      }))
    }
    setIsOpen(true)
  }

  function validate(): boolean {
    const newErrors: {
      rating?: string
      reviewerName?: string
      title?: string
      text?: string
    } = {}
    if (form.rating === 0) newErrors.rating = 'Selecione uma nota'
    if (!form.reviewerName.trim()) newErrors.reviewerName = 'Informe seu nome'
    if (!form.title.trim()) newErrors.title = 'Informe um título'
    if (!form.text.trim()) newErrors.text = 'Escreva sua avaliação'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit() {
    if (!validate()) return

    const now = new Date().toISOString()

    submitReview({
      variables: {
        review: {
          id: '',
          productId: product?.productId ?? '',
          rating: form.rating,
          title: form.title,
          text: form.text,
          reviewerName: form.reviewerName,
          reviewDateTime: now,
          sku: selectedItem?.itemId ?? '',
          approved: false,
        },
      },
    })
  }

  function handleClose() {
    setIsOpen(false)
    setForm(INITIAL_FORM)
    setErrors({})
    setHovered(0)
  }

  return (
    <div className={handles.newReviewWrapper}>
      <div className={handles.newReviewTrigger}>
        <p className={handles.newReviewTriggerLabel}>DEIXE SEU COMENTÁRIO</p>
        <Button
          variation="primary"
          isLoading={profileLoading}
          onClick={handleOpen}
        >
          {isLoggedIn ? 'Escrever Avaliação' : 'Entrar'}
        </Button>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title={<h3 className={handles.newReviewTitle}>Escrever avaliação</h3>}
        bottomBar={
          <div className={handles.newReviewActions}>
            <span style={{ marginRight: '8px' }}>
              <Button
                variation="tertiary"
                onClick={handleClose}
                disabled={submitting}
              >
                Cancelar
              </Button>
            </span>
            <Button
              variation="primary"
              onClick={handleSubmit}
              isLoading={submitting}
            >
              Enviar Avaliação
            </Button>
          </div>
        }
      >
        <div className={handles.newReviewModalBody}>
          {/* Rating */}
          <div className={handles.newReviewField}>
            <p className={handles.newReviewStarsLabel}>Sua nota *</p>
            <div className={handles.newReviewStarsRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={
                    star <= (hovered || form.rating)
                      ? handles.newReviewStarActive
                      : handles.newReviewStarInactive
                  }
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() => {
                    setForm((prev) => ({ ...prev, rating: star }))
                    setErrors((prev) => ({ ...prev, rating: undefined }))
                  }}
                  aria-label={`${star} estrela${star > 1 ? 's' : ''}`}
                >
                  <StarIcon
                    filled={star <= (hovered || form.rating)}
                    size={32}
                  />
                </button>
              ))}
            </div>
            {errors.rating && (
              <p className={handles.newReviewError}>{errors.rating}</p>
            )}
          </div>

          {/* Nome */}
          <div className={handles.newReviewField}>
            <Input
              label="Seu nome *"
              value={form.reviewerName}
              onChange={(e: any) => {
                const value = e?.target?.value ?? ''

                setForm((prev) => ({ ...prev, reviewerName: value }))
                setErrors((prev) => ({ ...prev, reviewerName: undefined }))
              }}
              error={!!errors.reviewerName}
              errorMessage={errors.reviewerName}
              placeholder="Como você quer ser identificado"
            />
          </div>

          {/* Título */}
          <div className={handles.newReviewField}>
            <Input
              label="Título da avaliação *"
              value={form.title}
              onChange={(e: any) => {
                const value = e?.target?.value ?? ''

                setForm((prev) => ({ ...prev, title: value }))
                setErrors((prev) => ({ ...prev, title: undefined }))
              }}
              error={!!errors.title}
              errorMessage={errors.title}
              placeholder="Resumo da sua experiência"
            />
          </div>

          {/* Texto */}
          <div className={handles.newReviewField}>
            <Textarea
              label="Sua avaliação *"
              value={form.text}
              onChange={(e: any) => {
                const value = e?.target?.value ?? ''

                setForm((prev) => ({ ...prev, text: value }))
                setErrors((prev) => ({ ...prev, text: undefined }))
              }}
              error={!!errors.text}
              errorMessage={errors.text}
              placeholder="Descreva sua experiência com este produto..."
              resize="vertical"
              rows={5}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default withToast(NewReview)
