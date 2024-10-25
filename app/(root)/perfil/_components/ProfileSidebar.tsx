import { sidebarItemsPerfil } from '@/utils/constants';
import Image from 'next/image';
import { SetStateAction } from 'react';


interface ProfileSidebarProps {
  user: Users;
  setTab: React.Dispatch<SetStateAction<string>>;
  tab: string
}

const ProfileSidebar = ({ tab, user, setTab }: ProfileSidebarProps) => {


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    console.log('se ejecuta el handle y este es el valor de event:', event.currentTarget.value)
    setTab(event.currentTarget.value)
  }

  return (
    <aside className="flex flex-col gap-5 justify-center items-center text-base font-semibold text-black min-w-[240px] w-[246px]">
      {!user ?
        <>
          <Image loading="lazy" width={65} height={65} src='/iconos/user-thumbnail.svg' className="object-cover self-center my-auto rounded-full aspect-square w-[75px] h-auto" alt="User profile" />
          <div className='flex flex-col items-center font-lexend'>

            <h2>No hay usuario logueado</h2>
          </div>
        </>
        : <>
          <Image loading="lazy" width={65} height={65} src={user.imageUrl!} className="object-cover self-center my-auto rounded-full aspect-square w-[75px] h-auto" alt="User profile" />
          <div className='flex flex-col items-center font-lexend'>
            <h2>{user.name}</h2>
            <h3>{user.email}</h3>

          </div>
        </>

      }

      <nav className="flex overflow-hidden flex-col p-2.5 mt-5 w-full max-w-[246px]">
        {sidebarItemsPerfil.map((item, index) => {
          const isSelected = item.route === tab
          return <button
            key={index}
            onClick={handleClick}
            value={item.route}
            className={`overflow-hidden gap-3.5 self-stretch px-4 py-2.5 w-full whitespace-nowrap rounded-lg ${isSelected ? 'bg-pink-600 text-white-1' : ''
              }`}
          >
            {item.label}
          </button>
        })}
      </nav>
    </aside>
  );
}

export default ProfileSidebar;