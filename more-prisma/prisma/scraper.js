// filepath: /home/lukas/Programming/hackathon/more-prisma/prisma/scraper.js
// Note: Not working yet, too lazy to fix it.
const fs = require('fs');
const puppeteer = require('puppeteer');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function scrapeRestaurants(city) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Replace with the actual URL of the website you're scraping
    const url = `https://example.com/restaurants-in-${city}`; // Adjust URL
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    // Adjust selectors based on the website's structure
    const restaurants = await page.evaluate(() => {
        const items = [];
        const restaurantElements = document.querySelectorAll('.result-title'); // Adjust selector
        restaurantElements.forEach((el, index) => {
            if (index < 10) { // Limit to top 10
                const name = el.textContent.trim();
                const location = document.querySelector('.location-class')?.textContent.trim() || 'Unknown'; // Adjust selector
                const rating = document.querySelector('.rating-class')?.textContent.trim() || 'No rating'; // Adjust selector
                items.push({ name, location, rating });
            }
        });
        return items;
    });

    await browser.close();
    return restaurants;
}

async function saveToFile(restaurants) {
    const data = restaurants.map(r => `${r.name}, ${r.location}, ${r.rating}`).join('\n');
    fs.writeFileSync('tempp.txt', data, 'utf8');
    console.log('Data saved to tempp.txt');
}

async function saveToDatabase(restaurants) {
    for (const restaurant of restaurants) {
        await prisma.restauracie.create({
            data: {
                name: restaurant.name,
                location: restaurant.location,
                rating: parseFloat(restaurant.rating) || null,
            },
        });
    }
    console.log('Data saved to the database');
}

async function main() {
    const city = 'Trnava'; // Change this to the desired city
    const restaurants = await scrapeRestaurants(city);

    // Save to file
    await saveToFile(restaurants);

    // Save to database
    await saveToDatabase(restaurants);

    await prisma.$disconnect();
}

main().catch(console.error);