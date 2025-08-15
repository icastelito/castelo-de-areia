# Castelo de Areia 🏰

Um blog pessoal elegante e moderno para compartilhar poesias, contos, músicas e reflexões, com uma área administrativa completa para gerenciamento de conteúdo.

## ✨ Funcionalidades

### 🌟 Área Pública
- **Página inicial** com listagem de todos os posts
- **Visualização de posts** em páginas individuais  
- **Sistema de busca** por título, conteúdo, tags ou autor
- **Filtros por tipo** (poemas, contos, músicas, pensamentos, filosofia)
- **Design responsivo** com tema Y2K futurista
- **Componente especial** para renderização de poemas
- **Navegação por páginas** (ao invés de SPA)

### 🔐 Área Administrativa
- **Sistema de autenticação** com usuário e senha
- **Dashboard administrativo** com estatísticas
- **CRUD completo** para posts (Criar, Ler, Atualizar, Deletar)
- **Editor avançado** com campos específicos por tipo de post
- **Sistema de tags** dinâmico
- **Metadados automáticos** (contagem de versos, palavras, etc.)
- **Backup e restauração** via export/import JSON
- **Armazenamento local** através de localStorage

### 🎨 Design e UX
- **Tema Y2K** com elementos neon e glass morphism
- **Animações fluidas** e efeitos visuais
- **Elementos flutuantes** decorativos
- **Responsivo** para desktop, tablet e mobile
- **Tipografia elegante** com fontes personalizadas

## 🚀 Tecnologias Utilizadas

- **React 19.1.1** - Framework principal
- **TypeScript** - Tipagem estática
- **React Router DOM** - Navegação e roteamento
- **Vite** - Build tool e desenvolvimento
- **CSS3** - Estilização com CSS Variables e Flexbox/Grid
- **localStorage** - Persistência de dados local

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.tsx      # Proteção de rotas administrativas
│   ├── layout/
│   │   ├── Header.tsx              # Cabeçalho com navegação
│   │   ├── Header.css
│   │   └── Layout.tsx              # Layout principal
│   ├── posts/
│   │   ├── PostCard.tsx            # Card de post para listagem
│   │   ├── PostCard.css
│   │   ├── PoemRenderer.tsx        # Renderizador especial para poemas
│   │   └── PoemRenderer.css
│   └── ui/
│       ├── FloatingElements.tsx    # Elementos decorativos
│       └── FloatingElements.css
├── contexts/
│   ├── AuthContext.tsx             # Contexto de autenticação
│   └── ThemeContext.tsx            # Contexto de tema
├── hooks/
│   └── usePosts.ts                 # Hook para gerenciar posts
├── pages/
│   ├── HomePage.tsx                # Página inicial pública
│   ├── HomePage.css
│   ├── PostPage.tsx                # Página de visualização de post
│   ├── PostPage.css
│   ├── AdminLoginPage.tsx          # Login administrativo
│   ├── AdminLoginPage.css
│   ├── AdminDashboard.tsx          # Dashboard administrativo
│   ├── AdminDashboard.css
│   ├── AdminPostForm.tsx           # Formulário de posts
│   ├── AdminPostForm.css
│   ├── NotFoundPage.tsx            # Página 404
│   └── NotFoundPage.css
├── services/
│   └── PostService.ts              # Serviço de gerenciamento de posts
├── styles/
│   └── y2k-theme.css              # Tema principal Y2K
├── types/
│   └── Post.ts                     # Tipos TypeScript
└── data/
    └── posts.ts                    # Dados iniciais (legacy)
```

## 🔧 Instalação e Execução

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

4. **Acesse o aplicativo:**
   - Área pública: `http://localhost:5173`
   - Área administrativa: `http://localhost:5173/admin/login`

## 🔐 Credenciais Administrativas

Para acessar a área administrativa, use:
- **Usuário:** `admin`
- **Senha:** `castelo123`

> ⚠️ **Importante:** Em produção, altere essas credenciais no arquivo `src/contexts/AuthContext.tsx`

## 📝 Como Usar

### Criando um Novo Post

1. Acesse a área administrativa (`/admin/login`)
2. Faça login com as credenciais
3. No dashboard, clique em "✨ Criar Novo Post"
4. Preencha os campos:
   - **Título:** Nome do post
   - **Tipo:** Escolha entre poema, conto, música, pensamento ou filosofia
   - **Conteúdo:** Texto principal do post
   - **Tags:** Palavras-chave para categorização
   - **Metadados:** Informações específicas do tipo (versos, palavras, BPM, etc.)

### Editando Posts

1. No dashboard administrativo, clique no ícone de edição (✏️) do post desejado
2. Modifique os campos necessários
3. Clique em "Atualizar"

### Fazendo Backup

1. No dashboard, clique em "📥 Exportar Posts"
2. Um arquivo JSON será baixado com todos os posts
3. Para restaurar, use "📤 Importar Posts" e cole o conteúdo do JSON

## 🎨 Personalização

### Alterando o Tema

O tema pode ser customizado editando as variáveis CSS em `src/styles/y2k-theme.css`:

```css
:root {
  --neon-pink: #ff1493;
  --neon-cyan: #00bfff;
  --neon-green: #39ff14;
  --neon-purple: #8a2be2;
  /* ... outras variáveis */
}
```

### Adicionando Novos Tipos de Post

1. Atualize o tipo `PostType` em `src/types/Post.ts`
2. Adicione o novo tipo nos formulários e filtros
3. Crie renderizadores específicos se necessário

## 🚀 Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

## 📱 Responsividade

O aplicativo é totalmente responsivo e funciona em:
- 🖥️ Desktop (1200px+)
- 💻 Laptop (768px - 1199px)
- 📱 Tablet (481px - 767px)
- 📱 Mobile (até 480px)

## 🔄 Fluxo de Dados

1. **Carregamento inicial:** Posts são carregados do `public/posts.json`
2. **Modificações:** Alterações são salvas no `localStorage`
3. **Persistência:** Dados persistem entre sessões do navegador
4. **Backup:** Export/import para transferência entre dispositivos

## 🛡️ Segurança

- **Autenticação simples** para área administrativa
- **Rotas protegidas** com `ProtectedRoute`
- **Validação de dados** nos formulários
- **Sanitização** de entradas do usuário

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🎭 Autor

**Ícaro Castelo**
- GitHub: [@icastelito](https://github.com/icastelito)

---

*"Palavras são areia que o vento leva, mas algumas conseguem construir castelos que resistem ao tempo."*
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
