# Jardel Maciel — Portfólio

Portfólio profissional de Jardel Maciel, desenvolvedor Front-End e Full Stack, construído com React, TypeScript, Vite e Tailwind CSS. Inclui uma área administrativa privada (`/admin`) para adicionar projetos sem precisar editar código.

## Stack

**Front-end**
- **React 19** + **TypeScript**
- **Vite** — build e dev server
- **Tailwind CSS v4** (`@tailwindcss/vite`) — estilos utilitários, tema claro/escuro via classe `.dark`
- **React Router** — rota pública (`/`) e rota administrativa (`/admin`)
- **react-icons** — ícones de tecnologia (Simple Icons) e ícones de interface (Feather)

**Back-end** (pasta `server/`)
- **Flask** + **PostgreSQL** (`psycopg`) — API dos projetos
- **PyJWT** — sessão do admin (senha única, sem cadastro de usuários)
- **flask-limiter** — limita tentativas de login

## Rodando o projeto localmente

O site público funciona sozinho, sem o backend (usa a lista estática de `src/data/projects.ts`). Para usar a área `/admin` de verdade, o backend também precisa estar rodando.

### 1. Front-end

```bash
npm install
npm run dev       # http://localhost:5173
```

### 2. Back-end (opcional para navegar no site, obrigatório para usar /admin)

```bash
cd server
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env            # edite DATABASE_URL, ADMIN_PASSWORD e JWT_SECRET
python app.py                   # http://localhost:5000
```

Precisa de um Postgres rodando (local, ou já use direto o Neon/Render que for usar em produção — veja "Deploy" abaixo). Na primeira vez que o servidor sobe, ele cria a tabela `projects` sozinho e semeia o projeto Estoque Fácil automaticamente.

Depois, na raiz do front-end, copie `.env.example` para `.env.local` e aponte para o backend:

```
VITE_API_URL=http://localhost:5000
```

(o `.env.local` deste projeto já está configurado para `http://localhost:5050`, que foi a porta usada durante os testes — ajuste para a porta que você realmente usar)

### Outros comandos do front-end

```bash
npm run build     # build de produção (pasta dist/)
npm run preview   # serve o build de produção localmente
npm run lint      # oxlint
```

## Estrutura

```
src/
  components/     # Navbar, Hero, About, Skills, Projects, Highlight, Contact, Footer, ThemeToggle...
  pages/          # PortfolioPage — o site público (tudo que estava em App.tsx antes)
  admin/          # LoginForm, Dashboard, ProjectForm — a área /admin (carregada só quando acessada)
  context/        # ThemeContext — modo claro/escuro (padrão: escuro), persistido em localStorage
  data/           # siteConfig.ts, projects.ts, skills.ts — conteúdo estático/fallback
  hooks/          # useReveal, useScrollSpy, useProjects (busca projetos da API, com fallback estático)
  lib/api.ts      # cliente HTTP da API do backend

server/
  app.py          # rotas Flask (públicas e /admin, protegidas por senha)
  db.py           # acesso ao Postgres (sem ORM)
  auth.py         # checagem de senha + emissão/validação do JWT
  requirements.txt
  .env.example
```

## Como funciona a área administrativa (`/admin`)

- A rota **não aparece em nenhum link do site** (não está na navbar nem em lugar nenhum visível) e fica fora do índice de busca (`public/robots.txt` bloqueia `/admin`, e a página injeta `noindex`). Isso reduz a chance de alguém encontrar por acaso, mas **não é a proteção de verdade** — quem garante isso é a senha.
- Ao acessar `/admin`, é pedida a senha definida em `ADMIN_PASSWORD` no backend. Se correta, o backend devolve um token (JWT) válido por 12h, guardado no navegador.
- Com a sessão ativa, dá pra **adicionar, editar e excluir** projetos — cada mudança grava direto no Postgres e aparece no site público na hora (a seção "Projetos em destaque" busca a lista da API sempre que a página carrega).
- Se a API não estiver configurada ou estiver fora do ar, o site público volta sozinho a usar a lista estática de `src/data/projects.ts` — nunca fica com a seção vazia ou quebrada.
- Login tem limite de 10 tentativas por minuto por IP, e a senha é comparada de um jeito que evita ataques de timing.

**Antes de publicar**, troque os valores de exemplo em `server/.env.example`:
- `ADMIN_PASSWORD` — a senha que você vai usar pra entrar em `/admin`.
- `JWT_SECRET` — gere um valor aleatório com `python -c "import secrets; print(secrets.token_hex(32))"`.

## Personalizando o conteúdo

- **Projetos**: depois que o backend estiver publicado, o jeito recomendado é usar `/admin`. Sem backend (ou como fallback), dá pra continuar editando `src/data/projects.ts` diretamente — cada projeto tem `title`, `tag`, `description`, `stack`, `liveUrl` (opcional) e `githubUrl` (opcional).
- **`src/data/siteConfig.ts`** — nome, e-mail, links do GitHub e LinkedIn, e os itens da navbar.
- **`src/data/skills.ts`** — categorias e tecnologias exibidas em "Tecnologias & Habilidades", com os respectivos ícones.

> Os links de GitHub e LinkedIn em `siteConfig.ts`, e a URL do repositório do Estoque Fácil, foram preenchidos com base no que você confirmou durante a criação do site — confirme se estão corretos antes de publicar. O botão **Ver projeto** do Estoque Fácil só aparece quando a URL ao vivo é definida; adicione assim que o deploy do sistema estiver disponível (via `/admin` ou editando `projects.ts`).

O card de cada projeto usa uma ilustração esquemática (`src/components/ProjectMockup.tsx`) como preview, já que ainda não há capturas de tela reais. Quando houver, dá pra trocar esse componente por uma `<img>` apontando para o print do sistema — se quiser, posso fazer isso depois.

O formulário de contato não possui backend próprio: ao enviar, ele monta um `mailto:` com os dados preenchidos e abre o aplicativo de e-mail padrão do visitante.

## Modo claro/escuro

O escuro é o tema principal do site. A preferência do usuário é salva no `localStorage` (`jm-portfolio-theme`) e persiste entre visitas; o botão na navbar alterna entre os dois modos a qualquer momento.

## Deploy

### Backend (`server/`)

1. Crie um banco Postgres gratuito no [Neon](https://neon.tech) (mesmo serviço já usado no Estoque Fácil) — copie a connection string.
2. No [Render](https://render.com), crie um **Web Service** apontando para a pasta `server/`:
   - Build command: `pip install -r requirements.txt`
   - Start command: `gunicorn app:app`
   - Environment variables: `DATABASE_URL` (do Neon), `ADMIN_PASSWORD`, `JWT_SECRET`, `ALLOWED_ORIGIN` (a URL do site público, ex: `https://jardelmaciel.vercel.app`)
3. Guarde a URL pública que o Render gerar (ex: `https://portfolio-backend.onrender.com`).

### Front-end

O front-end continua sendo um build estático (`npm run build` gera `dist/`):

- **Vercel**: importe o repositório, framework preset "Vite". Em Environment Variables, adicione `VITE_API_URL` com a URL do backend no Render. O arquivo `vercel.json` já está configurado para as rotas do React Router funcionarem (`/admin` incluso).
- **Render (Static Site)**: build command `npm run build`, publish directory `dist`, mesma variável `VITE_API_URL`. Configure uma regra de rewrite `/* → /index.html` nas configurações de Redirects/Rewrites do serviço, senão recarregar a página em `/admin` dá 404.

Sem `VITE_API_URL` configurada, o site publica normalmente, só que com a lista estática de projetos e sem `/admin` funcional.
