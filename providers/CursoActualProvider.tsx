'use client';
import { createContext, useContext, useState } from "react";


const CursoActualContext = createContext<LeccionContextType | undefined>(undefined);

//provider que consumirá el contexto
const CursoProvider = ({ children }: { children: React.ReactNode }) => {
  const [cursoActual, setCursoActual] = useState<CursoActual | undefined>()

  console.log('Estado Curso Actual en provider', cursoActual)

  /* //si está en la pantalla de crear podcast para el audio 
  useEffect(() => {
    if(pathname === '/create-podcast') setAudio(undefined);
  }, [pathname])
 */
  return (
    //disponibiliza el provider

    <CursoActualContext.Provider value={{ cursoActual, setCursoActual }} >
      {children}
    </CursoActualContext.Provider>
  )
}


export const useCursoActualProvider = () => {
  const context = useContext(CursoActualContext);

  if (!context) throw new Error('useLeccionActual debe ser usada dentro del LeccionProvider');

  return context;
}

export default CursoProvider;