import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import TarjetaIdea from './TarjetaIdea';
import BotonesNavegacion from './BotonesNavegacion';
import { Authenticated, Unauthenticated, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type ContentBodyProps =
    UbicacionSegunPath & { leccionId: Id<"lecciones"> }


const ContentBody = ({ leccionId, numLeccion, cursoActual }: ContentBodyProps) => {

    //trae los contenidos de esa lección
    const contenidoLeccion = useQuery(api.lecciones.getContenidoLeccion, { leccionId })
    !contenidoLeccion && (
        <p>Cargando contenido Leccion...</p>
    )
    const contenidos = contenidoLeccion?.contenido
    const imagenes = contenidoLeccion?.imgsUrl





    return (
        /* The align-self property overrides the container's align-items property. */
        <article className="font-manrope flex flex-col items-start max-phone:items-start w-full max-md:max-w-full">
            <Authenticated>
                {contenidos != undefined ?
                    <div className='w-full'>
                        {contenidos! &&
                            <div
                                dangerouslySetInnerHTML={{ __html: contenidos }}>

                            </div>
                        }

                       

                        
                    </div> : <p>Ups! No hay contenido disponible para esta lección</p>
                }
            </Authenticated>
            <Unauthenticated>
                <div className='flex flex-col h-[390px]'>
                    {/* {contenidos != undefined ?
                        
                        <p className="font-manrope -z-10 mt-12 max-w-full text-20 text-black w-[849px] h-[500px] overflow-ellipsis max-md:mt-10 max-md:max-w-full">
                            {contenidos!}
                        </p> : <p>Ups! No hay contenido disponible para esta lección</p>
                    } */}
                    <div className='relative -top-16 h-[300px] bg-gradient-to-t from-[#fcf3e3] z-50 items-center'></div>
                    <div className='flex flex-col'>
                        <p className='text-center font-lexend text-20'>Debes ingresar con tu usuario para seguir leyendo</p>
                        <Button
                            className='m-auto text-2xl rounded-2xl font-lexend my-5 bg-marca-pink p-7 text-white-1 font-semibold transition-all duration-500 hover:bg-black-1'>
                            <Link href='/sign-in' >Ingresar con usuario</Link>
                        </Button>
                    </div>
                </div>
            </Unauthenticated>



            {/* {isMobile ? <TarjetaIdeaMov /> :  */}
            <TarjetaIdea leccionId={leccionId} />
            <BotonesNavegacion numLeccion={numLeccion} cursoActual={cursoActual} />

        </article>

    );

};


export default ContentBody;