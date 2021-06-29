import { createContext, useContext, useEffect, useState } from 'react'
import { firebase, firebaseAuth } from 'services'
import { ErrorType, UserType } from 'types'
import { AuthContextType } from './types'

export const AuthContextRef = createContext({} as AuthContextType)

export function AuthContext(props: any) {
  const [error, setError] = useState<ErrorType>({})
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<UserType>()

  /**
   * Check and load user to context
   *
   * @param response
   */
  function checkAndLoadUser(response: any) {
    if (response) {
      const { displayName: name, photoURL: avatar, uid: id } = response

      if (!name || !avatar) throw new Error('Não foi possível realizar sua autenticação.')

      setUser({ avatar, id, name })
    }

    setLoading(false)
  }

  /**
   * Sign in with Google account
   */
  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()
    const result = await firebaseAuth.signInWithPopup(provider)

    checkAndLoadUser(result.user)
  }

  /**
   * Execute/check Login, then call some action
   *
   * @param callback
   */
  async function afterLogin(callback: Function) {
    setLoading(true)

    try {
      if (!user) {
        await signInWithGoogle()
      }

      callback(user)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Listen if user is already logged in
   */
  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(checkAndLoadUser)

    return () => {
      setLoading(false)
      unsubscribe()
    }
  }, [])

  return (
    <AuthContextRef.Provider
      value={{
        user,
        setUser,
        signInWithGoogle,
        afterLogin,
        loading,
        error,
      }}
      {...props}
    />
  )
}

export function useAuth() {
  return useContext(AuthContextRef)
}
