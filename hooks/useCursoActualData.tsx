'use client';
import { useEffect, useState } from "react";

// Hook para determinar cuál es el curso actual en el que está el usuario
function useCursoActualInfoHook({ numLeccion, dataCursos }: { numLeccion: number | undefined, dataCursos: Curso[] | undefined }) {
  const [cursoActualState, setCursoActualState] = useState<CursoActual | undefined>(undefined);

  //console.log('Data Cursos en hook', dataCursos);

  // Solo ejecuta esta lógica cuando cambia el valor de `path` o `dataCursos`
  useEffect(() => {
    //console.log('se ejecuta el useEffect del hook useCursoActualInfoHook');
    
    if (dataCursos) {
      // Buscar la lección en los cursos
      //console.log('se ejecuta lógica del hook')
      for (const curso of dataCursos) {
        for (const seccion of curso.secciones) {
          //console.log('se ejecuta lógica del hook 2')
          const leccionEncontrada = seccion.lecciones.find((leccion) => leccion.numLeccion === numLeccion);
          if (leccionEncontrada) {
            // Si se encuentra la lección, actualizamos el estado
            //console.log('se ejecuta lógica del hook 3')
            setCursoActualState({
              curso: curso,
              seccion: seccion.nombreSeccion,
              leccion: leccionEncontrada.nombreLeccion,
              leccionRoute: leccionEncontrada.route,
              seccionRoute: seccion.route
            });
            return; // Termina la búsqueda al encontrar la lección
          }
        }
      }
    }
  }, [dataCursos, numLeccion]);

  return cursoActualState;
}

export default useCursoActualInfoHook;
