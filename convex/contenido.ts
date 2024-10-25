import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";


export const createContenidoLeccion = mutation({
    args: {
        /* videoStorageId: v.optional(v.id('_storage')),
        videoUrl: v.string(),
         */
        leccionId: v.id('lecciones'),
        contenido: v.string(),
        imgsUrl: v.array(v.string())
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new ConvexError("User not authenticated");
        }

        const user = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("email"), identity.email))
            .collect();

        if (user.length === 0) {
            throw new ConvexError("User not found");
        }

        return await ctx.db.insert("contenidosLecciones", {
            //videoStorageId: args.videoStorageId,
            leccionId: args.leccionId,
            authorId: user[0].clerkId,
            contenido: args.contenido,
            imgsUrl: args.imgsUrl
        })
    }
})




export const createNuevoCurso = mutation({
    args: {

        nombreCurso: v.string(),
        route: v.string(),
        descripcion: v.string(),
        imagenUrl: v.string()

    },
    handler: async (ctx, args) => {

        return await ctx.db.insert("cursos", {
            nombreCurso: args.nombreCurso,
            route: args.route,
            descripcion: args.descripcion,
            imagenUrl: args.imagenUrl
        })
    }
})
export const createNuevaSeccion = mutation({
    args: {

        nombreSeccion: v.string(),
        description: v.string(),
        imgUrl: v.optional(v.string()),
        contenido: v.optional(v.string()),
        cursoId: v.id('cursos'),
        route: v.string(),

    },
    handler: async (ctx, args) => {

        return await ctx.db.insert("secciones", {
            nombreSeccion: args.nombreSeccion,
            route: args.route,
            description: args.description,
            imgUrl: args.imgUrl,
            cursoId: args.cursoId
        })
    }
})
export const createNuevaLeccion = mutation({
    args: {

        numLeccion: v.number(),
        nombreLeccion: v.string(),
        description: v.string(),
        imgUrl: v.string(),
        route: v.string(),
        seccionId: v.id('secciones'),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("lecciones", {
            nombreLeccion: args.nombreLeccion,
            route: args.route,
            description: args.description,
            imgUrl: args.imgUrl,
            seccionId: args.seccionId,
            numLeccion: args.numLeccion
        })
    }
})

export const getUrl = mutation({
    args: {
        storageId: v.id("_storage"),
    },
    handler: async (ctx, args) => {
        return await ctx.storage.getUrl(args.storageId);
    },
});

export const getDescripcionSeccion = query({
    args: {
        nombreSeccion: v.string()
    },
    handler: async (ctx, args) => {
        const idSeccionActual = ctx.db.query('secciones')
            .withIndex('by_route', (q) => q.eq('route', args.nombreSeccion))

    }
})

