'use client';
import { useEffect, useState } from "react";

// Hook para obtner la data del curso actual según el path
function useDataCursoActual({ path, dataCursos }: { path: string | undefined, dataCursos: Curso[] | undefined }) {
  const [dataCursoActual, setDataCursoActual] = useState<Curso | undefined>(undefined);

  //console.log('Data Cursos en hook', dataCursos);

  // Solo ejecuta esta lógica cuando cambia el valor de `path` o `dataCursos`
  useEffect(() => {
    //console.log('se ejecuta el useEffect del hook useCursoActualInfoHook');

    if (dataCursos) {
      // Buscar la lección en los cursos
      //console.log('se ejecuta lógica del hook')
      for (const curso of dataCursos) {
        const cursoEncontrado = curso.route === path
        console.log('curso encontrado en hook useDataCursoActual', cursoEncontrado)
        if (cursoEncontrado) {
          setDataCursoActual(curso)
          return;
        }
        // Termina la búsqueda al encontrar la lección
      }
    }
  }, [dataCursos, path]);

  return dataCursoActual;
}

export default useDataCursoActual;
