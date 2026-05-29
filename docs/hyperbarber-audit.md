# Auditoria HyperBarber

## Stack Atual

- Next.js 14 com App Router em `app/`
- React 18, TypeScript estrito e Tailwind CSS
- shadcn/Radix em `app/_components/ui`
- Prisma 5 com PostgreSQL
- NextAuth com Google Provider e Prisma Adapter
- Docker Compose para Postgres local

## Rotas

- `/`: home com busca, categorias, lista de barbearias e agendamentos do usuário
- `/barbershops`: catálogo filtrado por título ou serviço
- `/barbershops/[id]`: detalhe, serviços e fluxo de reserva
- `/bookings`: agendamentos confirmados/finalizados
- `/api/auth/[...nextauth]`: autenticação NextAuth

## Principais Riscos Encontrados

- O produto estava com metadata padrão de `create-next-app`.
- Textos e marca ainda apontavam para FSW Barber/template.
- O schema não tinha `tenantId`, organização, branding, planos, clientes ou equipe.
- `deleteBooking` não validava se a reserva pertencia ao usuário autenticado.
- `getBookings` recebia `serviceId`, mas não filtrava por ele.
- Seed original duplicava dados a cada execução.
- `postgres:latest` puxava Postgres 18 e quebrou o volume local; fixado em `postgres:16`.
- Não havia dashboard operacional nem base para Super Admin.

## Estratégia de Refatoração

- Preservar App Router e fluxo atual de reserva.
- Adicionar base multi-tenant com campos opcionais para compatibilidade.
- Introduzir módulos em `src/` sem mover tudo de uma vez.
- Trocar a camada visual e copy para HyperBarber.
- Criar pontos de extensão para white-label, billing, analytics e IA.
