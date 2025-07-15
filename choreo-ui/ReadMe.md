# OpenChoreo Console

## Project Overview

**OpenChoreo Console** is the web-based user interface of OpenChoreo, a complete open-source Internal Developer Platform (IDP) built for platform engineering teams. It enables developers to build, deploy, and integrate projects seamlessly, while providing a unified portal experience that streamlines developer workflows and simplifies platform operations.

### Key Features
- **Unified Developer Portal**: Single interface for all development workflows
- **Plugin Architecture**: Extensible system for adding new functionality
- **Design System**: Consistent UI components and patterns
- **Internationalization**: Multi-language support

## File Structure

```
openchoreo/choreo-ui/
├── rush.json                           # Rush monorepo configuration
├── tsconfig.base.json                  # Base TypeScript configuration
├── eslint.config.base.cjs              # Base ESLint configuration
├── ReadMe.md                           # Project overview
├── common/                             # Shared configurations and utilities
│   ├── config/                         # Configuration files
│   │   └── rush/                       # Rush configuration
│   ├── git-hooks/                      # Git hook scripts
│   └── scripts/                        # Common utility scripts
│       ├── create-element-rush.cjs     # Element creation script
│       ├── create-plugin-rush.cjs      # Plugin creation script
│       ├── element-generators.cjs      # Element file generators
│       └── plugin-generators.cjs       # Plugin file generators
└── workspaces/                         # Main development workspace
    ├── apps/                           # Application projects
    │   └── console/                    # Main React shell application
    │
    ├── libs/                           # Shared libraries
    │   ├── design-system/              # UI component library
    │   ├── common-views/               # Shared view components
    │   ├── api-client/                 # API client library
    │   └── definitions/                # Type definitions
    │
    └── plugins/                        # Plugin modules
        ├── plugin-core/                # Core plugin functionality
        ├── top-right-menu/             # Top right menu plugin
        ├── top-level-selector/         # Top level selector plugin
        ├── choreo-context/             # Choreo context and state management plugin
        ├── overview/                   # Overview dashboard plugin
        └── resource-list/              # Resource list plugin
```
## Development Workflow

### Prerequisites
- Node.js 18.20.3+ or 20.14.0+ (LTS versions)
- pnpm package manager
- Rush CLI

### Initial Setup
```bash
# Clone the repository
git clone <repository-url>
cd choreo-ui

# Install dependencies
rush update --purge

# Build all packages
rush build
```

### Development Commands

#### General Rush Commands
```bash
rush update              # Install/update dependencies
rush build               # Build all packages
rush change              # Generate change files for versioning
rush publish             # Publish packages
```

#### Custom Rush Commands
The project includes custom Rush commands for creating new elements and plugins:

```bash
# Create new elements (components, views, layouts)
rush create -n <name> -t <type>

# Create new plugins
rush create-plugin -n <name>
```

**Element Types:**
- `component` - Create a new component in design system
- `view` - Create a new view module
- `layout` - Create a new layout component

**Examples:**
```bash
# Create a new button component
rush create -n Button -t component

# Create a new dashboard view
rush create -n Dashboard -t view

# Create a new sidebar layout
rush create -n Sidebar -t layout

# Create a new analytics plugin
rush create-plugin -n Analytics
```

#### Package-Specific Commands
```bash
# Console Application
cd workspaces/apps/console
rushx dev                # Start development server
rushx build              # Build the application
rushx lint               # Run linting
rushx mock-server        # Start mock API server (port 3001)

# Design System
cd workspaces/libs/design-system
rushx build              # Build design system
rushx storybook          # Start Storybook (port 6006)
rushx generate-icons     # Generate icon components
rushx generate-images    # Generate image components
rushx test               # Run tests

# Common Views
cd workspaces/libs/common-views
rushx build              # Build views library
rushx storybook          # Start Storybook
rushx test               # Run tests
```

### Adding Icons to Design System
1. Copy SVG files to `workspaces/libs/design-system/src/Icons/svgs/`
2. Run `rushx generate-icons` from the design-system directory
3. Icons will be automatically generated and available for import

### Adding Images to Design System
1. Copy SVG image files to `workspaces/libs/design-system/src/Images/svgs/`
2. Run `rushx generate-images` from the design-system directory
3. Image components will be automatically generated and available for import

### Internationalization
```bash
# Extract messages from source code
rushx i18n

# This generates/updates language files in src/lang/
```

## Plugin Architecture

The console uses a plugin-based architecture where functionality is distributed across independent modules:

### Core Plugins
- **Plugin Core**: Base plugin functionality and interfaces
- **Top Right Menu**: User menu and account-related features
- **Top Level Selector**: Navigation and project selection
- **API Client**: API communication and data management

### Plugin Development
1. Create new plugin using `rush create-plugin -n <PluginName>`
2. The command automatically:
   - Creates plugin directory structure
   - Generates package.json, tsconfig.json, eslint config
   - Creates main plugin files and panel components
   - Updates rush.json to include the new plugin
3. Implement plugin interface from plugin-core
4. Register plugin in console application
5. Add plugin to console dependencies

### Plugin Structure
```
workspaces/plugins/my-plugin/
├── src/
│   ├── panel/
│   │   ├── index.tsx           # Panel entry point
│   │   └── MyPluginPanel.tsx   # Main panel component
│   └── index.ts                # Plugin exports
├── package.json                # Plugin dependencies
├── tsconfig.json              # TypeScript configuration
├── eslint.config.js           # ESLint configuration
└── .gitignore                 # Git ignore patterns
```

## Code Quality Standards

### TypeScript
- Strict mode enabled
- Proper type definitions
- Interface-first development

### ESLint Configuration
- Base configuration in `eslint.config.base.cjs`
- Package-specific overrides
- Import ordering and formatting rules

### Code Style
- Prettier for code formatting
- Consistent naming conventions
- Component composition patterns

## Build and Deployment

### Development Build
```bash
rush build              # Build all packages
rushx dev               # Start development server
```

### Production Build
```bash
rush build              # Build all packages
rushx build             # Build specific package
```

### Mock Server
```bash
cd workspaces/apps/console
rushx mock-server       # Start mock API server on port 3001
```

## Contributing

### Development Guidelines
1. Follow TypeScript strict mode
2. Write unit tests for new components
3. Update Storybook documentation
4. Follow established component patterns
5. Use proper Git commit messages

### Creating New Elements
```bash
# Create new component
rush create -n MyComponent -t component

# Create new view
rush create -n MyView -t view

# Create new layout
rush create -n MyLayout -t layout
```

### Creating New Plugins
```bash
# Create new plugin
rush create-plugin -n MyPlugin

# After creation, install dependencies and build
rush install
rush build
```

## Asset Generation

### Icon Generation
The design system includes an automated icon generation system:

1. **Source**: Place SVG files in `workspaces/libs/design-system/src/Icons/svgs/`
2. **Generation**: Run `rushx generate-icons` from the design-system directory
3. **Output**: Generated React components in `workspaces/libs/design-system/src/Icons/generated/`
4. **Usage**: Import and use as React components

### Image Generation
The design system includes an automated image generation system:

1. **Source**: Place SVG image files in `workspaces/libs/design-system/src/Images/svgs/`
2. **Generation**: Run `rushx generate-images` from the design-system directory
3. **Output**: Generated React components in `workspaces/libs/design-system/src/Images/generated/`
4. **Usage**: Import and use as React components

### Asset Builder Features
- **Automatic TypeScript generation**: Creates typed React components
- **SVG optimization**: Optimizes SVG files during generation
- **Index file generation**: Automatically creates index files for easy imports
- **Template-based**: Uses Mustache templates for consistent component structure

## Troubleshooting

### Common Issues
1. **Dependency Issues**: Run `rush update --purge`
2. **Build Failures**: Check TypeScript errors and linting issues
3. **Plugin Loading**: Verify plugin registration in console
4. **Mock Server**: Ensure API specifications are valid
5. **Asset Generation**: Check SVG file format and paths

### Performance Optimization
- Use React.memo for expensive components
- Implement proper code splitting
- Optimize bundle size with tree shaking
- Profile application performance regularly

---

This developer guide provides a comprehensive overview of the OpenChoreo Console project structure, architecture, and development workflow. For specific implementation details, refer to the individual package documentation and source code. 