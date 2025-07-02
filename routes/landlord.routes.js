const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const landlords = await prisma.landlord.findMany();
  res.json(landlords);
});

router.get('/:id', async (req, res) => {
  const landlord = await prisma.landlord.findUnique({ where: { id: Number(req.params.id) } });
  res.json(landlord);
});

router.post('/', async (req, res) => {
  const { name, contact } = req.body;
  const landlord = await prisma.landlord.create({ data: { name, contact } });
  res.json(landlord);
});

router.put('/:id', async (req, res) => {
  const { name, contact } = req.body;
  const landlord = await prisma.landlord.update({ where: { id: Number(req.params.id) }, data: { name, contact } });
  res.json(landlord);
});

router.delete('/:id', async (req, res) => {
  await prisma.landlord.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: 'Landlord deleted' });
});

module.exports = router;