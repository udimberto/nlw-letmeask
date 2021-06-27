import { useState } from 'react'
import { firebaseRef } from 'services'
import { ErrorType } from 'types'

export function useItem(dataType: any = null, successDelay: number = 1500) {
  const [error, setError] = useState<ErrorType>({})
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(dataType)
  const [success, setSuccess] = useState(false)

  function reset() {
    setError({})
    setLoading(true)
    setData(null)
    setSuccess(false)
  }

  function successful() {
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
    }, successDelay)
  }

  async function get(path = '', method: 'val' | 'exists' | undefined) {
    reset()

    try {
      const itemRef = await firebaseRef(path).get()
      const response = method ? itemRef[method]() : itemRef

      setData(response)
      successful()

      return response
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  async function push(path = '', data: any) {
    return firebaseRef(path).push(data)
  }

  async function remove(path = '') {
    return firebaseRef(path).remove()
  }

  async function set(path = '', data: any) {
    return firebaseRef(path).set(data)
  }

  async function toggle(path = '', key: string = '', data: any = '') {
    if (!path) {
      return
    }

    reset()

    try {
      const fullPath = !key ? path : `${path}/${key}`
      const itemRef = await firebaseRef(fullPath).get()
      const exists = itemRef.exists()

      if (exists) {
        await remove(fullPath)
      } else {
        await set(fullPath, data)
      }

      successful()
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return {
    ...(data || {}),
    error,
    loading,
    get,
    push,
    remove,
    set,
    success,
    toggle,
  }
}
