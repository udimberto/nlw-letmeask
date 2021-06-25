import {
  Button,
  ButtonLink,
  Logo,
  Input,
  Separator,
} from 'components'

export function Home() {
  return (
    <section
      className="centered fw"
      style={{ maxWidth: '320px' }}
    >
      <div className="m-15-t m-40-b text-center">
        <Logo />
      </div>
      <form>
        <div className="m-15-ver">
          <ButtonLink
            block
            variant="google-red"
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
          />
        </div>
        <div className="m-15-ver">
          <Button
            block
            variant="primary"
          >
            Entrar na sala
          </Button>
        </div>
      </form>
    </section>
  )
}

Home.exact = true
Home.path = '/'
Home.layout = 'LayoutStarter'
