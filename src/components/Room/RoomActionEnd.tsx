import { useHistory } from 'react-router-dom'
import { useFirebase } from 'hooks'
import { RoomType } from 'types'
import { Button } from '../Button'

export function RoomActionEnd({
  room
} : {
  room: RoomType
}) {
  const { endedAt, id, isOwner } = room
  const fullPath = `/rooms/${id}`
  const history = useHistory()
  const { update } = useFirebase()

  async function handleEnd() {
    if (!window.confirm('Deseja encerrar a sala?')) {
      return
    }

    try {
      await update(fullPath, { endedAt: new Date() })

      history.push('/')
    } catch (err) {
      window.alert(`Erro: ${JSON.stringify(err)}`)
    }
  }

  return (endedAt || !isOwner) ? null : (
    <>
      <Button
        id="roomActionEnd"
        bordered
        small
        variant="primary"
        style={{ minWidth: '130px' }}
        onClick={handleEnd}
      >
        Encerrar sala
      </Button>
    </>
  )
}
