export const Subscription = {
  feed: {
    subscribe: (parent, args, ctx, info) => {
      return ctx.db.subscription.post(
        {
          where: { mutation_in: ['UPDATED'] }
        },
        info
      );
    }
  }
};
