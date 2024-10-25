const socialIcons = [

  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d44fc6f8812ad05ae45784f5f9fad41875f3a5506cd79bbfb71449f9840bf948?placeholderIfAbsent=true&apiKey=766188e82db8447f80ef64365a36c268", alt: "Social media icon 1" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0a18a6ad7e1c49de7be455567f2b229a2a3568b19bad8621937beee18b6b6d29?placeholderIfAbsent=true&apiKey=766188e82db8447f80ef64365a36c268", alt: "Social media icon 2" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d3bc29afc9764389e6f2ba9558eb9c490f9152e0b4010714beca47d0a581091a?placeholderIfAbsent=true&apiKey=766188e82db8447f80ef64365a36c268", alt: "Social media icon 3" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/59c47ffd15f7eb98bf7c3edf2b374299dce9f48fc9f944b18cecde0cd1c749ce?placeholderIfAbsent=true&apiKey=766188e82db8447f80ef64365a36c268", alt: "Social media icon 4" },

];


const SocialShareButtons: React.FC = () => {
  return (
    <div className="flex overflow-hidden gap-5 items-center px-12 mt-8 max-md:px-5">
      {socialIcons.map((icon, index) => (
        <button key={index} aria-label={`Share on ${icon.alt}`}>
          <img 
            loading="lazy" 
            src={icon.src} 
            alt={icon.alt}
            className="object-contain shrink-0 self-stretch my-auto aspect-square w-[50px]" 
          />
        </button>
        ))}
        </div>
          );
        };
    
    
    export default SocialShareButtons;