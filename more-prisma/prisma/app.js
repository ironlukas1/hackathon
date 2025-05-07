const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const newRestaurant = await prisma.restauracie.create({
        data: {
            name: 'Wetzlerov Dom',
            location: 'Trnava',
            cuisine: 'Tradičné Slovenské',
            rating: 3.9,
        },
    });
    console.log('New Restaurant Added:', newRestaurant);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });