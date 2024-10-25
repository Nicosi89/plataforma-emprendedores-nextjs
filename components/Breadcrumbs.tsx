import Link from "next/link";


function Breadcrumbs({ cursoActual }: { cursoActual: CursoActual | undefined }) {

  if (!cursoActual) {
    return <p>No se ha seleccionado ninguna lección</p>;
  }

  return (
    <div className="flex flex-wrap w-full font-lexend text-marca-pink gap-2 font-semibold text-xl">

      <Link href={`/curso/${cursoActual.curso.route}`}><p>{cursoActual.curso.nombreCurso}</p></Link>
      <p>{`>`}</p>
      <Link href={`/seccion/${cursoActual.seccionRoute}`}><p>{cursoActual.seccion}</p></Link>
      <p>{`>`}</p>
      <p>{cursoActual.leccion}</p>
    </div>
  )
}

export default Breadcrumbs