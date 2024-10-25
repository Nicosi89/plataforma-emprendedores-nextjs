'use client';
import ProfileSidebar from './_components/ProfileSidebar';
import ProfileForm from './_components/ProfileForm';
import Sesion from './_components/Sesion';
import Image from 'next/image';
import { useCurrentUserProvider } from '@/providers/CurrentUserProv';
import { useState } from 'react';
import Header from '@/components/Header';


const ProfilePage = () => {

  const [tab, setTab] = useState('info')
  const { currentUser } = useCurrentUserProvider()


  !currentUser && (
    <p>No hay usuario logueado</p>
  )

  const renderTabContent = (tab: string) => {
    switch (tab) {
      case 'config':
        return <p className='self-center text-center'>No hay usuario logueado</p>;
      case 'info':
        return !currentUser ? <p className='self-center text-center'>No hay usuario logueado</p> : <div><ProfileForm /></div>;
      case 'sesion':
        return !currentUser ? <Sesion isCerrarSesion={false}/> : <div><Sesion isCerrarSesion={true}/></div>;
      default:
        return <div>Selecciona una pestaña</div>;
    }
  };

  return (
    <main className="flex overflow-hidden items-start bg-white">
      <div className="flex flex-col flex-1 shrink w-full basis-0 min-w-[240px] max-md:max-w-full">
        <Header isLeccion={false} isPerfil={true}/>
        <section className="flex overflow-hidden flex-col justify-center py-10 w-full max-md:max-w-full">
          <h1 className="overflow-hidden gap-2.5 self-center px-24 text-4xl font-medium text-black whitespace-nowrap max-md:px-5">
            Perfil
          </h1>
          <div className="flex overflow-hidden flex-wrap gap-11 justify-start items-center px-64 py-16 w-full  max-md:px-5 max-md:max-w-full">
            <ProfileSidebar tab={tab} user={currentUser!} setTab={setTab} />
            {renderTabContent(tab)}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;