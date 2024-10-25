import Image from 'next/image';
import Link from 'next/link';


const SidebarItem: React.FC<SidebarItemProps> = ({ seccion, seccionActual, seccionAMostrar, setSeccionAMostrar, leccionActual }) => {

    //console.log('Nombre de seccion a mostrar en SideBaritem', seccion.)
    //console.log('Lecciones de seccion a mostrar en SideBaritem', seccion.lecciones[0].nombreLeccion)

    const isActiveSeccion = seccion.nombreSeccion === seccionActual
    const isSeccionAMostrar = seccion.route === seccionAMostrar

    const onClickSeccion = () => {
        if (seccionAMostrar) {
            setSeccionAMostrar(undefined)
        } else {
            setSeccionAMostrar(seccion.route)
        }
    }

    return (
        <div className={`flex overflow-hidden ${isSeccionAMostrar ? 'flex-col' : ''} gap-8 justify-between items-center py-2.5 w-full ${isActiveSeccion ? 'font-medium text-black bg-white' : ''} rounded-lg ${!isActiveSeccion ? 'mt-2' : ''}`}>
            <div
                onClick={onClickSeccion}
                className={`flex self-stretch my-auto font-lexend ${isActiveSeccion ? 'bg-white-1 px-5 w-full py-3 rounded-lg justify-between' : 'justify-between w-full'}`}>
                {seccion.nombreSeccion}
                {isSeccionAMostrar && (
                    <Image width="14" height="10" loading="lazy" src="/iconos/icono-contraer-blanco.svg" className={`object-contain shrink-0 self-stretch my-auto w-3.5 aspect-[1.4]`} alt="" />
                )}
                {isActiveSeccion && !isSeccionAMostrar && (
                    /* ampliar */
                    <Image width="14" height="10" loading="lazy" src="/iconos/icono-ampliar.svg" className={`object-contain shrink-0 self-stretch my-auto w-3.5 aspect-[1.4]`} alt="" />

                )}
                {isActiveSeccion && isSeccionAMostrar && (
                    /* ampliar */
                    <Image width="14" height="10" loading="lazy" src="/iconos/icono-contraer.svg" className={`object-contain shrink-0 self-stretch my-auto w-3.5 aspect-[1.4]`} alt="" />

                )}

                {!isActiveSeccion && !isSeccionAMostrar && (
                    <Image width="14" height="10" loading="lazy" src="/iconos/icono-ampliar-blanco.svg" className="object-contain shrink-0 self-stretch my-auto w-3.5 aspect-[1.4] fill-green-600" alt="" />
                )
                }
            </div>
            {/* //subitems */}
            {isSeccionAMostrar && seccion.lecciones && (
                <div className="flex gap-4 pl-5 w-full">
                    <div className="flex-1 shrink border-white border-solid basis-0 border-[3px]" />
                    <div className="flex flex-col self-start py-2.5 w-[230px]">
                        {seccion.lecciones.map((leccion, index) => {
                            console.log('Nombre de leccion en Sidebaritem', leccion.route)
                            const isLeccionActual = leccion.route === leccionActual
                            return (
                                <Link key={index} href={`/leccion/${leccion.route}`}>
                                    <div
                                        className={`${index > 0 ? 'mt-4' : ''} ${leccion.nombreLeccion === 'Reto' ? 'flex gap-2 items-center self-start whitespace-nowrap min-h-[20px] font-lexend text-white-1' : 'font-lexend text-white-1'}`}>
                                        <p className={`${isLeccionActual ? 'underline underline-offset-[4px] decoration-2' : ''}`}>{leccion.nombreLeccion}</p>
                                        {leccion.nombreLeccion === 'Reto' && (
                                            <Image width="14" height="10" loading="lazy" src="/iconos/icono-candado.svg" className="fill-white-1 object-contain shrink-0 self-stretch my-auto aspect-[0.94] w-[15px]" alt="" />
                                        )}
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>

    );

};


export default SidebarItem;