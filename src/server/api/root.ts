import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { habbitRouter } from "./routers/habbit";
import { habbitEventRouter } from "./routers/habbitEvent";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  habbit: habbitRouter,
  habbitEvent: habbitEventRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
