// import {PrismaClient} from "@prisma/client"

// declare global{
//     var prisma:PrismaClient|undefined;
// }
// const prismadb=globalThis.prisma || new PrismaClient();

// if(process.env.NODE_ENV !== "production") globalThis.prisma =prismadb;

// export default prismadb;



import { PrismaClient } from "@prisma/client";

declare global {
  // Declaring global variable for Prisma Client
  var prisma: PrismaClient | undefined;
}

// Instantiate PrismaClient if not already created
const prismadb = global.prisma || new PrismaClient();

// Attach PrismaClient instance to global object in development mode
if (process.env.NODE_ENV !== "production") {
  global.prisma = prismadb;
}

export default prismadb;
