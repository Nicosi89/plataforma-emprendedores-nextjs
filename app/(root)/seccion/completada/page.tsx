'use client';
import CompletionMessage from '../../../../components/CompletionMessage';
import { Button } from '@/components/ui/button';
import { useCursoActualProvider } from '@/providers/CursoActualProvider';
import { getNextSeccionRoute } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import SocialShareButtons from '@/components/SocialShareButtons';
import Header from '@/components/Header';



const CompletionSection = () => {

  const router = useRouter()
  const { cursoActual } = useCursoActualProvider();
  if (!cursoActual) {
    return <div>Cargando...</div>; // Mostrar un estado de carga si los datos no están listos
  }

  const onClickAvanzar = async () => {
    const route = getNextSeccionRoute(cursoActual!)
    if (!route) {
      return;
    }
    //actualiza el numero de lección en la db
    router.push(route)
  }

  return (
    <main className="flex overflow-hidden items-start bg-white">
      <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px] max-md:max-w-full">
      <Header isLeccion={false} />
        <section className="flex gap-9 overflow-hidden relative flex-col py-16 w-full max-md:max-w-full">
          <CompletionMessage mensajePrincipal='Has completado la sección:' routeImagen='/dazzle-line-team-celebrating-success-of-a-work-project_1-transformed.png' sectionName={cursoActual.seccion} />
          <div className="flex z-0 flex-col justify-center items-center self-center mt-10 max-w-full w-[559px] max-md:mt-10">
            <p className="text-2xl text-center font-inter max-md:max-w-full">
              Estas un paso más cerca de llevar tu negocio al siguiente nivel, 🚀 comparte este gran logro en tus redes
            </p>
            <SocialShareButtons />
          </div>

          <Button onClick={onClickAvanzar}
            className='m-auto text-2xl font-lexend my-5 bg-marca-pink p-7 text-white-1 font-semibold transition-all duration-500 hover:bg-black-1'>
            Siguiente sección
          </Button>
        </section>
      </div>
    </main>

  );
};

export default CompletionSection;