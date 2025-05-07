const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const newRestaurant = await prisma.restaurant.create({
        data: {
            name: 'Sample Restaurant',
            location: '123 Main Street',
            cuisine: 'Italian',
            rating: 4.5,
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