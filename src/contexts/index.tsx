import { AuthContext } from './auth'

export default function AppContexts(props: any) {
  const { children } = props

  return (
    <AuthContext>
      {children}
    </AuthContext>
  )
}
