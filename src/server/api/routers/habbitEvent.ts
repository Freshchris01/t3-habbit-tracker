import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const habbitEventRouter = createTRPCRouter({
    add: protectedProcedure
        .input(
            z.object({
                habbitId: z.string(),
								date: z.date()
            })
        )
        .mutation(async ({ ctx, input }) => {
            try {
                await ctx.prisma.habbitEvent.create({
                    data: {
                        habbitId: input.habbitId,
												date: input.date
                    },
                });
            } catch (error) {
                console.log(error);
            }
        }),
    get: protectedProcedure
		.input(
			z.object({
				habbitIds: z.string().array(),
			})
		)
		.query(async ({ ctx, input }) => {
        try {
            const habbitEvents = await ctx.prisma.habbitEvent.findMany({
                where: {
                    habbitId: { in: input.habbitIds },
                },
            });
            return habbitEvents;
        } catch (error) {
            console.log(error);
        }
    }),
    delete: protectedProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            try {
                return await ctx.prisma.habbitEvent.delete({
                    where: {
                        id: input.id
                    },
                });
            } catch (error) {
                console.log("error", error);
            }
        }),
});