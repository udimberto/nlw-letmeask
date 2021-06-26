import { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from 'hooks'
import { room } from 'services'
import {
  Button,
  Input,
  NavLink,
} from 'components'

export function RoomsNew() {
  const history = useHistory()
  const { afterLogin } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [roomTitle, setRoomTitle] = useState('')

  function handleRoomNew(evt: FormEvent) {
    evt.preventDefault()
    setError('')
    setLoading(true)
    afterLogin(async () => {
      try {
        const { key: roomId } = await room.new({ title: roomTitle })

        history.push(`/rooms/${roomId}`)

      } catch (err) {
        setError(JSON.stringify(err))
        setLoading(false)
        console.error(err)
      }
    })
  }

  return (
    <section className="container container--sm text-center">
      <form
        noValidate
        onSubmit={handleRoomNew}
      >
        <div className="m-35-b">
          <h2>
            Crie uma nova sala
          </h2>
        </div>
        <div className="m-15-ver">
          <Input
            type="text"
            name="roomName"
            id="roomName"
            placeholder="Nome da sala"
            autoFocus
            disabled={loading}
            value={roomTitle}
            onChange={({ target: { value }}) => setRoomTitle(value)}
          />
        </div>
        <div className="m-15-ver">
          <Button
            block
            type="submit"
            variant="primary"
            disabled={loading || !roomTitle}
          >
            {loading ? 'Criando sala...' : 'Criar sala'}
          </Button>
        </div>
        <div className="m-15-ver">
          {!error ? (
            <p className="text-helper">
              {'Quer entrar em uma sala já existente? '}
              <NavLink to="/">
                Clique aqui
              </NavLink>
            </p>
          ) : (
            <p className="text-error">
              {error}
            </p>
          )}
        </div>
      </form>
    </section>
  )
}

RoomsNew.exact = true
RoomsNew.path = '/rooms/new'
