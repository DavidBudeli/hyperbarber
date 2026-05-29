const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const tenantSlug = "hyperbarber"

const studioImages = [
  "https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png",
  "https://utfs.io/f/45331760-899c-4b4b-910e-e00babb6ed81-16q.png",
  "https://utfs.io/f/5832df58-cfd7-4b3f-b102-42b7e150ced2-16r.png",
  "https://utfs.io/f/7e309eaa-d722-465b-b8b6-76217404a3d3-16s.png",
  "https://utfs.io/f/178da6b6-6f9a-424a-be9d-a2feb476eb36-16t.png",
  "https://utfs.io/f/2f9278ba-3975-4026-af46-64af78864494-16u.png",
]

const serviceImages = {
  cut: "https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png",
  beard: "https://utfs.io/f/e6bdffb6-24a9-455b-aba3-903c2c2b5bde-1jo6tu.png",
  finish: "https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png",
  eyebrow: "https://utfs.io/f/2118f76e-89e4-43e6-87c9-8f157500c333-b0ps0b.png",
  therapy: "https://utfs.io/f/c4919193-a675-4c47-9f21-ebd86d1c8e6a-4oen2a.png",
  hydration:
    "https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png",
}

const studios = [
  {
    name: "HyperBarber Jardins",
    slug: "nova-orbit-studio",
    address: "Rua Oscar Freire, 1200 - São Paulo, SP",
    rating: 4.9,
    description:
      "Unidade premium da marca HyperBarber com agenda digital, atendimento consultivo e experiência orientada por dados.",
  },
  {
    name: "HyperBarber Faria Lima",
    slug: "astra-prime-grooming",
    address: "Av. Brigadeiro Faria Lima, 3012 - São Paulo, SP",
    rating: 4.8,
    description:
      "Unidade executiva HyperBarber para clientes que valorizam precisão, privacidade e uma jornada de alto padrão.",
  },
  {
    name: "HyperBarber Savassi",
    slug: "vanta-lab",
    address: "Av. do Contorno, 6061 - Belo Horizonte, MG",
    rating: 4.7,
    description:
      "Operação dark luxury com serviços técnicos, equipe especialista e controle inteligente de horários.",
  },
  {
    name: "HyperBarber Moinhos",
    slug: "zenith-men-studio",
    address: "Rua Padre Chagas, 221 - Porto Alegre, RS",
    rating: 4.9,
    description:
      "Unidade preparada para fidelização, dados de clientes e automações de relacionamento.",
  },
  {
    name: "HyperBarber Batel",
    slug: "cosmos-executive",
    address: "Av. Batel, 1550 - Curitiba, PR",
    rating: 4.8,
    description:
      "Operação executiva com serviços rápidos, agenda previsível e visão de múltiplas unidades.",
  },
  {
    name: "HyperBarber Ipanema",
    slug: "eclipse-signature",
    address: "Rua Garcia D'Ávila, 91 - Rio de Janeiro, RJ",
    rating: 4.9,
    description:
      "Unidade signature com visual limpo, comunicação premium e fluxo digital de ponta a ponta.",
  },
]

const services = [
  {
    name: "Corte Signature",
    description:
      "Corte consultivo com acabamento técnico e leitura de estilo para uma presença mais refinada.",
    price: 90,
    durationMinutes: 45,
    imageUrl: serviceImages.cut,
  },
  {
    name: "Barba Precision",
    description:
      "Modelagem de barba com toalha quente, desenho preciso e finalização premium.",
    price: 70,
    durationMinutes: 35,
    imageUrl: serviceImages.beard,
  },
  {
    name: "Acabamento Orbit",
    description:
      "Finalização de contorno, nuca e laterais para manter o visual alinhado entre cortes.",
    price: 45,
    durationMinutes: 25,
    imageUrl: serviceImages.finish,
  },
  {
    name: "Design de Sobrancelha",
    description:
      "Correção sutil de linhas e simetria facial com acabamento natural.",
    price: 35,
    durationMinutes: 20,
    imageUrl: serviceImages.eyebrow,
  },
  {
    name: "Ritual Recovery",
    description:
      "Massagem craniana, hidratação e protocolo de relaxamento para recuperação pós-rotina.",
    price: 110,
    durationMinutes: 50,
    imageUrl: serviceImages.therapy,
  },
  {
    name: "Tratamento Hydra Tech",
    description:
      "Hidratação profunda para cabelo e barba com produtos de alta performance.",
    price: 80,
    durationMinutes: 40,
    imageUrl: serviceImages.hydration,
  },
]

const staffByStudio = [
  ["Caio Nascimento", "Diretor técnico"],
  ["Rafael Torres", "Especialista em cortes"],
  ["Bruno Almeida", "Especialista em barba"],
]

const customers = [
  {
    name: "Lucas Martins",
    email: "lucas.martins@example.com",
    phone: "(11) 98888-0101",
  },
  {
    name: "Henrique Costa",
    email: "henrique.costa@example.com",
    phone: "(11) 97777-0202",
  },
  {
    name: "Daniel Rocha",
    email: "daniel.rocha@example.com",
    phone: "(21) 96666-0303",
  },
  {
    name: "Mateus Vieira",
    email: "mateus.vieira@example.com",
    phone: "(31) 95555-0404",
  },
]

type StudioSeed = (typeof studios)[number]

const upsertStudio = async (
  tenantId: string,
  studio: StudioSeed,
  imageUrl: string,
) => {
  const existingStudio = await prisma.barbershop.findFirst({
    where: {
      tenantId,
      slug: studio.slug,
    },
  })

  const data = {
    tenantId,
    slug: studio.slug,
    name: studio.name,
    address: studio.address,
    imageUrl,
    phones: ["(11) 4002-8922", "(11) 99188-7766"],
    description: studio.description,
    rating: studio.rating,
  }

  if (existingStudio) {
    return prisma.barbershop.update({
      where: {
        id: existingStudio.id,
      },
      data,
    })
  }

  return prisma.barbershop.create({
    data,
  })
}

const seedDatabase = async () => {
  const plan = await prisma.plan.upsert({
    where: {
      code: "hyperbarber-pro",
    },
    update: {
      name: "HyperBarber Pro",
      description:
        "Plano base para barbearias premium com white-label, agenda, clientes e insights.",
      priceCents: 29900,
      interval: "MONTHLY",
      bookingLimit: 1500,
      staffLimit: 20,
      aiCredits: 500,
      isActive: true,
    },
    create: {
      code: "hyperbarber-pro",
      name: "HyperBarber Pro",
      description:
        "Plano base para barbearias premium com white-label, agenda, clientes e insights.",
      priceCents: 29900,
      interval: "MONTHLY",
      bookingLimit: 1500,
      staffLimit: 20,
      aiCredits: 500,
      isActive: true,
    },
  })

  const tenant = await prisma.tenant.upsert({
    where: {
      slug: tenantSlug,
    },
    update: {
      name: "HyperBarber",
      legalName: "Hyper Galaxy Labs LTDA",
      status: "ACTIVE",
      logoUrl: null,
      primaryColor: "#7C3AED",
    },
    create: {
      name: "HyperBarber",
      slug: tenantSlug,
      legalName: "Hyper Galaxy Labs LTDA",
      status: "ACTIVE",
      logoUrl: null,
      primaryColor: "#7C3AED",
    },
  })

  await prisma.brandingConfig.upsert({
    where: {
      tenantId: tenant.id,
    },
    update: {
      productName: "HyperBarber",
      primaryColor: "#7C3AED",
      accentColor: "#22D3EE",
      themeMode: "DARK",
      welcomeHeadline:
        "Sistema operacional inteligente para barbearias premium.",
    },
    create: {
      tenantId: tenant.id,
      productName: "HyperBarber",
      primaryColor: "#7C3AED",
      accentColor: "#22D3EE",
      themeMode: "DARK",
      welcomeHeadline:
        "Sistema operacional inteligente para barbearias premium.",
    },
  })

  const existingSubscription = await prisma.subscription.findFirst({
    where: {
      tenantId: tenant.id,
      planId: plan.id,
    },
  })

  if (existingSubscription) {
    await prisma.subscription.update({
      where: {
        id: existingSubscription.id,
      },
      data: {
        status: "ACTIVE",
      },
    })
  } else {
    await prisma.subscription.create({
      data: {
        tenantId: tenant.id,
        planId: plan.id,
        status: "ACTIVE",
      },
    })
  }

  for (let index = 0; index < studios.length; index++) {
    const studio = studios[index]
    const barbershop = await upsertStudio(
      tenant.id,
      studio,
      studioImages[index % studioImages.length],
    )

    for (const service of services) {
      await prisma.barbershopService.upsert({
        where: {
          barbershopId_name: {
            barbershopId: barbershop.id,
            name: service.name,
          },
        },
        update: {
          tenantId: tenant.id,
          description: service.description,
          imageUrl: service.imageUrl,
          price: service.price,
          durationMinutes: service.durationMinutes,
          isActive: true,
        },
        create: {
          tenantId: tenant.id,
          barbershopId: barbershop.id,
          name: service.name,
          description: service.description,
          imageUrl: service.imageUrl,
          price: service.price,
          durationMinutes: service.durationMinutes,
          isActive: true,
        },
      })
    }

    for (const [name, roleTitle] of staffByStudio) {
      const existingStaff = await prisma.staffMember.findFirst({
        where: {
          tenantId: tenant.id,
          barbershopId: barbershop.id,
          name,
        },
      })

      const data = {
        tenantId: tenant.id,
        barbershopId: barbershop.id,
        name,
        roleTitle,
        bio: "Especialista certificado para atendimento premium e operação orientada por agenda digital.",
        isActive: true,
      }

      if (existingStaff) {
        await prisma.staffMember.update({
          where: {
            id: existingStaff.id,
          },
          data,
        })
      } else {
        await prisma.staffMember.create({
          data,
        })
      }
    }
  }

  const seededCustomers = []

  for (const customer of customers) {
    const user = await prisma.user.upsert({
      where: {
        email: customer.email,
      },
      update: {
        name: customer.name,
        role: "CUSTOMER",
      },
      create: {
        name: customer.name,
        email: customer.email,
        role: "CUSTOMER",
      },
    })

    await prisma.tenantUser.upsert({
      where: {
        tenantId_userId: {
          tenantId: tenant.id,
          userId: user.id,
        },
      },
      update: {
        role: "CUSTOMER",
      },
      create: {
        tenantId: tenant.id,
        userId: user.id,
        role: "CUSTOMER",
      },
    })

    const customerRecord = await prisma.customer.upsert({
      where: {
        tenantId_email: {
          tenantId: tenant.id,
          email: customer.email,
        },
      },
      update: {
        name: customer.name,
        phone: customer.phone,
        userId: user.id,
        lastVisitAt: new Date(),
      },
      create: {
        tenantId: tenant.id,
        userId: user.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        lastVisitAt: new Date(),
      },
    })

    seededCustomers.push({ customer: customerRecord, user })
  }

  const seededUnits = await prisma.barbershop.findMany({
    where: {
      tenantId: tenant.id,
    },
    include: {
      services: {
        where: {
          isActive: true,
        },
        orderBy: {
          name: "asc",
        },
      },
      staff: {
        where: {
          isActive: true,
        },
        orderBy: {
          name: "asc",
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  })

  const today = new Date()
  const bookingSlots = [
    { dayOffset: 0, hour: 10, minute: 0 },
    { dayOffset: 0, hour: 15, minute: 30 },
    { dayOffset: 1, hour: 11, minute: 0 },
    { dayOffset: 2, hour: 18, minute: 30 },
  ]

  for (let index = 0; index < seededCustomers.length; index++) {
    const unit = seededUnits[index % seededUnits.length]
    const service = unit?.services[index % unit.services.length]
    const staffMember = unit?.staff[index % unit.staff.length]
    const slot = bookingSlots[index % bookingSlots.length]

    if (!unit || !service) {
      continue
    }

    const date = new Date(today)
    date.setDate(today.getDate() + slot.dayOffset)
    date.setHours(slot.hour, slot.minute, 0, 0)

    const seededCustomer = seededCustomers[index]
    const existingBooking = await prisma.booking.findFirst({
      where: {
        tenantId: tenant.id,
        userId: seededCustomer.user.id,
        serviceId: service.id,
        date,
      },
    })

    const bookingData = {
      tenantId: tenant.id,
      userId: seededCustomer.user.id,
      customerId: seededCustomer.customer.id,
      staffMemberId: staffMember?.id,
      serviceId: service.id,
      status: "CONFIRMED",
      date,
    }

    if (existingBooking) {
      await prisma.booking.update({
        where: {
          id: existingBooking.id,
        },
        data: bookingData,
      })
    } else {
      await prisma.booking.create({
        data: bookingData,
      })
    }
  }
}

seedDatabase()
  .catch((error) => {
    console.error("Erro ao popular o banco HyperBarber:", error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
