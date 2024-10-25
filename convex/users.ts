import { internalMutation, mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";


//función en el servidor para crear un nuevo usuario
export const createUser = internalMutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    imageUrl: v.string(),
    name: v.string(),
    role: v.union(v.literal("admin"), v.literal("estudiante"))
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("users", {
      clerkId: args.clerkId,
      email: args.email,
      imageUrl: args.imageUrl,
      name: args.name,
      role: args.role
    });
  },
});



export const getCurrentUser = query({
  args: {isAuthenticated: v.boolean()},
  handler: async (ctx, args) => {
    if(!args.isAuthenticated){
      return;
    }
    console.log('se ejecuta la función getCurrentUser')
    const identity = await ctx.auth.getUserIdentity();
    
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), identity!.email))
      .unique();
  },
});

export const updateUser = internalMutation({
  args: {
    clerkId: v.string(),
    imageUrl: v.string(),
    email: v.string(),
  },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.patch(user._id, {
      imageUrl: args.imageUrl,
      email: args.email,
    });


  },
});

export const deleteUser = internalMutation({
  args: { clerkId: v.string() },
  async handler(ctx, args) {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.delete(user._id);
  },
});

export const insertarInfoBasicaUser = mutation({
  args: {
    nombreCompleto: v.string(),
    nombreProyecto: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const identity = await ctx.auth.getUserIdentity();

      if (!identity) {
        throw new ConvexError("User not authenticated");
      }

      const user = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("email"), identity.email))
        .unique();

      if (!user) {
        throw new ConvexError("User not found");
      }

      const infoAdicionalUser = await ctx.db
        .query("infoAdicionalUsers")
        .withIndex('by_userId', (q) =>
          q.eq('userId', user._id))
        .unique()


      if (!infoAdicionalUser) {
        return ctx.db.insert('infoAdicionalUsers', {
          nombreCompleto: args.nombreCompleto,
          nombreProyecto: args.nombreProyecto,
          userId: user._id
        })
      }

      return ctx.db.patch<'infoAdicionalUsers'>(infoAdicionalUser._id!, {
        nombreCompleto: args.nombreCompleto,
        nombreProyecto: args.nombreProyecto
      })
    } catch (error) {
      console.log('Error al guardar la info adicional usuario:', error)
    }
  }
})

export const insertarInfoAdicionalUser = mutation({
  args: {
    nombreCompleto: v.string(),
    edad: v.string(),
    paisResidencia: v.string(),
    nombreProyecto: v.string(),
    tipoProyecto: v.string(),
    sectorProyecto: v.string(),
    tiempoProyecto: v.string(),
  },
  handler: async (ctx, arg) => {
    try {
      const identity = await ctx.auth.getUserIdentity();

      if (!identity) {
        throw new ConvexError("User not authenticated");
      }

      const user = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("email"), identity.email))
        .unique();

      if (!user) {
        throw new ConvexError("User not found");
      }

      return await ctx.db.insert('infoAdicionalUsers', {
        userId: user._id,
        nombreCompleto: arg.nombreCompleto,
        edad: arg.edad,
        paisResidencia: arg.paisResidencia,
        nombreProyecto: arg.nombreProyecto,
        tipoProyecto: arg.tipoProyecto,
        sectorProyecto: arg.sectorProyecto,
        tiempoProyecto: arg.tiempoProyecto,
      })
    } catch (error) {
      console.log('Error al guardar la info adicional usuario:', error)
    }
  }
}

) 