import './styles.scss'

export function User(props: any) {
  const {
    size = 32,
    user = {},
    className = '',
    loading: loadingParent = false,
    ...rest
  } = props
  const {
    avatar = '',
    name = '',
  } = user
  const loading = loadingParent

  return (
    <figure
      className={`user${!loading ? '' : 'user--loading'} flex flex--row ${className}`}
      {...rest}
    >
      <img
        className="user__avatar flex"
        alt=""
        loading="lazy"
        width={size}
        height={size}
        src={avatar}
      />
      <legend className="user__name flex flex--1 flex--centered-y p-8-l">
        {loading ? '...' : name}
      </legend>
    </figure>
  )
}
