import { api } from "@/convex/_generated/api";
import useCursoActualInfoHook from "@/hooks/useCursoActualData";
import { cn, getNextLeccionRoute, getPreviousLeccionRoute, getSeccioneCursoActual } from "@/lib/utils";
import { useMutation } from "convex/react";
import { Fascinate_Inline } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BotonesNavegacion = ({ numLeccion, cursoActual }: UbicacionSegunPath) => {
  const [previuosLesson, setPreviuosLesson] = useState<string>('')

  const cursoActualHook = useCursoActualInfoHook({ numLeccion: numLeccion, dataCursos: cursoActual })



  console.log('antes estado botonRetroceder', previuosLesson)

  //funcion para obtener la sección (objeto) del curso actual
  const seccionActual = getSeccioneCursoActual(cursoActualHook);

  useEffect(() => {
    const previousLesson = getPreviousLeccionRoute(seccionActual!, cursoActualHook!)
    console.log('previousLesson en useEffect', previousLesson)
    previousLesson !== '' &&
    setPreviuosLesson(previousLesson!)
    
    console.log('estado botonRetroceder en useeffect', previuosLesson)
    
  }, [seccionActual, cursoActualHook])
  
  console.log('despues botonRetroceder de useeffect', previuosLesson)

  const router = useRouter()
  //función para subir la ultima leccion
  const updateUltimaLeccionPorUsuario = useMutation(api.lecciones.updateUltimaLeccionPorUsuario)

  //obtiene la data del curso actual según el path



  console.log('Curso actual en botones nav', cursoActual)

  if (!cursoActualHook) {
    return <div>Cargando cursoActualHook...</div>; // Renderiza un estado de carga si cursoActual es undefined
  }




  const onClickRetroceder = () => {
    //console.log('Estos son los parámetros en onClickRetroceder:', seccionActual, cursoActualHook)
    previuosLesson !== '' &&
      router.push(`/leccion/${previuosLesson}`)
  }

  const onClickAvanzar = async () => {
    const route = getNextLeccionRoute(seccionActual!, cursoActualHook!)
    if (!route) {
      return;
    }
    //actualiza el numero de lección en la db
    await updateUltimaLeccionPorUsuario({ numLeccion: numLeccion! })
      router.push(route)
  }


  return (
    <div className="flex gap-9 mt-[48px] max-phone:flex-col justify-center max-phone:items-center w-full">
      <button
        onClick={onClickRetroceder}
        className={cn('flex overflow-hidden gap-3 justify-between items-center py-3 px-8 w-64 bg-pink-600 rounded-2xl min-h-[50px] min-w-[240px] max-md:px-5 text-2xl text-white', { 'hidden': previuosLesson === '' })}>
        <img loading="lazy" src='/iconos/flecha-atras.svg' alt="" className="object-contain shrink-0 self-stretch my-auto aspect-[1.35] w-[27px]" />
        <span className="self-stretch my-auto font-lexend text-white-1">Retroceder</span>
      </button>
      <button
        onClick={onClickAvanzar}
        className='flex overflow-hidden gap-3 justify-between items-center py-3 px-8 w-64 bg-pink-600 rounded-2xl min-h-[60px] min-w-[240px] max-md:px-5 text-2xl text-white'>
        <span className="self-stretch my-auto font-lexend text-white-1">Avanzar</span>
        <img loading="lazy" src='/iconos/flecha-adelante.svg' alt="" className="object-contain shrink-0 self-stretch my-auto aspect-[1.35] w-[27px]" />
      </button>
    </div>
  );

};


export default BotonesNavegacion;