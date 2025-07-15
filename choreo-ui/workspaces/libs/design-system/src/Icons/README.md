# Choreo Console Icons

## Getting Started

To ensure the proper integration of new icons into the icon folder, please follow these steps:

### 1. Check the Icon Folder
Verify if the new icons are already present in the `src/components/ChoreoSystem/Icons/generated/` folder or by running Storybook.

### 2. Verify Icon Names
Ensure that there are no icons with conflicting names. If there are icons with the same name, confirm that they are intended for the same usage. If not, rename the icons accordingly.

### 3. Review SVG Icon Code
Inspect the SVG icon code and remove any unnecessary elements such as `rect`, `radialGradient`, `defs`, etc.

### 4. Upload Icons
Upload the icons to the `workspaces/libs/design-system/src/Icons/svgs/` folder. Please ensure that the SVG file names follow the CamelCase letter convention.

## Generate Icons

To generate the icons, follow these steps:

1. Run the command `rushx generate-icons`
2. Execute `rushx generate-icons-prettier:fix` to fix the prettier formatting
3. Remove the previously uploaded icons from the `workspaces/libs/design-system/src/Icons/svgs/` folder

Please adhere to these guidelines to maintain consistency and ensure the successful integration of new icons.

## Icon Guidelines

### Naming Convention
- Use CamelCase for icon file names (e.g., `UserProfile.svg`)
- Avoid special characters and spaces
- Use descriptive names that reflect the icon's purpose

### SVG Requirements
- Keep SVG code clean and minimal
- Remove unnecessary attributes and elements
- Ensure proper viewBox and dimensions
- Use consistent stroke and fill attributes

### File Organization
- Place source SVG files in `svgs/` directory
- Generated components will be in `generated/` directory
- Icons are automatically indexed for easy importing

## Usage

After generation, icons can be imported and used as React components:

```typescript
import { UserProfile, Settings, Dashboard } from '@openchoreo/design-system/Icons';

function MyComponent() {
  return (
    <div>
      <UserProfile size={24} />
      <Settings size={20} />
      <Dashboard size={32} />
    </div>
  );
}
```

## Available Icons

The design system includes a comprehensive set of icons covering:
- Navigation and UI elements
- Actions and controls
- Status indicators
- Data visualization
- System and settings

For a complete list of available icons, run Storybook and navigate to the Icons section.
