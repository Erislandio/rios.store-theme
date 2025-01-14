import React, { useState } from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { Link } from 'vtex.render-runtime'
import { Collapsible } from 'vtex.styleguide'

interface FAQItem {
  __editorItemTitle: string
  response: string
  link: string
  linkText: string
}

interface Props {
  faqs: FAQItem[]
}

const CSS_HANDLES = [
  'sectionFaq',
  'faqItem',
  'faqItemTitle',
  'faqItemContent',
  'faqItemContentText',
  'faqItemIcon',
  'faqItemLink',
] as const

const renderMarkdown = (markdown: string) => {
  // Simples conversão de Markdown para HTML
  return markdown
    .replace(/__(.+?)__/g, '<strong>$1</strong>') // Negrito com __
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') // Negrito com **
    .replace(/_(.+?)_/g, '<em>$1</em>') // Itálico com _
    .replace(/`(.+?)`/g, '<code>$1</code>') // Código com `
    .replace(
      /(https?:\/\/[^\s]+)/g,
      '<span href="$1" target="_blank" rel="noopener noreferrer">$1</span>'
    )
}

const FaqContent = ({
  __editorItemTitle,
  link,
  linkText,
  response,
}: FAQItem) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const [isOpen, setOpen] = useState(false)

  return (
    <div className={applyModifiers(handles.faqItem, isOpen ? 'active' : '')}>
      <Collapsible
        isOpen={isOpen}
        onClick={() => setOpen(!isOpen)}
        arrowAlign="center"
        align="right"
        header={
          <h3 className={handles.faqItemTitle} style={{}}>
            {__editorItemTitle}{' '}
            <span
              className={applyModifiers(
                handles.faqItemIcon,
                isOpen ? 'active' : 'none'
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M7.95891 11.2929C8.34943 10.9024 8.9826 10.9024 9.37312 11.2929L16.666 18.5858L23.9589 11.2929C24.3494 10.9024 24.9826 10.9024 25.3731 11.2929C25.7636 11.6834 25.7636 12.3166 25.3731 12.7071L17.3731 20.7071C16.9826 21.0976 16.3494 21.0976 15.9589 20.7071L7.95891 12.7071C7.56838 12.3166 7.56838 11.6834 7.95891 11.2929Z"
                  fill="#BC1818"
                />
              </svg>
            </span>
          </h3>
        }
        children={
          <div
            className={handles.faqItemContent}
            style={{
              padding: '1rem',
            }}
          >
            <p
              className={handles.faqItemContentText}
              dangerouslySetInnerHTML={{
                __html: renderMarkdown(response),
              }}
            />
            {link ? (
              <Link className={handles.faqItemLink} to={link}>
                {linkText}
              </Link>
            ) : null}
          </div>
        }
      />
    </div>
  )
}

const CustomFaq: StoreFrontFC<Props> = ({ faqs = [] }) => {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <section className={handles.sectionFaq}>
      {faqs.map((item) => (
        <FaqContent {...item} key={item.__editorItemTitle} />
      ))}
    </section>
  )
}

CustomFaq.schema = {
  title: 'Perguntas Frequentes',
  type: 'object',
  properties: {
    faqs: {
      type: 'array',
      title: 'Perguntas Frequentes',
      items: {
        type: 'object',
        properties: {
          __editorItemTitle: {
            title: 'Pergunta',
            type: 'string',
            default: '',
          },
          response: {
            type: 'string',
            title: 'Resposta',
            default: '',
            widget: {
              'ui:widget': 'textarea',
            },
          },
          link: {
            type: 'string',
            title: 'Url',
            default: '',
          },
          linkText: {
            type: 'string',
            title: 'Link Text',
            default: '',
          },
        },
      },
    },
  },
}

export default CustomFaq
