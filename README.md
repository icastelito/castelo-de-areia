# 🏰 Castelo de Areia


Um blog pessoal para compartilhar poesias, contos, músicas e reflexões, construído com React e TypeScript. Apresenta um design futurístico inspirado no estilo Y2K e uma área administrativa completa para gerenciamento de conteúdo.

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF?style=for-the-badge&logo=vite)
![React Router](https://img.shields.io/badge/React_Router-7.8.0-CA4245?style=for-the-badge&logo=react-router)

## ✨ Funcionalidades

### 🌟 **Área Pública**
- **📚 Página inicial** com listagem completa de posts
- **📄 Visualização individual** de posts em páginas dedicadas
- **🔍 Sistema de busca** avançado (título, conteúdo, tags, autor)
- **🏷️ Filtros por tipo** (poemas, contos, músicas, pensamentos, filosofia)
- **📱 Design responsivo** com tema Y2K futurista
- **✨ Efeitos visuais** com partículas flutuantes animadas
- **🎨 Renderizador especial** para poemas e diferentes tipos de conteúdo

### 🔐 **Área Administrativa**
- **🛡️ Sistema de autenticação** seguro
- **📊 Dashboard** com estatísticas em tempo real
- **📝 CRUD completo** para posts (Criar, Ler, Atualizar, Deletar)
- **📑 Editor avançado** com campos específicos por tipo de post
- **🏷️ Sistema de tags** dinâmico e autocomplete
- **📈 Metadados automáticos** (contagem de versos, palavras, estrofes, etc.)
- **💾 Backup e restauração** via export/import JSON
- **🗄️ Armazenamento híbrido** (localStorage + JSON fallback)

### 🎨 **Design e UX**
- **🌈 Tema Y2K** com cores neon e glass morphism
- **⚡ Animações fluidas** e transições suaves
- **🎆 Partículas flutuantes** com cores dinâmicas
- **🌓 Modo escuro/claro** com alternância instantânea
- **📱 Totalmente responsivo** (desktop, tablet, mobile)
- **🎭 Tipografia elegante** com hierarquia visual clara
- **👻 Scrollbars invisíveis** para experiência imersiva

## 🚀 Tecnologias e Arquitetura

### **🔧 Core Technologies**
- **React 19.1.1** - Framework principal com Strict Mode
- **TypeScript 5.8.3** - Tipagem estática e desenvolvimento type-safe
- **React Router DOM 7.8.0** - Roteamento e navegação SPA
- **Vite 7.1.2** - Build tool ultra-rápido e HMR
- **React Icons 5.5.0** - Biblioteca de ícones SVG

### **🏗️ Arquitetura**
- **Padrão de composição** com componentes reutilizáveis
- **Context API** para gerenciamento de estado global
- **Custom Hooks** para lógica de negócio
- **Singleton Pattern** para serviços
- **CSS Modules** e CSS Variables para temas
- **Type-safe** em toda a aplicação

### **💾 Persistência de Dados**
- **🔄 Fake API** (desenvolvimento) usando JSON Server
- **📁 JSON File** como fallback para produção
- **🛡️ Sistema híbrido** com detecção automática de ambiente
- **📤 Export/Import** para backup e migração

## 📁 Estrutura do Projeto

```
📦 castelo-de-areia/
├── 📄 index.html                    # HTML principal com favicon customizado
├── 📄 vite.config.ts               # Configuração do Vite
├── 📄 tsconfig.json                # Configuração TypeScript
├── 📄 package.json                 # Dependências e scripts
├── 🏰 castle-favicon.svg           # Favicon personalizado
├── 📁 public/
│   ├── 📄 posts.json              # Dados iniciais dos posts
│   └── 🖼️ vite.svg                # Logo do Vite
└── 📁 src/
    ├── 📄 main.tsx                # Entry point da aplicação
    ├── 📄 App.tsx                 # Componente raiz com roteamento
    ├── 📄 App.css                 # Estilos globais da aplicação
    ├── 📄 index.css               # Reset CSS e estilos base
    ├── 📄 vite-env.d.ts           # Tipos do Vite
    ├── 📁 components/             # Componentes reutilizáveis
    │   ├── 📁 auth/
    │   │   └── 🛡️ ProtectedRoute.tsx     # HOC para rotas protegidas
    │   ├── 📁 layout/
    │   │   ├── 📄 Header.tsx             # Cabeçalho com navegação dinâmica
    │   │   ├── 🎨 Header.css             # Estilos do header
    │   │   └── 📄 Layout.tsx             # Layout principal da aplicação
    │   ├── 📁 posts/
    │   │   ├── 📄 PostCard.tsx           # Card para listagem de posts
    │   │   ├── 🎨 PostCard.css           # Estilos do card
    │   │   ├── 📄 PoemRenderer.tsx       # Renderizador especial para poemas
    │   │   └── 🎨 PoemRenderer.css       # Estilos do renderizador
    │   └── 📁 ui/
    │       ├── ✨ FloatingElements.tsx   # Partículas flutuantes animadas
    │       └── 🎨 FloatingElements.css   # Animações das partículas
    ├── 📁 contexts/
    │   ├── 🔐 AuthContext.tsx            # Context de autenticação
    │   └── 🌓 ThemeContext.tsx           # Context de tema (dark/light)
    ├── 📁 hooks/
    │   └── 📝 usePosts.ts                # Hook customizado para CRUD de posts
    ├── 📁 pages/
    │   ├── 🏠 HomePage.tsx               # Página inicial pública
    │   ├── 🎨 HomePage.css               # Estilos da página inicial
    │   ├── 📄 PostPage.tsx               # Página de visualização de post
    │   ├── 🎨 PostPage.css               # Estilos da página de post
    │   ├── 🔐 AdminLoginPage.tsx         # Página de login administrativo
    │   ├── 🎨 AdminLoginPage.css         # Estilos da página de login
    │   ├── 📊 AdminDashboard.tsx         # Dashboard administrativo
    │   ├── 🎨 AdminDashboard.css         # Estilos do dashboard
    │   ├── 📝 AdminPostForm.tsx          # Formulário de criação/edição
    │   ├── 🎨 AdminPostForm.css          # Estilos do formulário
    │   ├── ❌ NotFoundPage.tsx           # Página 404
    │   └── 🎨 NotFoundPage.css           # Estilos da página 404
    ├── 📁 services/
    │   └── 🔧 PostService.ts             # Serviço completo de CRUD
    ├── 📁 styles/
    │   └── 🌈 y2k-theme.css              # Tema Y2K com variáveis CSS
    ├── 📁 types/
    │   └── 📝 Post.ts                    # Tipos TypeScript para posts
    ├── 📁 data/
    │   └── 📄 posts.ts                   # Dados legacy (não usado)
    └── 📁 assets/
        └── 🖼️ react.svg                  # Logo do React
```

## 🛠️ Instalação e Execução

### **📋 Pré-requisitos**
- Node.js 18+ 
- npm ou yarn
- Git

### **🚀 Instalação**

1. **Clone o repositório:**
```bash
git clone https://github.com/icastelito/castelo-de-areia.git
cd castelo-de-areia
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Execute o servidor de desenvolvimento:**
```bash
npm run dev
```

4. **Acesse a aplicação:**
   - 🌐 **Área pública:** `http://localhost:5173`
   - 🔐 **Login administrativo:** `http://localhost:5173/admin/login`

### **📜 Scripts Disponíveis**

```bash
# Desenvolvimento com hot reload (apenas frontend)
npm run dev

# Desenvolvimento completo com fake API
npm run dev:full

# Executa apenas o JSON Server (fake API)
npm run json-server

# Build para produção
npm run build

# Preview da build de produção
npm run preview

# Linting do código
npm run lint
```

## 🌍 Ambientes de Execução

### **🔧 Desenvolvimento**
Em ambiente de desenvolvimento, use `npm run dev:full` para ter acesso completo à funcionalidades de CRUD:

```bash
npm run dev:full
```

Isso inicia:
- **📡 JSON Server** na porta 3001 (fake API)
- **⚡ Vite dev server** na porta 5173 (frontend)

**🔗 URLs disponíveis:**
- 🌐 **Frontend:** `http://localhost:5173`
- 📡 **API:** `http://localhost:3001/posts`  
- 🔐 **Admin:** `http://localhost:5173/admin/login`

### **🚀 Produção**
Em produção, a área administrativa é **automaticamente desabilitada** e os dados são servidos estaticamente do arquivo `posts.json`.

```bash
npm run build
npm run preview
```

## 🔐 Acesso Administrativo

### **⚠️ Disponibilidade**
A área administrativa está disponível **apenas em ambiente de desenvolvimento**. Em produção, todas as rotas de admin redirecionam automaticamente para a página inicial.

### **🗝️ Credenciais de Acesso (Desenvolvimento)**
- **👤 Usuário:** `admin`
- **🔒 Senha:** `castelo123`

### **🔧 Como Acessar**
1. **Execute o ambiente completo:** `npm run dev:full`
2. **Acesse:** `http://localhost:5173/admin/login`
3. **Faça login** com as credenciais acima

### **⚠️ Segurança**
> **Importante:** As credenciais estão definidas em `src/contexts/AuthContext.tsx`. Para uso real, implemente autenticação adequada.

### **🛡️ Funcionalidades Administrativas**
- Dashboard com estatísticas em tempo real
- Gerenciamento completo de posts (CRUD)
- Sistema de backup/restore
- Interface intuitiva e responsiva

## 📝 Como Usar

### **✍️ Criando um Novo Post**

1. **Acesse a área administrativa:** `/admin/login`
2. **Faça login** com as credenciais fornecidas
3. **No dashboard,** clique em "✨ Criar Novo Post"
4. **Preencha os campos:**
   - **📌 Título:** Nome descritivo do post
   - **🏷️ Tipo:** Escolha entre poema, conto, música, pensamento ou filosofia
   - **📝 Conteúdo:** Texto principal (suporte a quebras de linha)
   - **🏷️ Tags:** Palavras-chave separadas por vírgula
   - **👤 Autor:** Nome do autor (padrão: "Icaro Castelo")
   - **📊 Metadados:** Informações específicas do tipo selecionado

### **✏️ Editando Posts Existentes**

1. **No dashboard administrativo,** localize o post na tabela
2. **Clique no ícone de edição** (✏️) 
3. **Modifique** os campos necessários
4. **Salve** as alterações

### **🗑️ Removendo Posts**

1. **No dashboard,** clique no ícone de lixeira (🗑️)
2. **Confirme** a exclusão no modal
3. **⚠️ Atenção:** Esta ação não pode ser desfeita

### **💾 Backup e Restore**

#### **📥 Exportando Posts (Backup)**
1. **No dashboard,** clique em "📥 Exportar Posts"
2. **Um arquivo JSON** será baixado automaticamente
3. **Nome do arquivo:** `posts-backup-YYYY-MM-DD.json`

#### **📤 Importando Posts (Restore)**
1. **No dashboard,** clique em "📤 Importar Posts"
2. **Cole o conteúdo JSON** na área de texto
3. **Clique em "Importar"** para restaurar os dados
4. **⚠️ Importante:** Isso substituirá todos os posts existentes

## 🎨 Personalização

### **🌈 Customizando o Tema**

O tema pode ser personalizado editando as variáveis CSS em `src/styles/y2k-theme.css`:

```css
:root {
  /* Cores principais do tema */
  --neon-pink: #ff1493;
  --neon-cyan: #00bfff;
  --neon-green: #39ff14;
  --neon-purple: #8a2be2;
  --neon-red: #ff4757;
  
  /* Gradientes Y2K */
  --accent-primary: linear-gradient(45deg, #ff006e, #8338ec, #3a86ff);
  --accent-secondary: linear-gradient(45deg, #06ffa5, #00d4ff, #ff006e);
  
  /* Efeitos glass morphism */
  --bg-glass: rgba(255, 255, 255, 0.25);
  --backdrop-blur: blur(20px);
}
```

### **✨ Configurando Partículas Flutuantes**

Ajuste as partículas em `src/components/ui/FloatingElements.tsx`:

```typescript
// Número de partículas
const particleCount = 15;

// Variação de tamanhos (em pixels)
const minSize = 3;
const maxSize = 13;

// Cores das partículas
const colors = [
  'var(--neon-pink)',
  'var(--neon-cyan)',
  // ... adicione mais cores
];
```

### **📱 Responsividade**

O aplicativo é otimizado para todos os dispositivos:
- **🖥️ Desktop:** 1200px+
- **💻 Laptop:** 768px - 1199px  
- **📱 Tablet:** 481px - 767px
- **📱 Mobile:** até 480px

### **🔧 Adicionando Novos Tipos de Post**

1. **Atualize o tipo `PostType`** em `src/types/Post.ts`:
```typescript
export type PostType = 'poem' | 'story' | 'song' | 'thought' | 'philosophy' | 'newtype';
```

2. **Adicione o label** na função `getPostTypeLabel` em `AdminDashboard.tsx`:
```typescript
const labels = {
  // ... existentes
  newtype: 'Novo Tipo'
};
```

3. **Crie renderizadores específicos** se necessário

## 🏗️ Build e Deploy

### **📦 Build para Produção**

```bash
# Gerar build otimizada
npm run build

# Preview da build
npm run preview
```

Os arquivos otimizados serão gerados na pasta `dist/`.

### **🚀 Deploy Sugestões**

- **Netlify:** Ideal para SPAs React
- **Vercel:** Excelente integração com Vite
- **GitHub Pages:** Para projetos open source
- **Firebase Hosting:** Para projetos que evoluirão para backend

### **⚙️ Configurações de Deploy**

Para SPAs, configure redirects para `index.html`:

**Netlify** (`public/_redirects`):
```
/*    /index.html   200
```

**Vercel** (`vercel.json`):
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## 🔄 Fluxo de Dados

### **📊 Arquitetura de Dados**

```
graph TD
    A[📄 public/posts.json] --> B[🔧 PostService]
    B --> C[💾 localStorage]
    C --> B
    B --> D[🪝 usePosts Hook]
    D --> E[⚛️ React Components]
    E --> F[👤 User Interface]
    F --> E
    E --> D
    D --> B
```

### **🔄 Fluxo de Operações**

1. **📖 Carregamento inicial:** 
   - **Desenvolvimento:** Carrega da fake API (JSON Server)
   - **Produção:** Carrega do arquivo estático `posts.json`
2. **� Operações CRUD:** 
   - **Desenvolvimento:** Todas as operações via fake API
   - **Produção:** Apenas leitura (write operations desabilitadas)
3. **� Persistência:** Dados salvos na fake API durante desenvolvimento
4. **💼 Backup:** Export sempre disponível para backup dos dados
5. **🎯 Estado reativo:** Interface atualizada automaticamente via hooks

## 🛡️ Segurança e Validação

### **🔐 Autenticação**
- Sistema simples baseado em Context API
- Session persistente via localStorage
- Rotas protegidas com ProtectedRoute HOC
- Logout automático ao fechar navegador (opcional)

### **✅ Validação de Dados**
- Validação de formulários em tempo real
- Sanitização de entradas do usuário
- Verificação de integridade dos dados JSON
- Tratamento de erros robusto

### **🛡️ Boas Práticas Implementadas**
- Tipagem forte com TypeScript
- Separação de responsabilidades
- Error boundaries para componentes
- Código limpo e documentado

## 🧪 Desenvolvimento e Testes

### **🔧 Desenvolvimento Local**

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build e preview
npm run build && npm run preview
```

### **📝 Estrutura de Commits**

Seguimos convenções de commit semântico:
- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação de código
- `refactor:` Refatoração
- `test:` Testes
- `chore:` Tarefas de manutenção

### **🔍 Linting e Formatação**

```bash
# Verificar problemas de lint
npm run lint

# Configuração ESLint personalizada
eslint.config.js
```

## 🤝 Contribuição

### **🛠️ Como Contribuir**

1. **🍴 Fork** o projeto
2. **🌿 Crie** uma branch para sua feature:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **💾 Commit** suas mudanças:
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
4. **📤 Push** para a branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. **🔀 Abra** um Pull Request

### **📋 Guidelines de Contribuição**

- **✅ Código limpo** e bem documentado
- **📝 Commits semânticos** descritivos
- **🧪 Testes** para novas funcionalidades
- **📖 Documentação** atualizada
- **🎨 Seguir** padrões de design existentes

### **🐛 Reportando Bugs**

Use as [GitHub Issues](https://github.com/icastelito/castelo-de-areia/issues) com:
- **📝 Descrição detalhada** do problema
- **🔄 Passos** para reproduzir
- **🖥️ Ambiente** (OS, navegador, versão)
- **📸 Screenshots** se aplicável

## 🗺️ Roadmap

### **🚧 Próximas Funcionalidades**

- [ ] **🔍 Busca avançada** com filtros múltiplos
- [ ] **📊 Analytics** de visualizações de posts
- [ ] **💬 Sistema de comentários** 
- [ ] **📤 Compartilhamento** em redes sociais
- [ ] **🔊 Text-to-speech** para poemas
- [ ] **📱 Progressive Web App** (PWA)
- [ ] **🌐 Internacionalização** (i18n)
- [ ] **🎵 Player de áudio** para músicas
- [ ] **📚 Categorias hierárquicas**
- [ ] **🔐 Autenticação com OAuth**

### **🔧 Melhorias Técnicas**

- [ ] **⚡ Server-Side Rendering** (SSR)
- [ ] **💾 Banco de dados** real (PostgreSQL/MongoDB)
- [ ] **🔄 API REST** completa
- [ ] **🧪 Testes unitários** abrangentes
- [ ] **📊 Performance monitoring**
- [ ] **🔒 Segurança** aprimorada

## 📄 Licença

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para detalhes.

```
MIT License

Copyright (c) 2025 Ícaro Castelo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 👨‍💻 Autor

**Ícaro Castelo**
- 🌐 **GitHub:** [@icastelito](https://github.com/icastelito)
- 📧 **Email:** [i.castelobp@gmail.com](mailto:i.castelobp@gmail.com)
- 💼 **LinkedIn:** [Icaro Castelo](https://www.linkedin.com/in/icastelob/)


## 📚 Recursos Adicionais

### **📖 Documentação**
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Router](https://reactrouter.com/)

### **🎨 Design Resources**
- [Y2K Aesthetic Guide](https://y2kaesthetic.com/)
- [Glass Morphism Generator](https://glassmorphism.com/)
- [Neon Color Palettes](https://colorhunt.co/palettes/neon)

### **🛠️ Tools**
- [React Developer Tools](https://react.dev/learn/react-developer-tools)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [VS Code Extensions](https://code.visualstudio.com/docs/editor/extension-marketplace)

---

<div align="center">

**🏰 Castelo de Areia**


[![⭐ Star this repo](https://img.shields.io/github/stars/icastelito/castelo-de-areia?style=social)](https://github.com/icastelito/castelo-de-areia)
[![🍴 Fork this repo](https://img.shields.io/github/forks/icastelito/castelo-de-areia?style=social)](https://github.com/icastelito/castelo-de-areia/fork)
[![👀 Watch this repo](https://img.shields.io/github/watchers/icastelito/castelo-de-areia?style=social)](https://github.com/icastelito/castelo-de-areia)

**Feito com ❤️ e ☕ por [Ícaro Castelo](https://github.com/icastelito)**

