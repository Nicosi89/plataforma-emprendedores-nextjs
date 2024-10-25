'use client';
import { Authenticated, Unauthenticated } from 'convex/react';
import HomeUsuario from './(componentes)/HomeUsuario';
import HomeSinusuario from './(componentes)/HomeSinusuario';
import Header from '@/components/Header';


const WelcomePage = () => {

  return (
    <main className="flex overflow-hidden items-center relative flex-col px-9 pt-1 pb-24 max-md:px-5">
      <Header isLeccion={false} isPerfil={false}/>
      <Authenticated>
        <HomeUsuario />
      </Authenticated>
      <Unauthenticated>
        <HomeSinusuario />
      </Unauthenticated>
    </main>
  );

};

export default WelcomePage


