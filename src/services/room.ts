import { RoomType } from 'types'
import { firebaseDatabase, getUser } from './firebase'

const dbKey = 'rooms'

function ref(roomId: string) {
  return firebaseDatabase.ref(`${dbKey}/${roomId}`)
}

async function get(roomId: string) {
  const roomRef = await firebaseDatabase.ref(`${dbKey}/${roomId}`).get()

  if (!roomRef.exists()) {
    throw new Error(`A sala "${roomId}" não existe.`)
  }

  const roomVal = roomRef.val()
  const { uid: userId } = getUser() || {}
  const { authorId = '' } = roomVal
  const isOwner = authorId === userId

  return {
    ...roomVal,
    isOwner,
  }
}

async function newRoom(room: RoomType) {
  const { uid: authorId } = getUser() || {}

  if (!authorId) {
    throw new Error('Você precisa estar autenticado para criar uma nova sala')
  }

  return firebaseDatabase.ref(dbKey).push({ ...room, authorId })
}

async function newQuestion(roomId: string, question: string) {
  const { displayName: name, photoURL: avatar } = getUser() || {}
  const notAuthenticated = !!(!avatar || !name)
  const content = question.trim()

  if (notAuthenticated) {
    throw new Error('Você precisa estar autenticado para enviar uma pergunta')
  }

  if (!content) {
    throw new Error(`Parece que não há pergunta a se fazer: "${question}"`)
  }

  return firebaseDatabase.ref(`${dbKey}/${roomId}/questions`).push({
    content,
    isAnswered: false,
    isHighlighted: false,
    author: {
      avatar,
      name,
    },
  })
}

export const question = {
  new: newQuestion,
}

export const room = {
  get,
  new: newRoom,
  ref,
  question,
}
