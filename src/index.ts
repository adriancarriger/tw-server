import { GraphQLServer } from 'graphql-yoga';
import * as dotenv from 'dotenv';
import * as cors from 'cors';

import { Prisma } from './generated/prisma';
import { resolvers } from './resolvers';
import { jwtCheck } from './auth/authentication';

// Load .env
dotenv.config();

const { PORT = 4332, PRISMA_DATA_ENDPOINT, PRISMA_SECRET } = process.env;

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: (request) => ({
    ...request,
    db: new Prisma(<any>{
      typeDefs: 'src/generated/prisma.graphql', // the auto-generated GraphQL schema of the Prisma API
      endpoint: PRISMA_DATA_ENDPOINT, // the endpoint of the Prisma API
      debug: true, // log all GraphQL queries & mutations sent to the Prisma API
      secret: PRISMA_SECRET
    })
  })
});

server.express.use(cors());
server.express.post(server.options.endpoint, jwtCheck);

server.start({ port: PORT }, () => console.log(`Server is running on http://localhost:${PORT}`));
