import {createContext, useContext, useEffect, useState} from 'react'
import {me} from '../dataAccess/auth'

const UserContext = createContext()
const UserUpdateContext = createContext()

export function useAuthenticatedUser() {
  return useContext(UserContext)
}

export function useUpdateAuthenticatedUser() {
  return useContext(UserUpdateContext)
}

export default function AuthProvider({children}) {
  const [user, setUser] = useState(
    localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : {},
  )

  useEffect(() => {
    const token = localStorage.getItem('authToken')

    if (token) {
      me().then(({success, user}) => {
        if (success) {
          localStorage.setItem('user', JSON.stringify(user))
          setUser(user)
        } else {
          localStorage.removeItem('user')
          localStorage.removeItem('authToken')
          setUser({})
        }
      })
    }
  }, [])

  return (
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={setUser}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  )
}
