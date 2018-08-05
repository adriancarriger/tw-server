export const Mutation = {
  createDraft(parent, { title, text }, ctx, info) {
    return ctx.db.mutation.createPost(
      {
        data: {
          title,
          text
        }
      },
      info
    );
  },
  deletePost(parent, { id }, ctx, info) {
    return ctx.db.mutation.deletePost(
      {
        where: {
          id
        }
      },
      info
    );
  },
  publish(parent, { id }, ctx, info) {
    return ctx.db.mutation.updatePost(
      {
        where: {
          id
        },
        data: {
          isPublished: true
        }
      },
      info
    );
  }
};
