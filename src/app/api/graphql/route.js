import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";
import { prisma } from "@/lib/prismaClient";
import { getServerSession } from "next-auth/next";
import { options } from "../auth/[...nextauth]/options";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();
const NEW_MESSAGE = "NEW_MESSAGE";

const resolvers = {
  Query: {
    hello: async (parent, args, context) => {
      const { user, prisma } = context;
      console.log(user);
      const dbUser = await prisma.user.findFirst();
      // return dbUser ? dbUser.name : "User not found";
      return "This is From GraphQl"
    },
  },
  Mutation: {
    sendMessage: async (_, { content }) => {
      const message = { id: Date.now().toString(), content };
      pubsub.publish(NEW_MESSAGE, { newMessage: message });
      return message;
    },
  },
  Subscription: {
    newMessage: {
      subscribe: () => pubsub.asyncIterator(NEW_MESSAGE),
    },
  },
};

const typeDefs = gql`
  type Message {
    id: ID!
    content: String!
  }

  type Query {
    hello: String
  }

  type Mutation {
    sendMessage(content: String!): Message
  }

  type Subscription {
    newMessage: Message
  }
`;
const server = new ApolloServer({
  resolvers,
  typeDefs,
});
await server.start();
const schema = makeExecutableSchema({ typeDefs, resolvers });

const handler = startServerAndCreateNextHandler(server, {
  schema,
  context: async (req, res) => {
    const session = await getServerSession(options);
    const user = session?.user || null;
    return { user, prisma, req, res };
  },
});

// Create HTTP server
const httpServer = createServer();

// Create WebSocket server for subscriptions
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/api/graphql",
});

useServer({ schema }, wsServer);
httpServer.on("request", handler);

console.log("Listening to port 4000");

export { handler as GET, handler as POST };
