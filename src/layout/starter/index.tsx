import illustrationImg from 'assets/images/illustration.svg'
import './styles.scss'

export type LayoutStarterProps = {
  children: any;
  slogan?: string;
  description?: string;
}

export function LayoutStarter(props: LayoutStarterProps) {
  const {
    children,
    description = 'Aprenda e compartilhe conhecimento com outras pessoas.',
    slogan = 'Toda pergunta tem uma resposta.',
  } = props

  return (
    <div className="layout-starter">
      <aside className="layout-starter__featured">
        <figure className="layout-starter__featured__figure">
          <img
            loading="lazy"
            alt="Ilustração"
            className="layout_starter__featured__figure__img centered"
            src={illustrationImg}
          />
        </figure>
        {slogan && (
          <h1 className="layout-starter__featured__slogan">
            {slogan}
          </h1>
        )}
        {description && (
          <p className="layout-starter__featured__description text-lead">
            {description}
          </p>
        )}
      </aside>
      <main className="layout-starter__main">
        {children}
      </main>
    </div>
  )
}
