import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { firebaseRef, room } from 'services'
import { ErrorType, RoomType } from 'types'
import { ClipboardButton, Header, NewQuestion, Questions, RoomActionEnd } from 'components'
import emptyImg from 'assets/images/empty-questions.svg'

export type RoomParams = {
  roomId: string;
}

export function Room() {
  const { roomId } = useParams<RoomParams>()
  const [error, setError] = useState<ErrorType>({})
  const [loading, setLoading] = useState(true)
  const [roomDetails, setRoomDetails] = useState<RoomType>({})
  const [roomQuestions, setRoomQuestions]= useState<any>({})
  const [roomQuestionsLoading, setRoomQuestionsLoading] = useState(true)
  const { counter = 0, questions = [] } = roomQuestions
  const { endedAt, isOwner, title } = roomDetails
  const notFound = !!(!title && !loading)
  const isEmpty = !!(!loading && !roomQuestionsLoading && !counter)
  const questionsPath = `/rooms/${roomId}/questions`

  useEffect(() => {
    function handleQuestions(snapshot: any) {
      if (!snapshot.exists()) {
        setRoomQuestionsLoading(false)
        setRoomQuestions({ counter: 0, questions: [] })

        return
      }

      const questionsRef = snapshot.val();
      const questions = (
        Object
        .keys(questionsRef)
        .map((id) => ({
          id,
          ...questionsRef[id],
          likes: Object.values(questionsRef[id]?.likes || {}),
        }))
        .reverse()
        .sort(({ likes: likesA }, { likes: likesB }) => Object.values(likesB).length - Object.values(likesA).length)
        .sort(({ isHighlighted: highA }, { isHighlighted: highB }) => highB - highA)
        .sort(({ isAnswered: answeredA }, { isAnswered: answeredB }) => answeredA - answeredB)
      )
      const counter = questions.length

      setRoomQuestions({ questions, counter })
      setRoomQuestionsLoading(false)
    }

    async function fetchRoom() {
      setError({})
      setLoading(true)

      try {
        const response = await room.get(roomId)

        setRoomDetails({ id: roomId, ...response })
        setRoomQuestionsLoading(true)
        setRoomQuestions({ counter: 0, questions: [] })

        firebaseRef(questionsPath).on('value', handleQuestions)

        setTimeout(() => {
          setRoomQuestionsLoading(false)
        }, 2500)
      } catch (err) {
        setError(err)
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchRoom()
  }, [questionsPath, roomId])

  return (
    <>
      {notFound ? (
        <div className="container container--md flex flex--1 flex--column">
          <Header
            id="roomNotFoundHeader"
            pill={!counter ? undefined : {
              id: 'roomHeaderCount',
              children: (`${counter} pergunta${counter > 1 ? 's' : ''}`)
            }}
          >
            Ops!
          </Header>
          <p id="roomNotFoundMessage" className="text-lead text-gray-dark">
            {error.message || 'Sala não encontrada'}
          </p>
        </div>
      ) : (
        <>
          <div className="container" style={{ position: 'relative' }}>
            <div
              id="roomActions"
              className="flex flex--inline gap-8"
              style={{
                position: 'absolute',
                right: 'var(--container-padding)',
                top: '-65px',
              }}
            >
              <ClipboardButton
                before="Sala #"
                id="roomActionClipboardId"
              >
                {roomId}
              </ClipboardButton>
              {isOwner && (
                <RoomActionEnd
                  room={roomDetails}
                />
              )}
            </div>
          </div>
          <div className="container container--md flex flex--1 flex--column">
            <Header
              id="roomHeader"
              pill={!counter ? undefined : {
                id: 'roomHeaderCount',
                children: (`${counter} pergunta${counter > 1 ? 's' : ''}`)
              }}
            >
              Sala {loading ? 'carregando...' : (title || 'não encontrada')}
              {endedAt && ` (encerrada em ${new Date(endedAt).toLocaleDateString()})`}
            </Header>

            {!endedAt && (
              <div className="p-16-b">
                <NewQuestion
                  id="roomNewQuestion"
                  roomId={roomId}
                  loading={loading}
                />
              </div>
            )}

            {!isEmpty ? (
              <div className="p-40-b">
                <Questions
                  isOwner={isOwner}
                  questions={questions}
                  questionsPath={questionsPath}
                />
              </div>
            ) : (
              <section
                id="roomEmpty"
                className="flex flex--1 flex--column flex--centered text-center"
              >
                <div className="container container--xs p-0-hor p-20-t p-50-b">
                  <figure className="flex flex--inline">
                    <img
                      id="roomEmptyImg"
                      className="img-responsive"
                      alt=""
                      loading="lazy"
                      width={150}
                      height={150}
                      src={emptyImg}
                    />
                  </figure>
                  <h3 id="roomEmptyTitle">
                    Nenhuma pergunta por aqui...
                  </h3>
                  <p id="roomEmptyMessage" className="text-sm text-gray-dark">
                    {isOwner ? (
                      'Envie o código desta sala para seus amigos e comece a responder perguntas!'
                    ) : (
                      'Faça o seu login e seja a primeira pessoa a fazer uma pergunta!'
                    )}
                  </p>
                </div>
              </section>
            )}
          </div>
        </>
      )}
    </>
  )
}

Room.exact = false
Room.path = '/rooms/:roomId'
