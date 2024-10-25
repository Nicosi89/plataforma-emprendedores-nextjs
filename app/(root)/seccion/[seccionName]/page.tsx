'use client';
import HeaderSection from './_components/PrinciplesSection';
import LessonList from './_components/LessonList';
import { useCursoActualProvider } from '@/providers/CursoActualProvider';
import { useMemo } from 'react';
import { getAllLecciones, getLeccionCompletadas, getSeccioneCursoActual } from '@/lib/utils';
import useSeccionActualHook from '@/hooks/useSeccionActualData';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import useLeccionActualHook from '@/hooks/useLeccionActualData';
import Header from '@/components/Header';
import Contenido from './_components/Contenido';


const PageSeccion = ({ params: { seccionName } }: { params: { seccionName: string } }) => {

  const dataCursos = useQuery(api.lecciones.getDataCursos)

  //obtiene la seccion actual según el path 
  const seccionActualState = useSeccionActualHook({ path: seccionName, dataCursos: dataCursos })

  //trae el valor del estado del curso actual en el que se encuentra el usuario, los nombres de la sección y leccion actuales 
  const { cursoActual } = useCursoActualProvider();
  const leccionActualState = useLeccionActualHook({ path: cursoActual?.leccionRoute!, dataCursos: dataCursos })

  console.log('String leccion', cursoActual?.leccion)
  console.log('CursoActual en Secciones', cursoActual)

  /* // useMemo siempre se llama, pero si cursoActual es undefined, retornamos valores predeterminados
  const seccionActual = useMemo(() => {
    if (!cursoActual) return null; // Si cursoActual no está disponible, retornamos null
    return getSeccioneCursoActual(cursoActual);
  }, [cursoActual]);
 */
  // Lo mismo para leccionesBloqueadas, si seccionActual es null, retornamos un array vacío
  const leccionesParaMostrar = useMemo(() => {
    console.log('se ejecuta la función memo lecciones bloqueadas')
    //si no hay ninguno, ni el del usuario ni el del path, retorne vacío
    if (!seccionActualState && !leccionActualState) return [];
    //si no está el del usuario, osea no hay usuario
    if (!leccionActualState) {
      return getAllLecciones(seccionActualState)
    }
    //si ambos están disponibles muestre las lecciones con bloqueo
    return getLeccionCompletadas(seccionActualState, leccionActualState?.numLeccion!);
  }, [seccionActualState, leccionActualState]);

  /* console.log('seccionActualState en seccion page', seccionActualState)
  console.log('leccionActualState en seccion page', leccionActualState) */

  // Renderizado condicional basado en si cursoActual, seccionActual, leccionActual están disponibles
  if (!dataCursos) {
    return <div>Cargando...</div>; // Mostrar un estado de carga si los datos no están listos
  }

  return (
    <div className="flex overflow-hidden bg-white">
      <div className="flex flex-col flex-1 shrink w-full basis-0 min-w-[240px] max-md:max-w-full">
        <div className="flex overflow-hidden flex-col flex-1 items-center w-full max-md:max-w-full">
          <Header isLeccion={false}/>
          <HeaderSection seccionName={seccionActualState?.nombreSeccion!} imgUrl={seccionActualState?.imgUrl}/>
          <Contenido contenido={seccionActualState?.contenido} />
          <LessonList lecciones={leccionesParaMostrar} />

        </div>
      </div>
    </div>
  );

};

export default PageSeccion;