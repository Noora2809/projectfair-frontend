import React, { createContext, useState } from 'react'

export const addProjectContextResponse = createContext()
export const editUserProjectContextResponse = createContext()


function ContextShare({children}) {
    const [addProjectRes, setAddProjectRes] = useState("")
    const [editUserProjectRes, setEditUserProjectRes] = useState("")

  return (
    <div>
        <addProjectContextResponse.Provider value={{addProjectRes,setAddProjectRes}}>
          <editUserProjectContextResponse.Provider value = {{editUserProjectRes,setEditUserProjectRes}}>
            {children}
            </editUserProjectContextResponse.Provider>
        </addProjectContextResponse.Provider>
    </div>
  )
}

export default ContextShare