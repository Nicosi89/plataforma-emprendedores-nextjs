'use client';
import { createContext, useContext, useState } from "react";


const CurrentUserContext = createContext<CurrentUserContextType | undefined>(undefined);

//provider que consumirá el contexto
const CurrentUserProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<Users | undefined | null>()

  console.log('Estado Curso Actual en provider', currentUser)

  
  return (
    //disponibiliza el provider

    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }} >
      {children}
    </CurrentUserContext.Provider>
  )
}


export const useCurrentUserProvider = () => {
  const context = useContext(CurrentUserContext);

  if (!context) throw new Error('useLeccionActual debe ser usada dentro del LeccionProvider');

  return context;
}

export default CurrentUserProvider;