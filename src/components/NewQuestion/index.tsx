import { FormHTMLAttributes, FormEvent, useState } from 'react'
import { useAuth } from 'hooks'
import { room } from 'services'
import { ErrorType } from 'types'
import { Button } from '../Button'
import { TextArea } from '../Form'
import { User } from '../User'

export interface NewQuestionProps extends FormHTMLAttributes<HTMLFormElement> {
  roomId: string;
  loading?: boolean;
}

export function NewQuestion(props: NewQuestionProps) {
  const {
    roomId,
    loading: loadingParent,
    ...rest
  } = props
  const { afterLogin, user, loading: loadingUser } = useAuth()
  const [error, setError] = useState<ErrorType>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [question, setQuestion] = useState('')
  const disabled = loading || loadingParent || success || !roomId

  async function handleNewQuestion(evt: FormEvent) {
    evt.preventDefault()

    const _question = question.trim()

    if (!roomId || !_question || disabled) {
      return
    }

    setError({})
    setLoading(true)
    setSuccess(false)

    try {
      await afterLogin(async () => {
        await room.question.new(roomId, _question)

        setLoading(false)
        setSuccess(true)

        setTimeout(() => {
          setSuccess(false)
          setQuestion('')
        }, 5000)
      })
    } catch(err) {
      setError(err)
      setLoading(false)
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleNewQuestion}
      {...rest}
    >
      <TextArea
        id="newQuestion"
        name="newQuestion"
        placeholder="O que você quer perguntar?"
        disabled={disabled}
        value={question}
        onChange={({ target: { value } }) => setQuestion(value)}
        error={error.message}
      />
      <footer className="flex flex--row flex--sb p-16-ver">
        <div className="flex flex--1 flex--centered-y text-500">
          {(!user || !user.name) ? (
            <p className="text-helper">
              Antes de enviar sua pergunta, solicitaremos que você faça login.
            </p>
          ) : (
            <User
              loading={loadingUser}
              user={user}
            />
          )}
        </div>
        <div>
          <Button
            variant={success ? 'success' : 'primary'}
            style={{ minWidth: '177px' }}
            disabled={disabled || success}
          >
            {loading ? 'Enviando pergunta...' : (
              !success ? 'Enviar pergunta' : 'Pergunta enviada!'
            )}
          </Button>
        </div>
      </footer>
    </form>
  )
}
