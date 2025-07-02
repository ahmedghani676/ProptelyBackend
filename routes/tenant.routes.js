const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const tenants = await prisma.tenant.findMany({ include: { leases: true } });
  res.json(tenants);
});

router.get('/:id', async (req, res) => {
  const tenant = await prisma.tenant.findUnique({ where: { id: Number(req.params.id) }, include: { leases: true } });
  res.json(tenant);
});

router.post('/', async (req, res) => {
  const { name, contact } = req.body;
  const tenant = await prisma.tenant.create({ data: { name, contact } });
  res.json(tenant);
});

router.put('/:id', async (req, res) => {
  const { name, contact } = req.body;
  const tenant = await prisma.tenant.update({ where: { id: Number(req.params.id) }, data: { name, contact } });
  res.json(tenant);
});

router.delete('/:id', async (req, res) => {
  await prisma.tenant.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: 'Tenant deleted' });
});

module.exports = router;