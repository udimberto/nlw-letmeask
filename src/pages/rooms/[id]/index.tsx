import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { firebaseRef, room } from 'services'
import { ErrorType, RoomType } from 'types'
import { Button, ClipboardButton, Header, NewQuestion } from 'components'
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
  const { isOwner, title } = roomDetails
  const notFound = !!(!title && !loading)
  const isEmpty = !!(!loading && !roomQuestionsLoading && !counter)

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
        .map((id) => ({ id, ...questionsRef[id] }))
        .reverse()
        .sort(({ isHighlighted: highA }, { isHighlighted: highB }) => highA - highB)
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

        setRoomDetails(response)
        setRoomQuestionsLoading(true)
        setRoomQuestions({ counter: 0, questions: [] })

        firebaseRef(`/rooms/${roomId}/questions`).on('value', handleQuestions)

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
  }, [roomId])

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
              className="flex flex--inline"
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
                <Button
                  bordered
                  small
                  variant="primary"
                  style={{ marginLeft: '8px', minWidth: '130px' }}
                  id="roomActionEnd"
                >
                  Encerrar sala
                </Button>
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
            </Header>

            {/* {!isOwner && ( */}
              <NewQuestion
                id="roomNewQuestion"
                roomId={roomId}
                loading={loading}
              />
            {/* )} */}

            {questions.map(({ content, id }: any) => (
              <div
                key={`room-question-${roomId}-${id}`}
                className="p-16"
              >
                <div>
                  {content}
                </div>
              </div>
            ))}

            {isEmpty && (
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
                  <p id="roomEmptyMessage" className="text-md text-gray-dark">
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
