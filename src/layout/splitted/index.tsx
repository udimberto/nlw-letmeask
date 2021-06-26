import { Logo } from 'components'
import illustrationImg from 'assets/images/illustration.svg'
import './styles.scss'

export type LayoutSplittedProps = {
  children: any;
  slogan?: string;
  description?: string;
}

export default function LayoutSplitted(props: LayoutSplittedProps) {
  const {
    children,
    description = 'Aprenda e compartilhe conhecimento com outras pessoas.',
    slogan = 'Toda pergunta tem uma resposta.',
  } = props

  return (
    <div className="layout-splitted">
      <aside className="layout-splitted__featured">
        <figure className="layout-splitted__featured__figure">
          <img
            loading="lazy"
            alt="Ilustração"
            className="layout_splitted__featured__figure__img centered"
            src={illustrationImg}
          />
        </figure>
        {slogan && (
          <h1 className="layout-splitted__featured__slogan">
            {slogan}
          </h1>
        )}
        {description && (
          <p className="layout-splitted__featured__description text-lead">
            {description}
          </p>
        )}
      </aside>
      <main className="layout-splitted__main">
        <div className="m-40-b text-center">
          <Logo />
        </div>
        {children}
      </main>
    </div>
  )
}
