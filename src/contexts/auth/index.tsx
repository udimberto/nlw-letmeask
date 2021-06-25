import { createContext, useContext, useEffect, useState } from 'react'
import { firebase, firebaseAuth } from 'services'
import { AuthContextType, UserType } from './types'

export const AuthContextRef = createContext({} as AuthContextType)

export function AuthContext(props: any) {
  const [user, setUser] = useState<UserType>()

  /**
   * Check and load user to context
   *
   * @param response
   */
  function checkAndLoadUser(response: any) {
    if (response) {
      const { displayName: name, photoURL: avatar, uid: id } = response

      if (!name || !avatar) throw new Error('Auth: User missing information')

      setUser({ avatar, id, name })
    }
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
    if (!user) {
      await signInWithGoogle()
    }

    callback(user)
  }

  /**
   * Listen if user is already logged in
   */
  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(checkAndLoadUser)

    return () => {
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
      }}
      {...props}
    />
  )
}

export function useAuth() {
  return useContext(AuthContextRef)
}
