import { useCursoActualProvider } from '@/providers/CursoActualProvider';
import React from 'react'

function PruebaProvider() {

    const { cursoActual } = useCursoActualProvider();

    console.log(cursoActual)


  return (
    <div>
      <p>{cursoActual?.leccion}</p>
      <p>{cursoActual?.seccion}</p>
    </div>
  )
}

export default PruebaProvider
