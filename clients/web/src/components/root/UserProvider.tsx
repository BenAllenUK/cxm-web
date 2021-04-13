import { QueryResult } from '@apollo/client'
import { createContext, ReactNode, useContext } from 'react'
import { GetUserOneQuery, useGetUserOneQuery } from 'generated/graphql'

type UserResult = QueryResult<GetUserOneQuery>

type UserContext = {
  userId: number | null
  idToken: string | null
  email: string | null
  user: User | null
}

type User = NonNullable<UserResult['data']>['users_by_pk']

export const UserContext = createContext<UserContext>({
  userId: null,
  idToken: null,
  email: null,
  user: null,
})

export const useUser = () => useContext(UserContext)

export default function UserProvider({ initialUserData, children }: IProps) {
  const userId = initialUserData.userId
  const { data: usersData } = useGetUserOneQuery({
    variables: {
      id: userId ?? -1,
    },
  })

  const user = usersData?.users_by_pk

  return <UserContext.Provider value={{ ...initialUserData, user }}>{children}</UserContext.Provider>
}

interface IProps {
  initialUserData: {
    userId: number
    idToken: string
    email: string
  }
  children: ReactNode
}
