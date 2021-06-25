import { useState, SyntheticEvent } from 'react'
import { useAuth } from 'hooks'
import {
  Button,
  Input,
  Logo,
  NavLink,
} from 'components'

export function RoomsNew() {
  const { afterLogin } = useAuth()
  const [loading, setLoading] = useState(false)

  function handleSubmit(evt: SyntheticEvent) {
    evt.preventDefault()
    setLoading(true)
    afterLogin(() => {
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    })
  }

  return (
    <section
      className="centered fw"
      style={{ maxWidth: '320px' }}
    >
      <div className="m-15-t m-40-b text-center">
        <Logo />
      </div>
      <form
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="m-35-b text-center">
          <h2>
            Crie uma nova sala
          </h2>
        </div>
        <div className="m-15-ver">
          <Input
            type="text"
            name="room"
            id="room"
            placeholder="Nome da sala"
            disabled={loading}
            autoFocus
          />
        </div>
        <div className="m-15-ver">
          <Button
            block
            type="submit"
            variant="primary"
            disabled={loading}
          >
            {loading ? 'Criando sala...' : 'Criar sala'}
          </Button>
        </div>
        <div className="m-15-ver">
          <p>
            Quer entrar em uma sala já existente?
            <NavLink to="/">
              {' Clique aqui'}
            </NavLink>.
          </p>
        </div>
      </form>
    </section>
  )
}

RoomsNew.exact = true
RoomsNew.path = '/rooms/new'
RoomsNew.layout = 'LayoutStarter'
