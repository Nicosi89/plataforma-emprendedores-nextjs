import React from 'react';
import SeccionCard from './SeccionCard';

const SeccionList = ({ secciones }: { secciones: Seccion[] | undefined }) => {


  if (!secciones) {
    return (
      <p>No se ha podido traer la data de lecciones de esta sección</p>
    )
  }

  return (
    <div className='flex flex-col items-center gap-9'>
      <h2 className='font-lexend text-marca-pink text-[25px] font-semibold'>SECCIONES</h2>
      <div className="flex overflow-hidden flex-col flex-1 items-center p-10 max-w-full bg-stone-300 bg-opacity-30 rounded-[50px] w-[980px] max-md:px-5 max-md:mt-10">
        {secciones!.map((seccion, index) => (
          <SeccionCard key={index} title={seccion.nombreSeccion} description={seccion.description} imageUrl={seccion.imgUrl} route={seccion.route} />
        ))}
      </div>
    </div>
  );
};


export default SeccionList;