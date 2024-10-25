import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

const Page = () => {
  return (
    <div className=' flex max-md:flex-col w-full h-screen justify-between '>
      <div className='flex flex-1 max-phone:py-9 justify-center items-center gap-3 mx-10'>

        <SignIn
          appearance={{
            elements: {
              card: 'bg-white-1',
              footerActionLink: 'text-white-1',
              footer: 'bg-black',
              headerTitle: 'font-lexend text-2xl text-black',
              headerSubtitle: 'text-md text-black',
              socialButtonsProviderIcon: 'w-[40px]',
              rootBox: 'py-9',
              formFieldLabel: 'text-black',
              dividerText: 'text-black'
            }

          }
          }
        />
      </div>
      <div className='bg-marca-pink flex-1 flex items-center'>
        <Image
          src='/dazzle-line-online-language-learning 1.png'
          alt='bienvienida'
          width={600}
          height={600}

        />
      </div>

    </div>

  )
}

export default Page