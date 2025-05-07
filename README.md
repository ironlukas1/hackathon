HACKATHON

TO DO:
1. fetch (ziskavanie dat) /nebude sa robit
2. backend s databazou /hotovo
3. prisma /hotovo
4. backend nakodit v com chces, ale napriklad python /js cca 50%
5. frontend bud javascript (frameworky ako react, vue, angular) alebo cisty javascript alebo C# (blazor) /html, css a js 70% hotovo
6. recommendations
7. fix the about me showing
async function updateCuisine(restaurantId, newCuisine) {
  const updatedRestaurant = await prisma.restauracie.update({
    where: {
      id: 1, // Use the provided restaurantId
    },
    data: {
      cuisine: "Kaviereň", // Use the provided newCuisine value
    },
  });
  console.log('Updated restaurant:', updatedRestaurant);
}

updateCuisine(1, "Updated Cuisine") // Replace `1` with the actual ID
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });