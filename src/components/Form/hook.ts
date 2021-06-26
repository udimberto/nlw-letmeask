export default function useFormControlProps(
  props: any,
  classNamePrefix: string = 'form-control',
) {
  const {
    className: classNameRaw,
    error,
    hint,
    success,
    ...rest
  } = props

  const message = error || success || hint
  const className = [
    classNamePrefix,
    !error ? '' : `${classNamePrefix}--error`,
    !message ? '' : `${classNamePrefix}--message`,
    !success ? '' : `${classNamePrefix}--success`,
    classNameRaw,
  ]
  .filter((classNameItem) => classNameItem)
  .join(' ')

  return {
    ...rest,
    className,
    classNameMessage: `${classNamePrefix}__message`,
    message,
  }
}
