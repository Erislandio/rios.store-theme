import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { CSS_HANDLES } from './constants'

const skeletonPulse = {
  background: 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
  backgroundSize: '200% 100%',
  animation: 'productKitSkeletonPulse 1.5s ease-in-out infinite',
} as React.CSSProperties

const SkeletonCard = () => {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <div
      className={handles.productKitSkeletonItem}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 20,
        marginBottom: '20px',
      }}
    >
      <div
        className={handles.productKitSkeletonImage}
        style={{
          ...skeletonPulse,
          width: 120,
          height: 160,
          borderRadius: 4,
          flexShrink: 0,
        }}
      />
      <div
        className={handles.productKitSkeletonInfo}
        style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}
      >
        <div
          className={handles.productKitSkeletonLine}
          style={{
            ...skeletonPulse,
            width: '70%',
            height: 16,
            borderRadius: 4,
          }}
        />
        <div
          className={handles.productKitSkeletonLine}
          style={{
            ...skeletonPulse,
            width: '45%',
            height: 12,
            borderRadius: 4,
          }}
        />
        <div
          className={handles.productKitSkeletonSizes}
          style={{ display: 'flex', gap: 6 }}
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className={handles.productKitSkeletonSizeBtn}
              style={{
                ...skeletonPulse,
                width: 32,
                height: 32,
                borderRadius: 4,
              }}
            />
          ))}
        </div>
        <div
          className={handles.productKitSkeletonLine}
          style={{
            ...skeletonPulse,
            width: '30%',
            height: 12,
            borderRadius: 4,
          }}
        />
        <div
          className={handles.productKitSkeletonLine}
          style={{
            ...skeletonPulse,
            width: '50%',
            height: 12,
            borderRadius: 4,
          }}
        />
        <div
          className={handles.productKitSkeletonColors}
          style={{ display: 'flex', gap: 6 }}
        >
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={handles.productKitSkeletonColorBtn}
              style={{
                ...skeletonPulse,
                width: 24,
                height: 24,
                borderRadius: '50%',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SkeletonCard
