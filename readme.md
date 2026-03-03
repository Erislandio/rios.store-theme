# 🛍️ Grupo Rios — Store Theme v2

Monorepo contendo todos os pacotes VTEX IO que compõem a loja online do **Grupo Rios**. O projeto é estruturado em módulos independentes e versionados separadamente, garantindo organização, escalabilidade e facilidade de manutenção.

---

## 📦 Pacotes do Monorepo

| Pacote                        | Vendor/Nome                    | Versão  | Descrição                                          |
| ----------------------------- | ------------------------------ | ------- | -------------------------------------------------- |
| [`/store`](./store)           | `gruporios.store-theme`        | `0.0.1` | Tema principal da loja (layouts, blocos e estilos) |
| [`/components`](./components) | `gruporios.store-components`   | `0.0.1` | Componentes React customizados                     |
| [`/backend`](./backend)       | `gruporios.service`            | `0.1.1` | Serviços Node.js, GraphQL e integrações com APIs   |
| [`/checkout`](./checkout)     | `gruporios.checkout-ui-custom` | —       | Customizações de UI do checkout                    |
| [`/emails`](./emails)         | —                              | —       | Templates de e-mail transacionais                  |

---

## 🏗️ Arquitetura do Projeto

```
rios.store-theme-v2/
├── backend/                    # Serviço Node.js (gruporios.service)
│   ├── node/
│   │   ├── clients/            # Clientes HTTP (VTEX APIs, GraphQL, etc.)
│   │   ├── resolvers/          # Resolvers GraphQL
│   │   └── typings/            # Tipos TypeScript
│   └── graphql/                # Schema GraphQL
│
├── checkout/                   # Customização de Checkout
│   └── src/
│       ├── html/               # HTML injetado no checkout
│       ├── scss/               # Estilos customizados do checkout
│       └── ts/                 # Lógica TypeScript (middlewares, utils)
│
├── components/                 # Componentes React (gruporios.store-components)
│   └── react/
│       ├── *.tsx               # Componentes principais
│       ├── components/         # Sub-componentes reutilizáveis
│       ├── graphql/            # Mutations e queries GraphQL
│       ├── hooks/              # Hooks customizados
│       ├── queries/            # Queries GraphQL
│       ├── typings/            # Tipos TypeScript / interfaces VTEX
│       └── utils/              # Funções utilitárias
│
├── emails/                     # Templates de e-mail
│
└── store/                      # Tema da loja (gruporios.store-theme)
    ├── assets/                 # Imagens e arquivos estáticos
    ├── store/
    │   ├── blocks/             # Blocos de layout por página
    │   │   ├── home/           # Página inicial
    │   │   ├── pdp/            # Página de produto
    │   │   ├── plp/            # Listagem de produtos
    │   │   ├── pages/          # Páginas institucionais
    │   │   └── components/     # Blocos de componentes globais
    │   ├── blocks.jsonc        # Declaração global de blocos
    │   ├── plugins.json        # Plugins da loja
    │   └── routes.json         # Rotas customizadas
    └── styles/
        ├── configs/            # Configurações de design system
        ├── css/                # Arquivos CSS
        ├── iconpacks/          # Pacotes de ícones
        └── scss/
            └── components/     # Arquivos SCSS por componente/app
```

---

## 🧩 Componentes Customizados

Os componentes ficam em `components/react/` e são registrados no `interfaces.json`. Abaixo, os principais:

| Componente                        | Descrição                              |
| --------------------------------- | -------------------------------------- |
| `Blog.tsx`                        | Seção de blog/conteúdo                 |
| `BrandBanners.tsx`                | Banners de marcas parceiras            |
| `BuyMorePayLess.tsx`              | Promoção "Compre mais, pague menos"    |
| `ContactForm.tsx`                 | Formulário de contato                  |
| `Coupon.tsx`                      | Input e aplicação de cupom de desconto |
| `CustomCategoryList.tsx`          | Lista customizada de categorias        |
| `CustomCompreJunto.tsx`           | Compre junto (cross-sell no PDP)       |
| `CustomDepartmentBanner.tsx`      | Banner de departamento na PLP          |
| `CustomDepartmentdescription.tsx` | Descrição expansível de departamento   |
| `CustomIcons.tsx`                 | Ícones customizados da loja            |
| `CustomLoginButton.tsx`           | Botão de login customizado             |
| `CustomMinicartButton.tsx`        | Botão do minicart com badge            |
| `CustomProductInfo.tsx`           | Informações customizadas do produto    |
| `CustomProductSummaryBadge.tsx`   | Badge de produto na vitrine            |
| `CustomReviews.tsx`               | Seção de avaliações de produto         |
| `CustomShippingBar.tsx`           | Barra de frete grátis                  |
| `CustomStores.tsx`                | Mapa/listagem de lojas físicas         |
| `DepartmentCarousel.tsx`          | Carrossel de departamentos             |
| `ExitIntentModal.tsx`             | Modal de exit intent                   |
| `Footer.tsx` / `FooterMobile.tsx` | Rodapé desktop e mobile                |
| `InstitucionalPage.tsx`           | Página institucional da empresa        |
| `NewReview.tsx`                   | Componente para envio de avaliações    |
| `NewsletterModal.tsx`             | Modal de inscrição em newsletter       |
| `ProductGrid.tsx`                 | Grid customizado de produtos           |
| `TopBar.tsx`                      | Barra superior com informações         |

---

## ⚙️ Pré-requisitos

- [Node.js](https://nodejs.org/) `>= 16.x`
- [Yarn](https://yarnpkg.com/) `>= 1.x`
- [VTEX Toolbelt](https://developers.vtex.com/docs/guides/vtex-io-documentation-vtex-io-cli-installation-and-command-reference) `>= 3.x`
- Conta VTEX com permissões de **workspace**

---

## 🚀 Instalação

Clone o repositório e instale as dependências de cada módulo:

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd rios.store-theme-v2

# Instale as dependências da raiz
yarn install

# Instale em cada sub-módulo
cd store && yarn install
cd ../components && yarn install
cd ../backend && yarn install
cd ../checkout && yarn install
```

---

## 💻 Desenvolvimento

### Autenticando no VTEX Toolbelt

```bash
vtex login gruporios
vtex use <nome-do-workspace>
```

### Linkando os pacotes

Cada módulo deve ser linkado separadamente dentro do seu diretório:

```bash
# Linkar o backend (service)
cd backend
vtex link

# Linkar os componentes
cd ../components
vtex link

# Linkar o tema da loja
cd ../store
vtex link
```

> **Dica:** Para o desenvolvimento do `store`, o comando `yarn v-gulp` mantém os arquivos SCSS compilados e com watch ativo.

### Compilação SCSS (Store Theme)

```bash
cd store
yarn v-gulp
```

---

## 📐 Padrões de Código

O projeto adota as seguintes convenções:

- **Commits:** [Conventional Commits](https://www.conventionalcommits.org/) (ex: `feat:`, `fix:`, `style:`, `refactor:`)
- **TypeScript:** Tipagem estrita com interfaces baseadas nos tipos do VTEX IO
- **Linting:** ESLint + Prettier em todos os módulos
- **Estilos:** SCSS com CSS Handles para sobrescrita segura de estilos nativos VTEX

### Exemplo de commit

```bash
git commit -m "feat(components): adiciona componente CustomShippingBar"
git commit -m "fix(store): corrige layout do PDP em mobile"
git commit -m "style(checkout): ajusta cores do botão de finalizar compra"
```

---

## 🎨 Estilos e Design System

Os estilos ficam em `store/styles/scss/components/`. Cada app VTEX tem seu próprio arquivo SCSS:

| Arquivo                           | Escopo                                    |
| --------------------------------- | ----------------------------------------- |
| `gruporios.store-components.scss` | Componentes customizados do projeto       |
| `vtex.store-components.scss`      | Sobrescritas dos componentes nativos VTEX |
| `vtex.search-result.scss`         | Estilos da página de listagem (PLP)       |
| `vtex.product-summary.scss`       | Card de produto na vitrine                |
| `vtex.minicart.scss`              | Estilos do minicart                       |
| `vtex.login.scss`                 | Modal e fluxo de login                    |
| `vtex.rich-text.scss`             | Estilização de rich text                  |
| `vtex.modal-layout.scss`          | Modais genéricos                          |

---

## 🔌 Integrações Backend

O serviço `gruporios.service` (em `/backend`) expõe resolvers GraphQL e integrações com:

- **VTEX OMS / Checkout API** — Gestão de pedidos e carrinho
- **VTEX Catalog API** — Dados de produto e categoria
- **VTEX Session** — Sessão e segmentação de usuário
- **VTEX VBase** — Armazenamento chave-valor persistente
- **VTEX GraphQL Server** — Resolução de queries customizadas

---

## 📋 Scripts Disponíveis

### Store Theme (`/store`)

```bash
yarn v-gulp        # Compila e observa arquivos SCSS
vtex link          # Linka o tema no workspace ativo
vtex deploy        # Publica a versão no workspace de produção
```

### Components (`/components`)

```bash
vtex link          # Linka os componentes no workspace
yarn lint          # Valida o código com ESLint
yarn format        # Formata o código com Prettier
```

### Backend (`/backend`)

```bash
vtex link          # Linka o serviço no workspace
yarn test          # Executa os testes unitários (Jest)
yarn lint          # Valida o código com ESLint
```

### Checkout (`/checkout`)

```bash
yarn build         # Gera o bundle final para o checkout
yarn test          # Executa os testes unitários (Jest)
```

---

## 🧪 Testes

Os módulos `backend` e `checkout` possuem testes unitários com **Jest**:

```bash
# Testes do backend
cd backend && yarn test

# Testes do checkout
cd checkout && yarn test
```

---

## 📄 Licença

Uso interno — **Grupo Rios**. Todos os direitos reservados.
