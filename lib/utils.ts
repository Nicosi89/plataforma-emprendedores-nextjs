import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



const getIndexLeccionActual = (seccionActual?: Seccion, leccionActual?: string) => {

  const indexoLeccionActual = seccionActual?.lecciones.findIndex(leccion => leccion.route === leccionActual);
  return indexoLeccionActual
}

const getIndexSeccionActual = (cursoActual?: CursoActual) => {
  //console.log(`posicion 1 de secciones: ${cursoActual.curso.secciones[1].nombreSeccion}`)
  const indexoLeccionActual = cursoActual?.curso.secciones.findIndex(seccion => seccion.route === cursoActual.seccionRoute);
  return indexoLeccionActual
}

//obtiene la seccion del curso actual
export const getSeccioneCursoActual = (cursoActual: CursoActual | undefined) => {
  const secciones = cursoActual?.curso.secciones;
  return secciones?.find(seccion => seccion.nombreSeccion === cursoActual!.seccion);
}



export const getNextLeccionRoute = (seccionActual?: Seccion, cursoActual?: CursoActual) => {
  //console.log('seccionActual en ffunción getNextLeccionRoute', seccionActual)
  //console.log('cursoActual en ffunción getNextLeccionRoute', cursoActual)
  //console.log('indexLeccionActual en función getNextLeccionRoute', indexLeccionActual)
  const indexLeccionActual = getIndexLeccionActual(seccionActual, cursoActual?.leccionRoute)

  if (indexLeccionActual) {
    if (indexLeccionActual !== seccionActual!.lecciones.length - 1) {
      //console.log('index', indexLeccionActual, 'length', seccionActual.lecciones.length)
      return `/leccion/${seccionActual!.lecciones[indexLeccionActual! + 1].route}`
    } else {
      return `/seccion/completada`
    }
    return;
  }
  return;
}
export const getPreviousLeccionRoute = (seccionActual?: Seccion, cursoActual?: CursoActual) => {
  const leccionActual = seccionActual?.lecciones.find(leccion => leccion.route === cursoActual!.leccionRoute);
  //se ecuentra el index de la lección
  const indexLeccionActual = seccionActual?.lecciones.findIndex(leccion => leccion.route === leccionActual?.route);
  console.log('index en getPreviousLeccionRoute', indexLeccionActual)
  if (indexLeccionActual) {
    if (indexLeccionActual !== 0) {
      return seccionActual!.lecciones[indexLeccionActual - 1].route
    }
    return;
  }
  return
}


//SeccionActual es la seccion en la que se encuentra actualmente según el path
//esta función determina las lecciones bloqueadas
export const getLeccionCompletadas = (seccionActual: Seccion | undefined, numLeccionActual: number) => {
  //const numLeccionActual = getNumLeccionActual(seccionActual!, leccionActual)


  return seccionActual!.lecciones.map((leccion) => {
    console.log(leccion.nombreLeccion, leccion.numLeccion, numLeccionActual)
    if (leccion.numLeccion > numLeccionActual!) {
      return {
        title: leccion.nombreLeccion,
        description: leccion.description,
        isLocked: true,
        route: leccion.route
      };
    }
    return {
      title: leccion.nombreLeccion,
      description: leccion.description,
      isLocked: false,
      route: leccion.route

    };
  }



  );
}
//esta función saca todas las lecciones para mostrar cuando no hay usuario 
export const getAllLecciones = (seccionActual: Seccion | undefined) => {
  //const numLeccionActual = getNumLeccionActual(seccionActual!, leccionActual)
  return seccionActual!.lecciones.map((leccion) => {
    //console.log(leccion.nombreLeccion, leccion.numLeccion)
    return {
      title: leccion.nombreLeccion,
      description: leccion.description,
      isLocked: false,
      route: leccion.route
    };
  }
  );
}

export const getNextSeccionRoute = (cursoActual: CursoActual) => {
  console.log('se ejecuta getNextSeccionRoute')
  const indexSeccionActual = getIndexSeccionActual(cursoActual)
  console.log('index en curtso.secciones', indexSeccionActual, 'length', cursoActual.curso.secciones.length)
  if (indexSeccionActual !== cursoActual.curso.secciones.length - 1) {
    return `/seccion/${cursoActual.curso.secciones[indexSeccionActual! + 1].route}`
  } else {
    return `/curso/completado`
  }
}