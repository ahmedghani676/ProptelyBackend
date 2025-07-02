// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 1) Create 4 Properties
  const propertyData = [
    { name: 'Sunset Villas', location: 'Karachi' },
    { name: 'Maple Residency', location: 'Lahore' },
    { name: 'Oceanview Apartments', location: 'Islamabad' },
    { name: 'Hillside Estate', location: 'Peshawar' },
  ];
  const properties = await Promise.all(
    propertyData.map((p) => prisma.property.create({ data: p }))
  );

  // 2) Create 4 Landlords
  const landlordData = [
    { name: 'Ahmed Khan', contact: '0345-1234567' },
    { name: 'Sara Ali',   contact: '0300-7654321' },
    { name: 'Omar Farooq',contact: '0321-9876543' },
    { name: 'Mona Shah',  contact: '0312-3456789' },
  ];
  const landlords = await Promise.all(
    landlordData.map((l) => prisma.landlord.create({ data: l }))
  );

  // 3) Create 4 Units (one per property & landlord)
  const unitData = properties.map((prop, i) => ({
    unitNo: `Unit ${100 + i + 1}`,
    status: i % 2 === 0 ? 'vacant' : 'occupied',
    propertyId: prop.id,
    landlordId: landlords[i].id,
  }));
  const units = await Promise.all(
    unitData.map((u) => prisma.unit.create({ data: u }))
  );

  // 4) Create 4 Tenants
  const tenantData = [
    { name: 'Ali Raza',    contact: '0300-1112223' },
    { name: 'Ayesha Tariq',contact: '0301-3334445' },
    { name: 'Bilal Sheikh',contact: '0302-5556667' },
    { name: 'Zara Khan',   contact: '0303-7778889' },
  ];
  const tenants = await Promise.all(
    tenantData.map((t) => prisma.tenant.create({ data: t }))
  );

  // 5) Create 4 Leases linking unit[i] → tenant[i]
  const today = new Date();
  const leaseData = units.map((u, i) => ({
    unitId: u.id,
    tenantId: tenants[i].id,
    rent: 20000 + i * 1000,         // staggered rent
    deposit: 40000 + i * 2000,      // staggered deposit
    startDate: new Date(today.getFullYear(), today.getMonth(), 1),
    endDate: new Date(today.getFullYear() + 1, today.getMonth(), 1),
  }));
  await Promise.all(
    leaseData.map((l) => prisma.lease.create({ data: l }))
  );

  console.log('Seeded 4 properties, 4 landlords, 4 units, 4 tenants, and 4 leases 🎉');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
