'use client';

import CourseGrid from './CourseGrid'
import { useRouter } from 'next/navigation';
import BotonActionHome from './BotonActionHome';


function HomeSinusuario() {
    
    const router = useRouter()
    
    //trae la data de cursos
    
    const onClickHandler = () => {
        router.push('/curso/mensajemarca')
    }

    
    return (
        <>
            <h1 className="overflow-hidden gap-2.5 self-stretch py-4 pr-80 pl-80 w-full font-lexend text-[35px] text-center min-h-[98px] max-md:px-5 max-md:max-w-full max-md:text-4xl">
                Hola, que gusto que estés por acá!
            </h1>
            <section className="flex grow shrink z-0 self-center mt-8 min-w-[620px] max-phone:min-w-[350px] max-w-[820px] bg-zinc-300 min-h-[350px] rounded-[35px] max-md:mt-10" aria-label="Featured course content">
                {/* Content for featured course section */}
                
            </section>
            <BotonActionHome 
                label='Empezar camino' 
                onClickHandler={onClickHandler}
                isConUsuario={false}
                />
            <CourseGrid />
        </>
    )
}

export default HomeSinusuario
