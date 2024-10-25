declare interface Curso {
  _id: Id<"cursos">;
  _creationTime: number;
  nombreCurso: string;
  secciones: Seccion[],
  route: string,
  descripcion?: string | undefined,
  imagenUrl?: string | undefined
}

declare interface Seccion {
  _id: Id<"secciones">;
  _creationTime: number;
  imgUrl?: string | undefined;
  description: string;
  nombreSeccion: string;
  contenido?: string;
  cursoId: Id<"cursos">;
  lecciones: Leccion[],
  route: string
}

declare type UbicacionSegunPath = {
  numLeccion: number,
  cursoActual: Curso[] | undefined
}
declare type ContentHeaderProps =
  ubicacionSegunPath & {
    leccionActual: Leccion;
  };

declare interface Leccion {
  _creationTime: number,
  _id: Id<"lecciones">,
  author?: string | undefined;
  description: string,
  imgUrl: string,
  nombreLeccion: string,
  route: string,
  seccionId: Id<"secciones">,
  isCompletada?: boolean,
  numLeccion: number

}

declare interface Users {
  _id?: Id<"users">;
  _creationTime?: number;
  email: string;
  imageUrl?: string;
  clerkId?: string;
  name: string;
  role: "admin" | "estudiante" | undefined
}

declare type CursoActual = {
  curso: Curso,
  seccion: string,
  leccion: string,
  leccionRoute: string,
  seccionRoute: string

}

declare type CursosData = Curso[] | undefined

declare interface LeccionContextType {
  cursoActual: CursoActual | undefined;
  setCursoActual: React.Dispatch<React.SetStateAction<CursoActual | undefined>>;
}
declare interface CurrentUserContextType {
  currentUser: Users | undefined | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<Users | undefined | null>>;
}

declare interface SidebarItemProps {
  seccion: Seccion;
  leccionActual: string;
  seccionActual: string | undefined;
  seccionAMostrar: string | undefined;
  setSeccionAMostrar: React.Dispatch<React.SetStateAction<string | undefined>>;

}

declare interface LessonCardProps {
  title: string;
  description: string;
  isLocked: boolean;
  route: string;
}
declare interface SessonCardProps {
  title: string;
  description: string;
  route: string;
  imageUrl: string | undefined;
}

declare interface BotonActionHomeProps {
  onClickHandler: () => void;
  label: string;
  isConUsuario: boolean;
}

declare interface CargarImagenesProps {
  setImgsUrl: Dispatch<SetStateAction<string>>;
  cantImgPermitidas?: number;
  //setVideoUrl: Dispatch<SetStateAction<string | undefined>>; 
}

declare interface MainContentProps {
  numLeccion: number;
  dataCursos: Curso[] | undefined;
  leccionActualState: Leccion;
}

declare interface SidebarItem {
  label: string;
  route: string
}

