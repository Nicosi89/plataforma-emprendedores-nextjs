'use client';
import HeaderSection from './_components/PrinciplesSection';
import Description from './_components/Description';
import SeccionList from './_components/SeccionList';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

import useDataCursoActual from '@/hooks/useDataCursoActual';
import Header from '@/components/Header';


const PageCurso = ({ params: { cursoName } }: { params: { cursoName: string } }) => {

  const dataCursos = useQuery(api.lecciones.getDataCursos)

  //obtiene la seccion actual según el path 
  const dataCursoActual = useDataCursoActual({path: cursoName, dataCursos: dataCursos})
  

  //console.log('String leccion', cursoActual?.leccion)
  console.log('CursoActual en Secciones', dataCursos)
 
   
  // Renderizado condicional basado en si cursoActual, seccionActual, leccionActual están disponibles
  if (!dataCursoActual) {
    return <div>Loading...</div>; // Mostrar un estado de carga si los datos no están listos
  }
     
    return (
    <div className="flex overflow-hidden bg-white">
      <div className="flex flex-col flex-1 shrink w-full basis-0 min-w-[240px] max-md:max-w-full">
        <div className="flex overflow-hidden flex-col flex-1 items-center w-full max-md:max-w-full">
          <Header isPerfil={false} isLeccion={false}/>
          <HeaderSection cursonName={dataCursoActual.nombreCurso!} imgUrl={dataCursoActual?.imagenUrl} />
          <Description descripcion={dataCursoActual?.descripcion} /> 
          <SeccionList secciones={dataCursoActual?.secciones} /> 

        </div>
      </div>
    </div>
  );

};

export default PageCurso;