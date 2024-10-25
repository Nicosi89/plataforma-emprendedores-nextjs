'use client';
import { useEffect, useState } from "react";

// Hook para determinar cuál es la lección actual en el que está el usuario
function useSeccionActualHook({ path, dataCursos }: { path: string | undefined, dataCursos: Curso[] | undefined }) {
  const [seccionActualState, setSeccionActualState] = useState<Seccion | undefined>(undefined);

  console.log('Data Cursos en hook seccion', dataCursos);

  // Solo ejecuta esta lógica cuando cambia el valor de `path` o `dataCursos`
  useEffect(() => {
    console.log('se ejecuta el useEffect del hook useSecciOnActualHook');
    
    if (dataCursos) {
      // Buscar la lección en los cursos
      console.log('se ejecuta lógica del hook')
      for (const curso of dataCursos) {
        const seccionEncontrada = curso.secciones.find((seccion) => seccion.route === path);
        if (seccionEncontrada) {
          // Si se encuentra la lección, actualizamos el estado
          console.log('se ejecuta lógica del hook 3')
          setSeccionActualState(seccionEncontrada);
          return; // Termina la búsqueda al encontrar la lección
        }
        
      }
    }
  }, [dataCursos, path]);

  return seccionActualState;
}

export default useSeccionActualHook;
