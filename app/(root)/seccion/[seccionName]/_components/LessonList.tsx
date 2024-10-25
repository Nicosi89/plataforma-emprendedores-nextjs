import React from 'react';
import LessonCard from './LessonCard';

const LessonList = ({lecciones}: {lecciones: LessonCardProps[] | undefined}) => {


  if (!lecciones) {
    return (
      <p>No se ha podido traer la data de lecciones de esta sección</p>
    )
  }

  //console.log('lecciones:', lecciones)

  return (
    <div className='flex flex-col items-center gap-9'>
      <h2 className='font-lexend text-marca-pink text-[25px] font-semibold'>LECCIONES</h2>
    <div className="flex overflow-hidden gap-9 flex-col flex-1 items-center p-10 max-w-full bg-stone-300 bg-opacity-30 rounded-[50px] w-[980px] max-md:px-5 max-md:mt-10">
      {lecciones!.map((leccion, index) => (
        <LessonCard key={index} title={leccion.title} description={leccion.description} isLocked={leccion.isLocked} route={leccion.route} />
      ))}
    </div>
    </div>
  );
};


export default LessonList;