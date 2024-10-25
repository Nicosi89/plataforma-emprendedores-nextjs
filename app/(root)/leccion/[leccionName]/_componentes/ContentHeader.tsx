import React from 'react';
import Breadcrumbs from '../../../../../components/Breadcrumbs';
import useCursoActualInfoHook from '@/hooks/useCursoActualData';
import Image from 'next/image';



const ContentHeader = ({ leccionActual, numLeccion, cursoActual }: ContentHeaderProps) => {

  const cursoActualHook = useCursoActualInfoHook({ numLeccion: numLeccion, dataCursos: cursoActual })



  return (
    <section className="flex w-full flex-wrap gap-8 items-start pt-2 pb-16 max-phone:pb-2 text-black min-h-[320px] max-md:max-w-full">
      <div className='flex flex-col w-full'>
        <Breadcrumbs cursoActual={cursoActualHook} />
        <div className={`${leccionActual.nombreLeccion ? 'items-start justify-start' : ''} flex flex-wrap gap-8 min-h-[221px] w-full max-md:max-w-full mt-8`}>

          <div className='max-w-[600px]'>
            <h1 className="text-6xl font-lexend max-md:max-w-full max-md:text-4xl">
              {leccionActual.nombreLeccion}
            </h1>
            {leccionActual.description &&
              <p className="mt-8 text-2xl max-md:max-w-full font-manrope">
                {leccionActual.description}
              </p>}
          </div>
          <Image
            src={leccionActual.imgUrl}
            alt='imagen-leccion'
            width={500}
            height={500}
            className="object-contain shrink-0 self-stretch my-auto aspect-[0.63] w-[126px]"
          />
        </div>
      </div>

    </section>

  );

};


export default ContentHeader;