import Image from 'next/image';

const HeaderSection = ({seccionName, imgUrl}: {seccionName: string, imgUrl: string | undefined }) => {

  return (

    <section className="flex overflow-hidden flex-wrap gap-10 justify-center items-center self-stretch px-32 w-full text-5xl font-medium text-black whitespace-nowrap bg-white min-h-[425px] max-md:px-5 max-md:max-w-full">
     <div className='flex flex-col gap-4'>
        <h1 className="self-start my-auto w-[300px] font-lexend text-[33px] font-normal text-start">Sección:</h1>
        <h1 className="self-start my-auto w-[350px] font-lexend text-[35px] text-start">{seccionName}</h1>
      </div>
      {!imgUrl ? (

        <Image loading="lazy" src="/dazzle-line-girl-raised-her-finger 1 -r.png" width={300} height={200} alt="Principles illustration" className="object-contain self-stretch my-auto aspect-[1.45] min-w-[240px] w-[368px]" />
      ) : 
      <Image loading="lazy" src={imgUrl} width={300} height={200} alt="Principles illustration" className="object-contain self-stretch my-auto aspect-[1.45] min-w-[240px] w-[368px]" />
      
      }
    </section>

  );

};


export default HeaderSection;