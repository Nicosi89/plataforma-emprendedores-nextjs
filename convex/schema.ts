import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  cursos: defineTable({
    nombreCurso: v.string(),
    route: v.string(),
    descripcion: v.optional(v.string()),
    imagenUrl: v.optional(v.string())

  }).index(('by_name'), ['nombreCurso']),

  lecciones: defineTable({
    numLeccion: v.number(),
    author: v.optional(v.string()),
    nombreLeccion: v.string(),
    description: v.string(),
    imgUrl: v.string(),
    seccionId: v.id('secciones'),
    route: v.string(),
    isBloqueada: v.optional(v.boolean()),
    isCompletada: v.optional(v.boolean()),
  })
    .index(('by_route'), ['route'])
    .index(('by_seccionId'), ['seccionId']),

  secciones: defineTable({
    nombreSeccion: v.string(),
    description: v.string(),
    imgUrl: v.optional(v.string()),
    contenido: v.optional(v.string()),
    cursoId: v.id('cursos'),
    route: v.string(),


  })
    .index(('by_cursoId'), ['cursoId'])
    .index(('by_route'), ['route']),

  contenidosLecciones: defineTable({
    videoStorageId: v.optional(v.id('_storage')),
    leccionId: v.id('lecciones'),
    authorId: v.optional(v.string()),
    contenido: v.optional(v.string()),
    imgsUrl: v.array(v.string()),
    videosUrl: v.optional(v.array(v.string()))
  }).index(('by_leccionId'), ['leccionId'])
  ,
  comentariosLeccion: defineTable({
    leccionId: v.id('lecciones'),
    autor: v.id('users'),
    contenido: v.string(),

  }),
  formatosLecciones: defineTable({
    leccionId: v.id('lecciones'),

  }),

  ultimaLeccion: defineTable({
    userId: v.id('users'),
    numLeccion: v.number(),
  }).index('by_userId', ['userId']),




  users: defineTable({
    email: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    name: v.string(),
    role: v.union(v.literal("admin"), v.literal("estudiante"))
  }),

  infoAdicionalUsers: defineTable({
    userId: v.id('users'),
    nombreCompleto: v.optional(v.string()),
    edad: v.optional(v.string()),
    paisResidencia: v.optional(v.string()),
    nombreProyecto: v.optional(v.string()),
    tipoProyecto: v.optional(v.string()),
    sectorProyecto: v.optional(v.string()),
    tiempoProyecto: v.optional(v.string()),
  }).index('by_userId', ['userId']),

  pagos: defineTable({
    user: v.id('users'),

  }),
  emprendientos: defineTable({
    nombreCompleto: v.string(),
    imgUrl: v.string(),
    desde: v.optional(v.string()),
    rangoVentas: v.optional(v.string()),
    numEmpleados: v.optional(v.number()),
    camaraComercio: v.optional(v.boolean())
  }),
  tarjetasRepaso: defineTable({
    leccionId: v.id('lecciones'),
    contenido: v.string(),

  }),
  tarjetasQuiz: defineTable({
    leccion: v.id('lecciones'),
    pregunta: v.string(),
    opciones: v.array(v.string())

  }),
  desafios: defineTable({
    leccion: v.id('lecciones'),
    contenido: v.string(),
    imgsUrl: v.array(v.string()),

  }),
  comentariosDesafio: defineTable({
    desafio: v.id('desafios'),
    autor: v.id('users'),
    contenido: v.string()
  }),
  ubicaciones: defineTable({
    leccion: v.id('lecciones'),
    emprendedor: v.id('emprendedores')
  })

})