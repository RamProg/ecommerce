import React, { useState } from 'react'

export const UserContext = React.createContext([]);

export const UserContextExport = ({ children }) => {
    const [auth, setAuth] = useState()

    return (
        <UserContext.Provider value={{ auth, setAuth }}>
            {children}
        </UserContext.Provider>
    )
}