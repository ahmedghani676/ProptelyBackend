const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const units = await prisma.unit.findMany({ include: { property: true, landlord: true, lease: true } });
  res.json(units);
});

router.get('/:id', async (req, res) => {
  const unit = await prisma.unit.findUnique({ where: { id: Number(req.params.id) }, include: { property: true, landlord: true, lease: true } });
  res.json(unit);
});

router.post('/', async (req, res) => {
  const { unitNo, status, propertyId, landlordId } = req.body;
  const unit = await prisma.unit.create({ data: { unitNo, status, propertyId, landlordId } });
  res.json(unit);
});

router.put('/:id', async (req, res) => {
  const { unitNo, status, propertyId, landlordId } = req.body;
  const unit = await prisma.unit.update({ where: { id: Number(req.params.id) }, data: { unitNo, status, propertyId, landlordId } });
  res.json(unit);
});

router.delete('/:id', async (req, res) => {
  await prisma.unit.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: 'Unit deleted' });
});

module.exports = router;