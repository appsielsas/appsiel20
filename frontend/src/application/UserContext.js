import React, { useState } from 'react'

const Context = React.createContext({})

export function UserContextProvider({ children }) {
    const [SelectedUser, setSelectedUser] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    return <Context.Provider value={{ SelectedUser, setSelectedUser }}>
        {children}
    </Context.Provider>


}

export default Context
