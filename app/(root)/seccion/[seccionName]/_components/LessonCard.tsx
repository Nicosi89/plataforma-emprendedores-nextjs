import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import React from 'react';
import Link from 'next/link';


const LessonCard: React.FC<LessonCardProps> = ({ title, description, isLocked, route }) => {

  return (
    <div className="flex max-phone:flex-col overflow-hidden relative gap-8 justify-center items-center px-12 py-4 mt-10 bg-white-1 max-w-[980px] min-w-[380px] min-h-[180px] rounded-[50px] max-md:px-5 max-md:max-w-full">
      <div className={cn('flex min-w-[240px] max-phone:flex-col', {'blur-sm' : isLocked})}>
      <div className="flex z-0 max-phone:pt-4 flex-col flex-1 flex-wrap gap-3 my-auto text-black basis-20 max-md:max-w-full">
        <h2 className="self-start text-[22px] font-semibold text-center">{title}</h2>
        <p className="font-manrope text-wrap overflow-hidden max-phone:w-[270px] text-[22px] text-black max-md:max-w-full">{description}</p>
      </div>
    <Button asChild 
      className='text-2xl font-lexend my-5 bg-marca-pink p-7 text-white-1 font-semibold transition-all duration-500 hover:bg-black-1'>
        <Link href={`/leccion/${route}`} >Empezar leccion</Link>
         
        </Button> 
    </div>
      {isLocked && (
        <div className="flex absolute bottom-0 left-2/4 z-0 flex-col justify-center items-center self-start text-[22px] font-bold text-center -translate-x-2/4 bg-neutral-400 bg-opacity-70 h-[195px] max-phone:h-[350px] min-w-[240px] rounded-[50px] translate-y-[0%] w-[1050px] max-md:max-w-full">
          <Image src="/iconos/candado-icono.png" width={50} height={50} alt="" className="object-contain aspect-[0.81] w-[38px]" />
          <div className="mt-1.5 max-md:max-w-full">
            Lección Bloqueada
            <br />
            <span className="font-medium">Debes completar la anterior para desbloquear esta</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonCard