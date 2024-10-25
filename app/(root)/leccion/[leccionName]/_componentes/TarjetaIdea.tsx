import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Authenticated, useQuery } from "convex/react";
import Image from "next/image";
import { useRef } from "react";
import { toPng } from 'html-to-image';
import html2canvas from 'html2canvas';

function TarjetaIdea({ leccionId }: { leccionId: Id<'lecciones'> }) {

    const tarjetaLeccion = useQuery(api.lecciones.getTarjetaRepasoLeccion, { leccionId })

    const tarjetaRef = useRef(null);

    console.log('TarjetaLeccion en TarejtaIdea', tarjetaLeccion)

    if (!tarjetaLeccion) {
        return <></>
    }


    const handleDownloadImage = () => {

        console.log('handleDownloadImage y el valor tarjetaRef es:', tarjetaRef)

        if (tarjetaRef.current === null) {
            return;
        }

        setTimeout(() => {
            toPng(tarjetaRef.current!)
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.href = dataUrl;
                    link.download = 'tarjeta-leccion.png';
                    link.click();
                })
                .catch((err) => {
                    console.error('Ocurrió un error al generar la imagen', err);
                });

        }, 100)
    }

    const handleShareImage = () => {
        if (tarjetaRef.current === null) {
          return;
        }
    
        // Generar el dataUrl desde html2canvas dentro de esta función. Este paquete convierte un elemento  del DOM en un archivo
        html2canvas(tarjetaRef.current, { scale: 2 })
          .then((canvas) => {
            const dataUrl = canvas.toDataURL('image/png');
    
            // Convertir el dataUrl a un blob para compartir
            fetch(dataUrl)
              .then((res) => res.blob())
              .then((blob) => {
                const file = new File([blob], `tarjeta-leccion-${leccionId}.png`, { type: 'image/png' });
    
                if (navigator.share) {
                  navigator
                    .share({
                      files: [file],
                      title: 'Resumen de la lección',
                      text: 'Aquí tienes un resumen de mi lección',
                    })
                    .then(() => console.log('Compartido con éxito'))
                    .catch((err) => console.error('Error al compartir:', err));
                } else {
                  alert('La función de compartir no está soportada en tu navegador.');
                }
              });
          })
          .catch((err) => {
            console.error('Ocurrió un error al generar la imagen', err);
          });
      };
    



    return (
        <Authenticated>

            <div ref={tarjetaRef}
                className="flex overflow-hidden flex-col mt-12 justify-between rounded-3xl border-2 border-black border-solid max-w-[889px] shadow-[10px_10px_4px_rgba(0,0,0,1)]"
            >
                <div className="flex flex-col w-full h-full font-semibold text-white min-h-[54px] max-md:max-w-full">
                    <div className="flex max-phone:flex-col flex-wrap gap-10 max-phone:gap-3 max-phone:py-3 justify-between items-center px-5 w-full bg-pink-600 min-h-[54px] max-md:max-w-full">
                        <div className="self-stretch font-lexend my-auto text-3xl text-white-1">
                            QUE BUENA IDEA
                        </div>
                        <div
                            className="flex gap-3 items-start self-stretch my-auto text-xl whitespace-nowrap" >
                            
                            <Image
                            onClick={handleShareImage}
                                src="/iconos/flecha-compartir.svg"
                                className="flex relative shrink-0 w-8 contain"
                                alt="descargar"
                                width={50}
                                height={50}
                            />
                            <Image
                            onClick={handleDownloadImage}
                                src="/iconos/icons8-download-96.png"
                                className="flex relative shrink-0 w-8 contain"
                                alt="compartir"
                                width={50}
                                height={50}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 overflow-visible h-full gap-2.5 justify-center pl-5 text-2xl text-black size-full max-md:max-w-full bg-[#fcf3e3]">
                    <div className="flex overflow-visible h-full shrink gap-2.5 py-4 font-molengo flex-wrap">
                        {tarjetaLeccion?.contenido}
                    </div>
                    <Image
                        src="/dazzle-line-man-with-light-bulb-generating-ideas-1.png"
                        className="shrink max-phone:hidden"
                        alt="compartir"
                        width={800}
                        height={50}
                    />
                </div>
            </div>
        </Authenticated>
    );
}

export default TarjetaIdea