import './styles.scss'

export type SeparatorProps = {
  children: any;
  className?: string;
}

export function Separator(props: SeparatorProps) {
  const {
    children,
    className = '',
  } = props

  return (
    <div
      className={`separator ${className}`}
    >
      {children}
    </div>
  )
}
