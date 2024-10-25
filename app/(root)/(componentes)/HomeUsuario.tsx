'use client';
import CourseGrid from './CourseGrid'
import { api } from '@/convex/_generated/api';
import { getNextLeccionRoute } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import useSeccionActualHook from '@/hooks/useSeccionActualData';
import { useQuery } from 'convex/react';
import BotonActionHome from './BotonActionHome';
import EstasAquiHome from './EstasAquíHome';
import { useCursoActualProvider } from '@/providers/CursoActualProvider';


function HomeUsuario() {

    const router = useRouter()

    //trae la data de cursos
    const currentUser = useQuery(api.users.getCurrentUser, { isAuthenticated: true })
    const dataCursos = useQuery(api.lecciones.getDataCursos)
    const { cursoActual } = useCursoActualProvider();
    const seccionActualState = useSeccionActualHook({ dataCursos: dataCursos, path: cursoActual?.seccionRoute })

    const onClickHandlerContinuar = () => {
           const nextRoute = getNextLeccionRoute(seccionActualState!, cursoActual!)
        router.push(nextRoute!)
    }

    const onClickHandlerEmpezar = () => {
        router.replace('/curso/mensajemarca')
    }

    /* if (!cursoActual) {
        return <p>Cargando cursoActual...</p>
    }
    if (!seccionActualState) {
        return <p>Cargando seccionActualState...</p>
    } */
    return (
        <>
            <h1 className="overflow-hidden gap-2.5 self-stretch py-4 pr-80 pl-80 w-full font-lexend text-[35px] text-center min-h-[98px] max-md:px-5 max-md:max-w-full max-md:text-4xl">
                Bienvenido de nuevo {currentUser?.name}!
            </h1>
            <section className="flex flex-col gap-9  bg-marca-pink rounded-[35px] py-9 px-9 items-center justify-center grow shrink z-0 self-center mt-12 min-w-[280px] max-phone:px-3 min-h-[350px] max-md:mt-10" aria-label="Featured course content">
                <h3 className='font-lexend text-white-1 text-2xl font-semibold'> Estas aquí: </h3>
                <EstasAquiHome cursoActual={cursoActual} />
                {cursoActual ?
                    <BotonActionHome
                        label='Continuar camino'
                        onClickHandler={onClickHandlerContinuar}
                        isConUsuario={true} />
                    : <BotonActionHome
                        label='Empezar camino'
                        onClickHandler={onClickHandlerEmpezar}
                        isConUsuario={true} />
                }
            </section>
            <CourseGrid />
        </>
    )
}

export default HomeUsuario
