const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const leases = await prisma.lease.findMany({ include: { tenant: true, unit: true } });
  res.json(leases);
});

router.get('/:id', async (req, res) => {
  const lease = await prisma.lease.findUnique({ where: { id: Number(req.params.id) }, include: { tenant: true, unit: true } });
  res.json(lease);
});

router.post('/', async (req, res) => {
  const { unitId, tenantId, rent, deposit, startDate, endDate } = req.body;
  const lease = await prisma.lease.create({
    data: {
      unitId,
      tenantId,
      rent,
      deposit,
      startDate: new Date(startDate),
      endDate: new Date(endDate)
    }
  });
  res.json(lease);
});

router.put('/:id', async (req, res) => {
  const { unitId, tenantId, rent, deposit, startDate, endDate } = req.body;
  const lease = await prisma.lease.update({
    where: { id: Number(req.params.id) },
    data: {
      unitId,
      tenantId,
      rent,
      deposit,
      startDate: new Date(startDate),
      endDate: new Date(endDate)
    }
  });
  res.json(lease);
});

router.delete('/:id', async (req, res) => {
  await prisma.lease.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: 'Lease deleted' });
});

module.exports = router;