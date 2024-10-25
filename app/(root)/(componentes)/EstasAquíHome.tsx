import Link from "next/link";


function EstasAquiHome({ cursoActual }: { cursoActual: CursoActual | undefined }) {

    if (!cursoActual) {
        return <p className="font-lexend text-xl text-white-1">Aún no has empezado un curso</p>;
    }

    return (
        <div className="flex max-phone:flex-col flex-wrap gap-9 font-lexend text-marca-pink font-semibold text-3xl items-center">
            <Link href={`/curso/${cursoActual.curso.route}`}>
            <CuadroEstasAqui contenido={cursoActual.curso.nombreCurso!} titulo="Curso:" />
            </Link>
            <p className="text-white-1">{`>`}</p>
            <Link href={`/seccion/${cursoActual.seccionRoute}`}>
            <CuadroEstasAqui contenido={cursoActual.seccion} titulo="Sección:" />
            </Link>
           <p className="text-white-1">{`>`}</p>
           <Link href={`/leccion/${cursoActual.leccionRoute}`}>
           <CuadroEstasAqui contenido={cursoActual.leccion} titulo="Lección:" />
           </Link>
        </div >
    )
}


export default EstasAquiHome

const CuadroEstasAqui = ({ contenido, titulo }: { contenido: string, titulo: string }) => (
    <div className="flex flex-col text-center bg-white-1 rounded-[15px] p-8 w-[270px] h-[200px] justify-center gap-1">
        <p className="font-normal text-2xl">{titulo}</p>
        <p>{contenido}</p>
    </div>
)
