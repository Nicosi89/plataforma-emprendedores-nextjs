'use client';
import React, { useState } from 'react';
import SidebarItem from './SidebarItem';
import useCursoActualInfoHook from '@/hooks/useCursoActualData';
import Image from 'next/image';
import Link from 'next/link';



const Sidebar = ({ numLeccion, cursoActual }: UbicacionSegunPath) => {

  const [seccionAMostrar, setSeccionAMostrar] = useState<string | undefined>(undefined)

  const cursoActualHook = useCursoActualInfoHook({ numLeccion: numLeccion, dataCursos: cursoActual })

  if (!cursoActualHook) {
    return <div>Cargando Sidebar...</div>; // Maneja el estado de carga
  }
  console.log('Curso actual', cursoActual)


  return (
    <aside className="flex overflow-hidden flex-col px-4 pt-4 pb-8 bg-pink-600 min-w-[240px] w-[280px] max-md:flex max-md:pt-24 max-sm:hidden">
      <Link href='/'>
        <Image
          src="/dazzle-line-rocket.png"
          width={40}
          height={40}
          alt="menu icon"
        />
      </Link>
      <div className="flex overflow-hidden flex-col justify-between mt-14 px-4 py-3 w-full font-lexend text-black rounded-xl min-h-[94px] bg-white-1 gap-0">
        <div className="text-lg">CURSO</div>
        <div className="mt-3 text-base font-bold">{cursoActualHook!.curso.nombreCurso}</div>
      </div>
      <nav className="flex overflow-hidden flex-col p-2.5 mt-2.5 w-full text-base font-bold text-white-1">
        {/* mapea TODAS las lecciones de ese curso */}
        {cursoActualHook?.curso.secciones!.map((seccion, index) => {

          console.log('Nombre seccion en Sidebar', seccion.nombreSeccion)
          return <SidebarItem
            key={index}
            seccion={seccion}
            leccionActual={cursoActualHook.leccionRoute}
            seccionActual={cursoActualHook.seccion}
            seccionAMostrar={seccionAMostrar}
            setSeccionAMostrar={setSeccionAMostrar} />
        })}

      </nav>

    </aside>

  );

};


export default Sidebar;

