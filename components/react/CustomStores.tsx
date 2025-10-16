import React, { Fragment } from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { useDevice } from 'vtex.device-detector'
import { Link } from 'vtex.render-runtime'

interface Props {
  stores: Array<{
    name: string
    description: string
    link: string
    image: string
    whatsapp: string
    label: string
    openingHours: string
  }>
}

const CSS_HANDLES = [
  'customStoresContainer',
  'storeCard',
  'storeImage',
  'storeInfo',
  'storeLinks',
  'storeName',
  'storeDescription',
  'breadcrumb',
  'breadcrumbContainer',
  'breadcrumbItem',
  'breadcrumbItemLink',
  'storeLink',
] as const

const CustomStores: StoreFrontFC<Props> = ({ stores = [] }) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { isMobile } = useDevice()

  return (
    <Fragment>
      <div className={handles.breadcrumb}>
        <div className={handles.breadcrumbContainer}>
          <Link to="/" className={handles.breadcrumbItemLink}>
            Home
          </Link>{' '}
          | <span className={handles.breadcrumbItem}>Nossas Lojas</span>
        </div>
      </div>
      <section className={handles.customStoresContainer}>
        {stores.map((store, index) => (
          <div key={index} className={handles.storeCard}>
            <img
              width={630}
              height={630}
              loading="lazy"
              src={store.image}
              alt={store.name}
              className={handles.storeImage}
            />
            <div className={handles.storeInfo}>
              <div
                style={{
                  width: isMobile ? '100%' : 'auto',
                }}
              >
                <h2 className={handles.storeName}>{store.name}</h2>
                <p className={handles.storeDescription}>{store.description}</p>
                <p className={handles.storeDescription}>{store.openingHours}</p>
              </div>
              <div className={handles.storeLinks}>
                <a
                  href={store.link}
                  className={applyModifiers(handles.storeLink, 'mapa')}
                >
                  Ver no mapa
                </a>
                {store.whatsapp && (
                  <a
                    href={store.whatsapp}
                    target="_blank"
                    className={applyModifiers(handles.storeLink, 'whatsapp')}
                    rel="noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="18"
                      viewBox="0 0 19 18"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_11821_3381)">
                        <path
                          d="M0.25 18L1.51051 13.3823C-1.26074 8.47585 1.00068 2.36698 6.31732 0.519694C12.7834 -1.72685 19.1853 3.63224 18.1366 10.3714C17.1961 16.4128 10.3135 19.6664 4.96075 16.7802L0.25 18ZM2.45238 15.8444L5.19364 15.1377C10.9784 18.7474 18.3386 13.5364 16.4492 6.8371C15.7365 4.30892 13.5777 2.26669 11.0187 1.67718C4.33377 0.137304 -0.626266 7.51097 3.14964 13.148L2.45285 15.8448L2.45238 15.8444Z"
                          fill="white"
                        />
                        <path
                          d="M13.7792 10.937C13.99 11.1933 13.6948 12.0893 13.5037 12.3452C12.1194 14.1967 8.81118 12.4623 7.49162 11.2978C6.27797 10.2265 4.52919 8.17776 4.76114 6.46075C4.83705 5.89794 5.41951 4.85152 6.03758 4.78498C6.93259 4.68844 6.8923 4.83512 7.20766 5.53617C7.42415 6.01744 7.60362 6.52073 7.79855 7.01184C7.81495 7.14727 7.73107 7.24849 7.67391 7.35815C7.51459 7.66556 6.96493 8.07232 7.06567 8.39473C7.12753 8.59201 7.71936 9.35445 7.88712 9.54237C8.26339 9.96365 8.79243 10.3962 9.27977 10.6802C9.50422 10.8109 10.2577 11.2158 10.4789 11.1488C10.7408 11.0696 11.2905 10.1 11.4826 10.0428C11.8725 9.9271 12.8893 10.5686 13.2914 10.7458C13.4057 10.7964 13.6489 10.7786 13.7787 10.9365L13.7792 10.937Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_11821_3381">
                          <rect
                            width="18"
                            height="18"
                            fill="white"
                            transform="translate(0.25)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    {store.label || 'Fale conosco via WhatsApp'}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>
    </Fragment>
  )
}

CustomStores.schema = {
  title: 'Nossas Lojas',
  description: 'Componente para exibir informações de lojas físicas',
  type: 'object',
  properties: {
    stores: {
      title: 'Lojas',
      description: 'Lista de lojas físicas',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            title: 'Nome da loja',
            type: 'string',
          },
          description: {
            title: 'Endereço da loja',
            type: 'string',
          },
          link: {
            title: 'Link para a loja',
            type: 'string',
          },
          openingHours: {
            title: 'Horário de funcionamento',
            type: 'string',
            default: 'Segunda a Sexta: 9h às 18h',
          },
          image: {
            title: 'URL da imagem da loja',
            type: 'string',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
          whatsapp: {
            title: 'Número do WhatsApp da loja',
            type: 'string',
          },
          label: {
            title: 'Label do botão de WhatsApp',
            type: 'string',
          },
        },
      },
    },
  },
}

export default CustomStores
