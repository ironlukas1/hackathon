const express = require('express');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

// Middleware to serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Serve the index.html file for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Example route to fetch all users (assuming a `User` model exists in your Prisma schema)
app.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

app.get('/search', async (req, res) => {
    const { cuisine, location } = req.query;

    try {
        const restaurants = await prisma.restauracie.findMany({
            where: {
                cuisine: cuisine !== 'Všetky' ? cuisine : undefined,
                location: location !== 'Všetky' ? location : undefined,
            },
            select: {
                name: true,
                location: true,
                cuisine: true,
                rating: true
            }
        });
        res.json(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch restaurants' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});