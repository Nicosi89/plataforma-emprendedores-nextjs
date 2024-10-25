import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getDataCursos = query({
    handler: async (ctx) => {

        let cursosData: CursosData = [];
        const cursos = await ctx.db.query("cursos").collect();

        for (const curso of cursos) {
            // Ejecutamos las consultas para las secciones por cada curso y las esperamos con collect()

            const seccionesPorCurso =
                await ctx.db
                    .query('secciones')
                    .withIndex('by_cursoId', (q) => q.eq('cursoId', curso._id))
                    .collect(); // Ejecuta la consulta y devuelve los resultados

            let seccionesCompletas: Seccion[] = []

            for (const seccion of seccionesPorCurso) {
                const leccionesPorSeccion =
                    await ctx.db
                        .query('lecciones')
                        .withIndex('by_seccionId', (q) => q.eq('seccionId', seccion._id))
                        .collect(); // Ejecuta la consulta y devuelve los resultados


                seccionesCompletas.push({
                    ...seccion,
                    lecciones: leccionesPorSeccion
                })

            }


            const nuevoCurso = {
                ...curso,
                secciones: seccionesCompletas
            }
            cursosData.push(nuevoCurso)


        }
        return cursosData
    }
});


export const getLecciones = query({
    handler: async (ctx) => {
        return await ctx.db.query('lecciones').collect()
    },

})
export const getSecciones = query({
    handler: async (ctx) => {
        return await ctx.db.query('secciones').collect()
    },

})
export const getCursos = query({
    handler: async (ctx) => {
        return await ctx.db.query('cursos').collect()
    },

})

export const getContenidoLeccion = query({
    args: {
        leccionId: v.id('lecciones')
    },
    handler: async (ctx, args) => {
        const contenidoLeccion = await ctx.db.query('contenidosLecciones')
            .withIndex('by_leccionId',
                (q) => q.eq('leccionId', args.leccionId))
            .unique()

        return contenidoLeccion
    }


})
//se invoca en el la página de la lección para actualizarlo cada vez que se 
export const updateUltimaLeccionPorUsuario = mutation({
    args: {
        numLeccion: v.number()
    },
    handler: async (ctx, args) => {
        //usuario
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

        //trae la leccion que coincie con el numero de la leccion
        const leccionSiguiente = await ctx.db
            .query('lecciones')
            .filter((q) => q.eq(q.field('numLeccion'), args.numLeccion))
            .first()


        //inserta el nuevo record en última leccion
        await ctx.db.insert('ultimaLeccion', {
            userId: user[0]._id,
            numLeccion: leccionSiguiente?.numLeccion! + 1,
        })

    }
})
/* export const updateIsCompletedLeccion = mutation({
    args: 
}) */
export const getUltimaLeccionPorUsuario = query({
    args: { isAuthenticated: v.boolean() },
    handler: async (ctx, args) => {
        if (args.isAuthenticated) {
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

            const ultimaLecciones = await ctx.db.query('ultimaLeccion')
                .withIndex(
                    'by_userId',
                    (q) => q.eq('userId', user[0]._id))
                .collect()

            console.log('ultimasLecciones en Lecciones', ultimaLecciones)

            if (!ultimaLecciones) {
                throw new ConvexError("Ultima lección no encontrada");
            }

            //obtiene la última lección (con el númerodeLeccion más alto)
            if (ultimaLecciones.length) {
                const ultimaLeccion = ultimaLecciones.reduce((max, leccionActual) =>
                    leccionActual.numLeccion > max.numLeccion ? leccionActual : max
                )
                return ultimaLeccion
            } else {
                return;
            }

        } else {
            return;
        }
    }
})


export const getTarjetaRepasoLeccion = query({
    args: { leccionId: v.id('lecciones') },
    handler: async (ctx, args) => {
        const tarjetasLeccionActual = await ctx.db.query('tarjetasRepaso')
            .filter(q => q.eq(q.field('leccionId'), args.leccionId)).unique()


        return tarjetasLeccionActual


    }
})

