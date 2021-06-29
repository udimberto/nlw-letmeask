import { useEffect, useState } from 'react'
import { firebaseRef } from 'services'
import { ErrorType } from 'types'

export function useItemListen(path: string) {
  const [error, setError] = useState<ErrorType>({})
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  function reset() {
    setError({})
    setLoading(true)
    setData(null)
  }

  useEffect(() => {
    if (!path) {
      return
    }

    reset()

    const itemRef = firebaseRef(path)

    itemRef.on('value', (snapshot) => {
      setLoading(false)

      if (!snapshot.exists()) {
        setError(new Error(`O registro para "${path}" não existe.`))
        return
      }

      setData(snapshot.val())
    })

    return () => {
      itemRef.off()
    }
  }, [path])

  return {
    ...(data || {}),
    error,
    loading,
  }
}
