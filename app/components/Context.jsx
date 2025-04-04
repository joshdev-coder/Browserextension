'use client'
import { createContext, useState } from "react";

export const AppContext = createContext()
const Context = ({children}) => {
    const [query,setQuery] = useState('')
    const [bg,setBg] = useState('moon')
    return ( 
        <AppContext.Provider value={{query,setQuery,bg,setBg}}>
            {children}
        </AppContext.Provider>
     );
}
 
export default Context;