const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUser = async (req, res) => {
    try {
        const isUniqueEmailUser = await prisma.user.findUnique({
            where : {
                email : req.body.email
            }
        })
        if (isUniqueEmailUser){
            res.status(400).json({ error: 'user with this email already exist' });
            return
        }
        const user = await prisma.user.create({
            data: req.body,
        });
        await prisma.actionHistory.create({
            data: {
                action: 'create',
                userId: user.id,
                timestamp: new Date(),
            },
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await prisma.user.update({
            where: { id: Number(req.params.id) },
            data: req.body,
        });
        await prisma.actionHistory.create({
            data: {
                action: 'update',
                userId: user.id,
                timestamp: new Date(),
            },
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const listUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createUser, updateUser, listUsers };
