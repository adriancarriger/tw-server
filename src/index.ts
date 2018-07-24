import { GraphQLServer } from 'graphql-yoga';
import { Prisma } from './generated/prisma';
import * as dotenv from 'dotenv';

// Load .env
dotenv.config();

const {
  PORT = 4332, PRISMA_DATA_ENDPOINT, PRISMA_SECRET
} = process.env;

const resolvers = {
  Query: {
    feed(parent, args, ctx, info) {
      return ctx.db.query.posts({
          where: {
            isPublished: true
          }
        },
        info
      );
    },
    drafts(parent, args, ctx, info) {
      return ctx.db.query.posts({
          where: {
            isPublished: false
          }
        },
        info
      );
    },
    post(parent, {
      id
    }, ctx, info) {
      return ctx.db.query.post({
          where: {
            id
          }
        },
        info
      );
    }
  },
  Mutation: {
    createDraft(parent, {
      title,
      text
    }, ctx, info) {
      return ctx.db.mutation.createPost({
          data: {
            title,
            text
          }
        },
        info
      );
    },
    deletePost(parent, {
      id
    }, ctx, info) {
      return ctx.db.mutation.deletePost({
          where: {
            id
          }
        },
        info
      );
    },
    publish(parent, {
      id
    }, ctx, info) {
      return ctx.db.mutation.updatePost({
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
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => ({
    ...request,
    db: new Prisma(<any>{
      typeDefs: 'src/generated/prisma.graphql', // the auto-generated GraphQL schema of the Prisma API
      endpoint: PRISMA_DATA_ENDPOINT, // the endpoint of the Prisma API
      debug: true, // log all GraphQL queries & mutations sent to the Prisma API
      secret: PRISMA_SECRET
    })
  })
});

server.start({
    port: PORT
  },
  () => console.log(`Server is running on http://localhost:${PORT}`)
);
