import { ReactNode } from "react"

interface ApplicationStateProviderProps {
  children: ReactNode
}

const ApplicationStateProvider = ({ children }: ApplicationStateProviderProps) => {
    return (
        { children }
    )
}

export { ApplicationStateProvider }
