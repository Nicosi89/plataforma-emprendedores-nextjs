interface SidebarItemData {
    title: string;
    isActive?: boolean;
    subItems?: string[];
}


export const courseData = [

    { id: 1, width: '486px' },
    { id: 2, width: '586px' },
    { id: 3, width: '279px' },
    { id: 4, width: '794px' },
    { id: 5, width: '627px' },
    { id: 6, width: '446px' },
  
  ];

  export const sidebarItemsPerfil: SidebarItem[] = [
    { label: 'Configuraciones', route: 'config' },
    { label: 'Información general', route: 'info' },
    { label: 'Sesion', route: 'sesion' },
  ];
  
  export const sidebarItemsAdmin: SidebarItem[] = [
    { label: 'Crear nuevo Curso', route: 'nuevo-curso' },
    { label: 'Crear nueva Sección', route: 'nueva-seccion' },
    { label: 'Crear nuevo Lección', route: 'nueva-leccion' },
    { label: 'Crear nuevo Contenido Lección', route: 'nuevo-contenidol' },
  ];
  


export const mobileSidebarLinks = [
    {
        imgURL: "/iconos/icons8-home-96.png",
        route: "/",
        label: "Principal",
    },
    {
        imgURL: "/iconos/icons8-male-user-96.png",
        route: "/perfil",
        label: "Perfil",
    },
    
];


export const paises = [
    "Argentina", "Bolivia", "Brasil", "Chile", "Colombia", 
  "Costa Rica", "Cuba", "Ecuador", "El Salvador", "España", 
  "Guatemala", "Honduras", "México", "Nicaragua", "Panamá", 
  "Paraguay", "Perú", "Puerto Rico", "República Dominicana", 
  "Uruguay", "Venezuela"
]

export const tipoProyecto = [
    "Servicios",
    "Productos",
    "Ayuda (fundación)"
]

export const sectoresProyecto = [
    "No lo sé, no lo tengo claro",
    "Agricultura", 
    "Ganadería", 
    "Pesca", 
    "Minería", 
    "Silvicultura", 
    "Manufactura", 
    "Construcción", 
    "Industria química", 
    "Industria automotriz", 
    "Producción de energía", 
    "Comercio y restaurantes", 
    "Turismo", 
    "Finanzas", 
    "Telecomunicaciones", 
    "Transporte", 
    "Educación", 
    "Salud", 
    "Servicios profesionales", 
    "Tecnologías de la información", 
    "Cooperativa",
    "Fundación sin ánimo de lucro"
  ];

  export const tiempoProyecto = [
    "Hasta ahora solo la idea",
    "Menos de un (1) año",
    "Entre un año y tres (3)",
    "Más de tres (3) años"
  ]



