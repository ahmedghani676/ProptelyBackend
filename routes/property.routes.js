const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const properties = await prisma.property.findMany();
  res.json(properties);
});

router.get('/:id', async (req, res) => {
  const property = await prisma.property.findUnique({ where: { id: Number(req.params.id) } });
  res.json(property);
});

router.post('/', async (req, res) => {
  const { name, location } = req.body;
  const property = await prisma.property.create({ data: { name, location } });
  res.json(property);
});

router.put('/:id', async (req, res) => {
  const { name, location } = req.body;
  const property = await prisma.property.update({ where: { id: Number(req.params.id) }, data: { name, location } });
  res.json(property);
});

router.delete('/:id', async (req, res) => {
  const propertyId = parseInt(req.params.id);

  try {
    // First: Delete all units linked to this property
    await prisma.unit.deleteMany({
      where: { propertyId: propertyId },
    });

    // Then: Delete the property itself
    await prisma.property.delete({
      where: { id: propertyId },
    });

    res.json({ message: 'Property and its units deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete property' });
  }
});

module.exports = router;