/* import { mutation, query } from './_generated/server';

export const seedData = {
    videoStorageId: v.optional(v.id('_storage')),
    leccionId: v.id('lecciones'),
    author: v.string(),
    contenido: v.string(),
    imgsUrl: v.array(v.string())
}

export const create = mutation({
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        async function seedDataInserts(seedData, ctx) {
            await Promise.all(seedData.map(async (curso) => {
              const cursoId = await ctx.db.insert("cursos", {
                nombreCurso: curso.nombreCurso
              });
          
              await Promise.all(curso.secciones.map(async seccion => {
                const seccionId = await ctx.db.insert("secciones", {
                  contenido: seccion.contenido,
                  cursoId: cursoId,
                  description: "",
                  imgUrl: "",
                  nombreSeccion: seccion.nombreSeccion,
                });
          
                await Promise.all(seccion.lecciones.map(async leccion => {
                  await ctx.db.insert("lecciones", {
                    description: leccion.description,
                    imgUrl: leccion.imgUrl,
                    nombreLeccion: leccion.nombreLeccion,
                    route: leccion.route,
                    seccionId: seccionId,
                  });
                }));
              }));
            }));
          }
          
          // Llamada a la función
          seedDataInserts(seedData, ctx);
          
    }
})
 */


