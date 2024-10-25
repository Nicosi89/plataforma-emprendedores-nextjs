// se definen los endpoins y tmb se pueden definer aquí las llamadas webhook
// el flujo es así se crea un clerk user -> clerk envía info del usuario
//se llama la función users.create -> guarda en la base datos
// ===== reference links =====
// https://www.convex.dev/templates (open the link and choose for clerk than you will get the github link mentioned below)
// https://github.dev/webdevcody/thumbnail-critique/blob/6637671d72513cfe13d00cb7a2990b23801eb327/convex/schema.ts
//este archivo http es un endpoint que se encarga de recibir los webhooks
import type { WebhookEvent } from "@clerk/nextjs/server";
import { httpRouter } from "convex/server";
import { Webhook } from "svix";

import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";

//este hook va a ser llamado una vez un usuario se autentique a traves del login
const handleClerkWebhook = httpAction(async (ctx, request) => {
  const event = await validateRequest(request);
  if (!event) {
    return new Response("Invalid request", { status: 400 });
  }
  switch (event.type) {
    //estas funciones conectan la petición con la función que se desea que haga 
    case "user.created":
      //se inserta el usuario de clerk en la base de datos
      await ctx.runMutation(internal.users.createUser, {
        clerkId: event.data.id,
        email: event.data.email_addresses[0].email_address,
        imageUrl: event.data.image_url,
        name: event.data.first_name!,
      });
      break;
      
    case "user.updated":
      await ctx.runMutation(internal.users.updateUser, {
        clerkId: event.data.id,
        imageUrl: event.data.image_url,
        email: event.data.email_addresses[0].email_address,
      });
      break;
    case "user.deleted":
      await ctx.runMutation(internal.users.deleteUser, {
        clerkId: event.data.id as string,
      });
      break;
  }
  return new Response(null, {
    status: 200,
  });
});
//TODO: Antes de usar los webhooks si o si se debe añadir el webhook secret
//en el dashboard de convex: Para eso:
//1. Se debe ir a Dashboard/webhooks/añadir nuevo endpoint que se construye aspi: host.covex.site/clerk
//2. Se agrega la variable CLERK_WEBHOOK_SECRET con el valor de la clave secreta que nos dda clerk
//3. No se escuchará los cambios directamente en nuestro lado sino que convex lo hará por nostros, por lo que 
//se debe hacer en la sección de enviromental variables del modo development del dashboard del proyecto 

//endpoint config en el que clerk escucha todos los eventos que suceden con el usuario
const http = httpRouter();

http.route({
  path: "/clerk",
  method: "POST",
  handler: handleClerkWebhook,
});

const validateRequest = async (
  req: Request
): Promise<WebhookEvent | undefined> => {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET!;
  if (!webhookSecret) {
    throw new Error("CLERK_WEBHOOK_SECRET is not defined");
  }
  const payloadString = await req.text();
  const headerPayload = req.headers;
  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id")!,
    "svix-timestamp": headerPayload.get("svix-timestamp")!,
    "svix-signature": headerPayload.get("svix-signature")!,
  };
  const wh = new Webhook(webhookSecret);
  const event = wh.verify(payloadString, svixHeaders);
  return event as unknown as WebhookEvent;
};

export default http;
