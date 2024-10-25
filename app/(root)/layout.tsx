'use client';
import MobileNav from "@/components/MobileNav";
import Image from "next/image";
import { Toaster } from "@/components/ui/toaster"
import useCursoActualInfoHook from "@/hooks/useCursoActualData";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCursoActualProvider } from "@/providers/CursoActualProvider";
import { useCurrentUserProvider } from "@/providers/CurrentUserProv";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { isAuthenticated } = useConvexAuth()

  console.log('usuario autenticado en RootLayout', isAuthenticated)

  //trae el objeto del cusuario actual
  const currentUser = useQuery(api.users.getCurrentUser, {isAuthenticated})
  const { setCurrentUser } = useCurrentUserProvider();
  //lo pone en el provider
  setCurrentUser(currentUser)



  //trae la data de cursos
  const dataCursos = useQuery(api.lecciones.getDataCursos)


  //trae la última lección del usuario según la propiedad de numLección más alta
  // Si no hay sesión, no se ejecutará la consulta.
  const ultimaLeccionUsuario = useQuery(
    api.lecciones.getUltimaLeccionPorUsuario,
    { isAuthenticated: isAuthenticated } // Si no hay sesión, pasa `null` o un valor que evite la consulta
  );

  console.log('ultima leccion en RootLayout:', ultimaLeccionUsuario)

  

  //hook para consiguir la data de la ruta actual según el path
  const cursoActualState = useCursoActualInfoHook({ numLeccion: ultimaLeccionUsuario?.numLeccion, dataCursos: dataCursos })

  const { setCursoActual } = useCursoActualProvider();

  // Verifica si la data está aún cargando o si ocurrió algún error
  if (!dataCursos) {
    return <div>Cargando cursos...</div>;
  }

  if (dataCursos instanceof Error) {
    return <div>Error al cargar los cursos: {dataCursos.message}</div>;
  }

  // trae la función del provider y actualiza el estado, sino hay sesion de usuario no se carga en el provider
  if (cursoActualState) {
    console.log('existe el CursoActualState del hook y actualiza el estado')
    setCursoActual(cursoActualState) //esto me bota error: Cannot update a component (`CursoProvider`) while rendering a different component (`Page`).
  }

  return (
    <main className="relative flex flex-col w-full">
      {/*  <LeftSidebar /> */}
      <section className="flex min-h-screen flex-1 flex-col">
        <div className="flex w-full max-w-[1500px] flex-col max-sm:px-4"> {/* /max-sm:px-4 */}
          {/* navigation bar en mobile */}
          <div className="flex h-16 items-center justify-between md:hidden max-sm:px-4">
            <Image
              src="/dazzle-line-rocket.png"
              width={30}
              height={30}
              alt="menu icon"
            />
            <MobileNav />
          </div>
          {/* child */}
          <div className="flex flex-col md:pb-14">
            <Toaster />
            {children}
          </div>
        </div>
      </section>

    </main>


  );
}

