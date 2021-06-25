export default function useButtonProps(props: any) {
  const {
    block,
    className: classNameRaw,
    variant,
    ...rest
  } = props

  const className = [
    'btn',
    !block ? '' : 'btn--block',
    !variant ? '' : `btn--${variant}`,
    classNameRaw,
  ]
  .filter((classNameItem) => classNameItem)
  .join(' ')

  return {
    ...rest,
    className,
  }
}
