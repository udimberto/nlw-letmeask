import { FormEvent, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { room } from 'services'
import { ErrorType } from 'types'
import {
  Button,
  ButtonLink,
  Input,
  Separator,
} from 'components'

export function Home() {
  const history = useHistory()
  const [error, setError] = useState<ErrorType>({})
  const [loading, setLoading] = useState(false)
  const [roomId, setRoomId] = useState('')

  async function handleRoomEnter(evt: FormEvent) {
    evt.preventDefault()

    const _roomId = roomId.trim()

    if (!_roomId) {
      return
    }

    setError({})
    setLoading(true)

    try {
      await room.get(_roomId)

      history.push(`/rooms/${_roomId}`)

    } catch (err) {
      setError(err)
      setLoading(false)
      console.error(err)
    }
  }

  useEffect(() => {
    if (!roomId.trim()) {
      setError({})
    }
  }, [roomId])

  return (
    <section className="container container--sm text-center">
      <form
        noValidate
        onSubmit={handleRoomEnter}
      >
        <div className="m-15-ver">
          <ButtonLink
            block
            icon="google-white"
            variant="red-google"
            to="/rooms/new"
          >
            Crie sua sala com o Google
          </ButtonLink>
        </div>
        <div className="m-35-ver">
          <Separator>
            ou entre em uma sala
          </Separator>
        </div>
        <div className="m-15-ver">
          <Input
            type="text"
            name="room"
            id="room"
            placeholder="Digite o código da sala"
            disabled={loading}
            value={roomId}
            onChange={({ target: { value }}) => setRoomId(value)}
            error={error.message}
          />
        </div>
        <div className="m-15-ver">
          <Button
            block
            disabled={loading || !roomId}
            icon="log-in"
            variant="primary"
          >
            {!loading ? 'Entrar na sala' : 'Buscando sala...'}
          </Button>
        </div>
      </form>
    </section>
  )
}

Home.exact = true
Home.path = '/'
