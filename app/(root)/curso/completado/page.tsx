'use client';
import CompletionMessage from '../../../../components/CompletionMessage'; import { Button } from '@/components/ui/button';
import { useCursoActualProvider } from '@/providers/CursoActualProvider';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { useRef } from 'react';
import { toPng } from 'html-to-image';
import html2canvas from 'html2canvas';
import { MdOutlineFileDownload } from "react-icons/md";
import { FaRegShareFromSquare } from "react-icons/fa6";


const CompletionCourse = () => {

  const router = useRouter()
  const { cursoActual } = useCursoActualProvider();
  const imagenRef = useRef(null);

  if (!cursoActual) {
    return <div>Cargando...</div>; // Mostrar un estado de carga si los datos no están listos
  }

  const onClickBoton = async () => {
    router.replace('/')
  }

  const handleDownloadImage = () => {

    console.log('handleDownloadImage y el valor tarjetaRef es:', imagenRef)

    if (imagenRef.current === null) {
      return;
    }



    setTimeout(() => {
      toPng(imagenRef.current!)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = 'tarjeta-leccion.png';
          link.click();
        })
        .catch((err) => {
          console.error('Ocurrió un error al generar la imagen', err);
        });

    }, 200)
  }

  const handleShareImage = () => {
    if (imagenRef.current === null) {
      return;
    }

    // Generar el dataUrl desde html2canvas dentro de esta función. Este paquete convierte un elemento  del DOM en un archivo
    html2canvas(imagenRef.current!, { scale: 2 })
      .then((canvas) => {
        const dataUrl = canvas.toDataURL('image/png');

        // Convertir el dataUrl a un blob para compartir
        fetch(dataUrl)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], `curso-completado-${cursoActual.curso.route}.png`, { type: 'image/png' });

            if (navigator.share) {
              navigator
                .share({
                  files: [file],
                  title: 'Nuevo curso completado!',

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
    <main className="flex overflow-hidden items-start bg-white">
      <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px] max-md:max-w-full">
        <Header 
          isLeccion={false} 
          isPerfil={false} 
          />
        <section className="flex gap-9 overflow-hidden relative flex-col py-16 w-full max-md:max-w-full">
          <CompletionMessage
            ref={imagenRef}
            mensajePrincipal='Has completado el curso:'
            routeImagen='/dazzle-line-team-celebrating-success-of-a-work-project_1-transformed.png'
            sectionName={cursoActual.curso.nombreCurso}
          />
          <div className="flex z-0 flex-col justify-center items-center self-center mt-10 max-w-full w-[559px] max-md:mt-10">
            <p className="text-2xl text-center font-inter max-md:max-w-full">
              Que bien has completado un curso más en tu formación como emprendedor(ra), y estás más cerca de llevar tu negocio al siguiente nivel. 🚀 Comparte este gran logro en tus redes
            </p>
            <div className='flex gap-3'>
              <Button onClick={handleDownloadImage}
                className='m-auto flex gap-3 rounded-[15px] text-xl font-lexend my-5 bg-marca-pink p-7 text-white-1 font-semibold transition-all duration-500 hover:bg-black-1'>
                <p>Descargar logro</p>
                <MdOutlineFileDownload
                  width={50}
                />
              </Button>
              <Button onClick={handleShareImage}
                className='m-auto flex gap-3 rounded-[15px] text-xl font-lexend my-5 bg-marca-pink p-7 text-white-1 font-semibold transition-all duration-500 hover:bg-black-1'>
                <p>Compartir logro</p>
                <FaRegShareFromSquare
                  width={50}
                />
              </Button>
            </div>
          </div>
          <Button onClick={onClickBoton}
            className='m-auto text-2xl rounded-[15px] font-lexend my-5 bg-marca-pink p-7 text-white-1 font-semibold transition-all duration-500 hover:bg-black-1'>
            Ir al inicio
          </Button>

        </section>
      </div>
    </main>

  );
};

export default CompletionCourse;