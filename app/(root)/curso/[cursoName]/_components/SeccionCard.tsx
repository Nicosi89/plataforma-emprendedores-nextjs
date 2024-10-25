import { Button } from '@/components/ui/button';

import React from 'react';
import Link from 'next/link';


const SeccionCard: React.FC<SessonCardProps> = ({ title, description, route, imageUrl }) => {

  return (
    <div className="flex max-phone:flex-col overflow-hidden relative gap-8 justify-center items-center px-12 py-4 mt-10 w-full bg-white-1 max-w-[980px] min-h-[180px] rounded-[50px] max-md:px-5 max-md:max-w-full">
      <div className='flex min-w-[240px] max-md:max-w-full max-phone:flex-col'>
      <div className="flex z-0 flex-col flex-1 my-auto text-black basis-20 min-w-[240px] max-md:max-w-full">
        <h2 className="self-start text-[22px] font-semibold text-center">{title}</h2>
        <p className="font-manrope overflow-hidden max-w-full text-[22px] text-black w-[849px] max-md:max-w-full">{description}</p>
      </div>
    <Button asChild 
      className='text-2xl font-lexend my-5 bg-marca-pink p-7 text-white-1 font-semibold transition-all duration-500 hover:bg-black-1'>
        <Link href={`/seccion/${route}`} >Empezar sección</Link>
         
        </Button> 
    </div>
      
    </div>
  );
};

export default SeccionCard