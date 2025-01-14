import React, { useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useDevice } from 'vtex.device-detector'
import { Button, Input, Textarea, withToast } from 'vtex.styleguide'

const CSS_HANDLES = ['faleConoscoForm'] as const

function FaleConoscoForm({
  showToast,
}: {
  // eslint-disable-next-line no-empty-pattern
  showToast: ({}: { message: string }) => void
}) {
  const { handles } = useCssHandles(CSS_HANDLES)
  const { isMobile } = useDevice()
  const [form, setForm] = useState({
    name: '',
    email: '',
    telefone: '',
    assunto: '',
    message: '',
  })

  const [isLoading, setLoading] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault()
      setLoading(true)

      const myHeaders = new Headers()

      myHeaders.append('Content-Type', 'application/json')
      myHeaders.append('Accept', 'application/json')

      await fetch(`/api/dataentities/CT/documents`, {
        method: 'POST',
        body: JSON.stringify(form),
        headers: myHeaders,
        redirect: 'follow',
      })

      setForm({
        name: '',
        email: '',
        telefone: '',
        assunto: '',
        message: '',
      })
      showToast({
        message: 'Dados enviados com sucesso!',
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      showToast({
        message: 'Não foi possível enviar seus dados no momento!',
      })
    }
  }

  return (
    <form className={handles.faleConoscoForm} onSubmit={handleSubmit}>
      <Input
        name="name"
        type="text"
        label="Nome completo"
        onChange={handleChange}
        value={form.name}
        required
        disabled={isLoading}
      />
      <Input
        name="email"
        value={form.email}
        type="email"
        label="E-Mail"
        onChange={handleChange}
        required
        disabled={isLoading}
      />
      <div
        className=""
        style={{
          display: isMobile ? 'block' : 'flex',
          alignItems: 'flex-start',
          gap: '1rem',
        }}
      >
        <Input
          name="telefone"
          type="phone"
          label="Telefone*"
          onChange={handleChange}
          value={form.telefone}
          required
          disabled={isLoading}
        />
        <Input
          name="assunto"
          type="assunto"
          label="Assunto"
          value={form.assunto}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>
      <Textarea
        label="Mensagem"
        name="message"
        value={form.message}
        required
        onChange={(e: any) => handleChange(e)}
        disabled={isLoading}
        resize="none"
      />
      <div
        style={{
          margin: '2rem 0px 0px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Button type="submit" disabled={isLoading} isLoading={isLoading}>
          Enviar
        </Button>
      </div>
    </form>
  )
}

export default withToast(FaleConoscoForm)
