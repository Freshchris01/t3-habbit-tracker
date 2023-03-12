import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const habbitRouter = createTRPCRouter({
    add: protectedProcedure
        .input(
            z.object({
                name: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            try {
                await ctx.prisma.habbit.create({
                    data: {
                        name: input.name,
                        userId: ctx.session.user.id,
                    },
                });
            } catch (error) {
                console.log(error);
            }
        }),
    get: protectedProcedure.query(async ({ ctx }) => {
        try {
            const habbits = await ctx.prisma.habbit.findMany({
                where: {
                    userId: ctx.session.user.id,
                },
            });
            return habbits;
        } catch (error) {
            console.log(error);
        }
    })
});