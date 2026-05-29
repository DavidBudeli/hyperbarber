# HyperBarber

HyperBarber é o sistema operacional inteligente para barbearias premium do ecossistema Hyper Galaxy.

Agenda, clientes, equipe, automações e dados em uma experiência white-label criada para marcas que querem parecer maiores, vender melhor e operar com precisão.

## Stack

- Next.js 14 com App Router
- TypeScript
- Prisma ORM
- PostgreSQL via Docker
- NextAuth com Prisma Adapter
- Tailwind CSS, shadcn/ui e Radix UI

## Ambiente local

Instale as dependências:

```bash
npm install
```

Suba o banco:

```bash
docker compose up -d
```

Rode as migrations e a seed:

```bash
npx prisma migrate deploy
npx prisma db seed
```

Inicie a aplicação:

```bash
npm run dev
```

A aplicação local roda em [http://localhost:3007](http://localhost:3007).

## Base SaaS

A arquitetura já possui a fundação para:

- tenants e organizações
- branding white-label por cliente
- slug e domínio customizado futuro
- plano e assinatura
- staff, clientes e reservas por tenant
- painel master Super Admin
- espaço visual para o Hyper Assistant

## Docker

O container local usa PostgreSQL 16, banco `hyperbarber` e volume bind em `.postgres-data`.

Se já existir um volume antigo, mantenha o diretório para preservar dados locais ou remova `.postgres-data` apenas quando quiser recriar o banco do zero.
