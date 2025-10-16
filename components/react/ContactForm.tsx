/* eslint-disable no-alert */
/* eslint-disable no-unneeded-ternary */
import React, { Fragment, useState } from 'react'
import { applyModifiers, useCssHandles } from 'vtex.css-handles'
import { Link } from 'vtex.render-runtime'
import { Button, Dropdown, Input, Textarea } from 'vtex.styleguide'

const CSS_HANDLES = [
  'contactFormContainer',
  'contactFormTitle',
  'contactFormSubtitle',
  'contactFormInput',
  'contactFormTextarea',
  'contactFormButton',
  'breadcrumb',
  'breadcrumbItem',
  'breadcrumbItemLink',
  'contactForm',
  'contactFormTitleH5',
  'contactFormTitleP',
  'contactFormIcon',
  'contactFormUl',
  'contactFormIconContaner',
  'contactFormItemContainer',
  'contactFormLi',
  'contactFormText',
  'contactFormItemTitleH6',
  'contactFormContact',
  'contactFormWhatsApp',
  'breadcrumbContainer',
  'form',
] as const

interface Props {
  subjectOptions: Array<{ label: string }>
  contacts: Array<{
    link: string
    icon: string
    text: string
    label: string
  }>
  whatsAppLink?: string
  showToast: ({ message }: { message: string }) => void
}

const ContactForm: StoreFrontFC<Props> = ({
  contacts = [],
  whatsAppLink = '',
  subjectOptions = [],
}) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const [state, setState] = useState<{
    name: string
    email: string
    phone: string
    message: string
    lastName: string
    subject: string
    isClient: boolean | null
    state: string
    city: string
  }>({
    name: '',
    email: '',
    phone: '',
    message: '',
    lastName: '',
    subject: '',
    isClient: null,
    state: '',
    city: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    fetch(`/api/dataentities/CT/documents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(state),
    })
      .catch(() => {
        setIsLoading(false)
        alert('Erro ao enviar formulário, tente novamente mais tarde.')
      })
      .then(() => {
        setIsLoading(false)
        alert('Formulário enviado com sucesso!')
        setState({
          name: '',
          email: '',
          phone: '',
          message: '',
          lastName: '',
          subject: '',
          isClient: null,
          state: '',
          city: '',
        })
      })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setState((prevState) => ({ ...prevState, [name]: value }))
  }

  const formatedPhone = (phone: string) => {
    // Remove todos os caracteres que não são dígitos
    const cleaned = `${phone}`.replace(/\D/g, '')

    // Verifica se o número tem o formato correto
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/)

    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`
    }

    return phone
  }

  return (
    <Fragment>
      <div className={handles.breadcrumb}>
        <div className={handles.breadcrumbContainer}>
          <Link to="/" className={handles.breadcrumbItemLink}>
            Home
          </Link>{' '}
          | <span className={handles.breadcrumbItem}>Contato</span>
        </div>
      </div>
      <section className={handles.contactFormContainer}>
        <div className={handles.contactForm}>
          <form className={handles.form} onSubmit={handleSubmit}>
            <h2 className={handles.contactFormTitle}>Dados Pessoais</h2>
            <div className={applyModifiers(handles.contactFormInput, 'double')}>
              <Input
                placeholder="Nome"
                name="name"
                id="name"
                value={state.name}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
              <Input
                placeholder="Sobrenome"
                name="lastName"
                id="lastName"
                value={state.lastName}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
            <div className={applyModifiers(handles.contactFormInput, 'double')}>
              <Input
                placeholder="E-mail"
                name="email"
                id="email"
                type="email"
                value={state.email}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
              <Input
                placeholder="Celular"
                name="phone"
                id="phone"
                value={formatedPhone(state.phone)}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
            <div className={applyModifiers(handles.contactFormInput, 'triple')}>
              <Input
                placeholder="Cidade"
                name="city"
                id="city"
                value={state.city}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
              <Input
                placeholder="Estado"
                name="state"
                id="state"
                value={state.state}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
              <Dropdown
                placeholder="Já é cliente?"
                name="isClient"
                id="isClient"
                required
                value={
                  state.isClient !== null
                    ? state.isClient
                      ? 'sim'
                      : 'nao'
                    : ' '
                }
                disabled={isLoading}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                  setState({
                    ...state,
                    isClient: event.target.value === 'sim' ? true : false,
                  })
                }
                options={[
                  {
                    label: 'Sim',
                    value: 'sim',
                    disabled: false,
                  },
                  {
                    label: 'Não',
                    value: 'nao',
                    disabled: false,
                  },
                ]}
              />
            </div>
            <div className={applyModifiers(handles.contactFormInput, 'one')}>
              <Dropdown
                placeholder="Assunto"
                name="subject"
                id="subject"
                required
                value={state.subject}
                disabled={isLoading}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                  setState({ ...state, subject: event.target.value })
                }
                options={subjectOptions.map((option) => ({
                  label: option.label,
                  value: option.label,
                  disabled: false,
                }))}
              />
            </div>
            <div className={applyModifiers(handles.contactFormInput, 'one')}>
              <Textarea
                placeholder="Mensagem"
                name="message"
                id="message"
                value={state.message}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setState({ ...state, message: event.target.value })
                }
                required
                disabled={isLoading}
              />
            </div>
            <Button isLoading={isLoading} type="submit" variation="primary">
              Enviar
            </Button>
          </form>
          <div className={handles.contactFormSubtitle}>
            <h5 className={handles.contactFormTitleH5}>
              Não encontrou o que queria?
            </h5>
            <p className={handles.contactFormTitleP}>
              Entre em contato pelos nossos canais de atendimento
            </p>
            <ul className={handles.contactFormUl}>
              {contacts.map((contact, index) => (
                <li key={index} className={handles.contactFormLi}>
                  <div className={handles.contactFormContact}>
                    <div className={handles.contactFormIconContaner}>
                      <img
                        src={contact.icon}
                        alt="Ícone de contato"
                        className={handles.contactFormIcon}
                      />
                    </div>
                    <div className={handles.contactFormItemContainer}>
                      <h6 className={handles.contactFormItemTitleH6}>
                        {contact.label}
                      </h6>
                      {contact.link ? (
                        <a
                          className={handles.contactFormText}
                          href={
                            contact.link.includes('@')
                              ? `mailto:${contact.link}`
                              : contact.link
                          }
                        >
                          Clique aqui
                        </a>
                      ) : (
                        <span className={handles.contactFormText}>
                          {contact.text}
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              ))}

              <a
                href={whatsAppLink}
                target="_blank"
                rel="noreferrer"
                className={handles.contactFormWhatsApp}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <g clipPath="url(#clip0_11618_14819)">
                    <path
                      d="M0 18L1.26051 13.3823C-1.51074 8.47585 0.750683 2.36698 6.06732 0.519694C12.5334 -1.72685 18.9353 3.63224 17.8866 10.3714C16.9461 16.4128 10.0635 19.6664 4.71075 16.7802L0 18ZM2.20238 15.8444L4.94364 15.1377C10.7284 18.7474 18.0886 13.5364 16.1992 6.8371C15.4865 4.30892 13.3277 2.26669 10.7687 1.67718C4.08377 0.137304 -0.876266 7.51097 2.89964 13.148L2.20285 15.8448L2.20238 15.8444Z"
                      fill="white"
                    />
                    <path
                      d="M13.5292 10.937C13.74 11.1933 13.4448 12.0893 13.2537 12.3452C11.8694 14.1967 8.56118 12.4623 7.24162 11.2978C6.02797 10.2265 4.27919 8.17776 4.51114 6.46075C4.58705 5.89794 5.16951 4.85152 5.78758 4.78498C6.68259 4.68844 6.6423 4.83512 6.95766 5.53617C7.17415 6.01744 7.35362 6.52073 7.54855 7.01184C7.56495 7.14727 7.48107 7.24849 7.42391 7.35815C7.26459 7.66556 6.71493 8.07232 6.81567 8.39473C6.87753 8.59201 7.46936 9.35445 7.63712 9.54237C8.01339 9.96365 8.54243 10.3962 9.02977 10.6802C9.25422 10.8109 10.0077 11.2158 10.2289 11.1488C10.4908 11.0696 11.0405 10.1 11.2326 10.0428C11.6225 9.9271 12.6393 10.5686 13.0414 10.7458C13.1557 10.7964 13.3989 10.7786 13.5287 10.9365L13.5292 10.937Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_11618_14819">
                      <rect width="18" height="18" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Whatsapp
              </a>
            </ul>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

ContactForm.schema = {
  title: 'Contato',
  description: 'Formulário de contato personalizado',
  type: 'object',
  properties: {
    subjectOptions: {
      title: 'Opções de assunto',
      type: 'array',
      items: { type: 'object', properties: { label: { type: 'string' } } },
    },
    whatsAppLink: {
      title: 'Link do WhatsApp',
      type: 'string',
      default:
        'https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20produtos.',
    },
    contacts: {
      title: 'Informações de contato',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          label: {
            title: 'Label',
            type: 'string',
            default: '',
          },
          link: {
            title: 'Link',
            type: 'string',
            default: '#',
          },
          icon: {
            title: 'Ícone',
            type: 'string',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
          text: {
            title: 'Texto',
            type: 'string',
            default: '(11) 99999-9999',
          },
        },
      },
    },
  },
}

export default ContactForm
