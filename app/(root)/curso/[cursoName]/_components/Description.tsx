const Description = ({ 
  descripcion }
  : {descripcion: string | undefined}) => {
  return (
    <p className="overflow-hidden mt-5 mb-20 max-w-full text-3xl text-center text-black w-[849px] max-md:mt-10 max-md:max-w-full text-[25px]">
      {descripcion ?? ''}
    </p>
  );

};


export default Description;