import prisma from './src/lib/prisma-mock.ts';
console.log("Prisma instance:", prisma);
if (prisma) {
    console.log("User:", !!prisma.user);
    console.log("Event:", !!prisma.event);
}
