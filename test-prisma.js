const { prisma } = require('./src/lib/prisma-mock')

async function main() {
    console.log('Testing Prisma connection...')
    try {
        const count = await prisma.user.count()
        console.log('User count:', count)
    } catch (err) {
        console.error('Diagnostic failed:', err)
    } finally {
        await prisma.$disconnect()
    }
}

main()
