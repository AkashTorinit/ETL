import { ThemeProvider } from '@mui/material'
import { createContext, ReactElement, ReactNode } from 'react'
import { User } from '../backend/user/user'
import theme from '../styles/theme'

export const UserContext = createContext<User | undefined>(undefined)

interface UserLayoutProps {
    children: ReactElement,
    user?: User,
    appbar?: ReactNode,
    
}

const UserLayout = ({ children, user, appbar}: UserLayoutProps) => {
  return (
    
      (user?.role == 'ADMIN') ?
    <main style={{display: 'flex'}}>
    <ThemeProvider theme={theme}>
        <UserContext.Provider value={user}>
          
            {appbar}
            <div style={{height:'100vh',overflowY:'scroll',overflowX:'hidden',width: '100vw'}}>{children}</div>
        </UserContext.Provider>
    </ThemeProvider>
</main> :
    <main>
        <ThemeProvider theme={theme}>
            <UserContext.Provider value={user}>
               {appbar}
                <div style={{height:'100vh'}}>{children}</div>
            </UserContext.Provider>
        </ThemeProvider>
    </main>
  
  )
}

export default UserLayout
