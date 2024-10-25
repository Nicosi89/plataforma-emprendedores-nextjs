'use client';
import { useEffect, useState } from "react";

// Hook para determinar cuál es la lección actual en el que está el usuario
function useLeccionActualHook({ path, dataCursos }: { path: string | undefined, dataCursos: Curso[] | undefined }) {
  const [leccionActualState, setLeccionActualState] = useState<Leccion | undefined>(undefined);

  console.log('Data Cursos en hook leccion', dataCursos);

  // Solo ejecuta esta lógica cuando cambia el valor de `path` o `dataCursos`
  useEffect(() => {
    console.log('se ejecuta el useEffect del hook useLeccionActualInfoHook');
    
    if (dataCursos) {
      // Buscar la lección en los cursos
      //console.log('se ejecuta lógica del hook')
      for (const curso of dataCursos) {
        for (const seccion of curso.secciones) {
          //console.log('se ejecuta lógica del hook 2')
          const leccionEncontrada = seccion.lecciones.find((leccion) => leccion.route === path);
          console.log('la leccion encontrada es: ', leccionEncontrada)
          if (leccionEncontrada) {
            // Si se encuentra la lección, actualizamos el estado
            //console.log('se ejecuta lógica del hook 3')
            setLeccionActualState(leccionEncontrada);
            return; // Termina la búsqueda al encontrar la lección
          }
        }
      }
    }
  }, [dataCursos, path]);

  return leccionActualState;
}

export default useLeccionActualHook;
