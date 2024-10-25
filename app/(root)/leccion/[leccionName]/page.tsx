'use client';
import React from 'react';
import Sidebar from './_componentes/Sidebar';
import Header from '../../../../components/Header';
import MainContent from './_componentes/MainContent';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import useLeccionActualHook from '@/hooks/useLeccionActualData';


const PageLeccion = ({ params: { leccionName } }: { params: { leccionName: string } }) => {

  //segun el parámetro determina la ubicación y la disponibiliza a todos los compoenentes hijos
  const dataCursos = useQuery(api.lecciones.getDataCursos)

  //hook para consiguir la data de la lecccion actual según el path
  const leccionActualState = useLeccionActualHook({path: leccionName, dataCursos: dataCursos})

  if (!leccionActualState) {
    return (
        <p>Cargando leccionActualState...</p>
    )
  }



  return (
    <div className="flex overflow-hidden flex-wrap">
      <Sidebar numLeccion={leccionActualState?.numLeccion!} cursoActual={dataCursos}/>
      <div className="flex flex-col flex-1 shrink basis-[30px] min-w-[240px] max-md:max-w-full">
        {/* el header bar donde se muestra la foto del usuario y el menu principal */} 
        <Header isLeccion={true} isPerfil={false}/>
        <MainContent numLeccion={leccionActualState?.numLeccion!} dataCursos={dataCursos} leccionActualState={leccionActualState}/>
      </div>

    </div>

  );

};


export default PageLeccion;