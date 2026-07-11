# OHINO-S

**Understanding Beyond Words**

An offline-first, modular AI ecosystem with a scalable OHINO Core Engine designed to provide personalized, context-aware assistance across multiple knowledge domains.

## Vision

OHINO-S empowers users and their children through intelligent, locally-run AI modules that understand context, preferences, and growth trajectories. Each module operates independently while benefiting from a shared, unified Core Engine.

## Architecture

- **Modular Design**: Plug-and-play modules for different knowledge domains
- **Offline-First**: Works without internet; sync when possible
- **Local Storage**: All data persists locally with user privacy
- **Reusable Components**: Shared UI component library
- **Scalable Core**: Central OHINO Core Engine serving multiple modules
- **Plugin System**: Module registration and dynamic loading

## Knowledge Domains

- 📚 **Education**: Learning support and tutoring
- 🎯 **Special Needs**: Specialized assistance and resources
- 💬 **Relationships**: Social and interpersonal guidance
- 🚀 **Motivation**: Goal-setting and encouragement
- 💪 **Health**: Wellness and lifestyle support
- 💻 **Technology**: Tech learning and troubleshooting
- 📖 **Bible Study**: Spiritual learning and reflection
- 🎨 **Creativity**: Creative expression and projects

## Project Structure

```
OHINO-S/
├── packages/
│   ├── core/                    # OHINO Core Engine
│   │   ├── engine/             # AI provider & context management
│   │   ├── storage/            # Local database & caching
│   │   ├── memory/             # Conversation & user memory
│   │   └── config/             # Core configuration
│   │
│   ├── ui-components/          # Reusable component library
│   │   ├── atoms/              # Basic UI elements
│   │   ├── molecules/          # Combined components
│   │   ├── organisms/          # Complex components
│   │   └── themes/             # Styling & themes
│   │
│   ├── navigation/             # App navigation system
│   │   ├── router/             # Route definitions
│   │   └── middleware/         # Navigation guards
│   │
│   ├── auth/                   # User & profile management
│   │   ├── user-profiles/      # User & child profiles
│   │   └── settings/           # User preferences
│   │
│   ├── prompts/                # Prompt management system
│   │   ├── templates/          # Prompt templates
│   │   ├── categories/         # Knowledge category prompts
│   │   └── management/         # Prompt versioning
│   │
│   └── modules/                # Application modules
│       ├── education/
│       ├── special-needs/
│       ├── relationships/
│       ├── motivation/
│       ├── health/
│       ├── technology/
│       ├── bible-study/
│       └── creativity/
│
├── apps/
│   ├── desktop/                # Electron desktop app
│   ├── mobile/                 # React Native mobile app
│   └── web/                    # Web PWA
│
└── docs/                       # Documentation
```

## Key Features

### 1. Modular Architecture
Each module is self-contained with its own UI, prompts, and logic while leveraging the shared Core Engine.

### 2. Local Storage & Settings
- User profiles and preferences stored locally
- Child profile management
- Offline-first sync strategy

### 3. AI Provider Connection Layer
- Support for multiple AI providers
- Fallback mechanisms
- Local LLM support (Ollama, etc.)

### 4. Conversation Management
- Local conversation history
- Search and filtering
- Memory systems for context

### 5. Prompt Management
- Category-specific prompt templates
- Version control for prompts
- Dynamic prompt injection

### 6. Plugin System
- Module registration
- Dependency management
- Hot loading support

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm or npm
- Git

### Installation

```bash
git clone https://github.com/elanspeks/OHINO-S.git
cd OHINO-S
pnpm install
```

### Development

```bash
# Run core development
pnpm -F core dev

# Run UI components storybook
pnpm -F ui-components dev

# Run desktop app
pnpm -F desktop dev

# Run web app
pnpm -F web dev
```

### Build

```bash
pnpm build
```

## Technology Stack

### Core
- **Runtime**: Node.js / Bun
- **Language**: TypeScript
- **Storage**: SQLite / IndexedDB
- **AI**: LiteLLM / LangChain

### UI
- **Framework**: React / Vue
- **Styling**: Tailwind CSS / Panda CSS
- **Components**: Shadcn/ui

### Apps
- **Desktop**: Electron / Tauri
- **Mobile**: React Native / Expo
- **Web**: Vite + React

### Development
- **Monorepo**: pnpm workspaces
- **Build**: Turbo
- **Testing**: Vitest, Playwright

## Security & Privacy

- **Local First**: No mandatory cloud sync
- **User Control**: Full data ownership
- **Encryption**: Optional end-to-end encryption for sensitive data
- **Audit Logs**: Track all AI interactions locally

## Roadmap

- [ ] Core Engine v1.0
- [ ] UI Component Library
- [ ] Education Module
- [ ] User & Profile Management
- [ ] Conversation History & Memory
- [ ] Prompt Management System
- [ ] Special Needs Module
- [ ] Relationships Module
- [ ] Motivation Module
- [ ] Health Module
- [ ] Technology Module
- [ ] Bible Study Module
- [ ] Creativity Module
- [ ] Desktop App (Electron)
- [ ] Mobile App (React Native)
- [ ] Web PWA

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT

## Contact & Support

- GitHub Issues: [Report bugs](https://github.com/elanspeks/OHINO-S/issues)
- Discussions: [Join community](https://github.com/elanspeks/OHINO-S/discussions)

---

**OHINO-S: Understanding Beyond Words** 🌟
