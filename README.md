# Interactive Service Blueprint Template

A reusable Vue 3 application for creating interactive service blueprints.

The blueprint layout and experience requirements are documented in [plan.md](plan.md).

## Technology

- Vue 3
- TypeScript
- Vite
- Vuetify 3
- Material Design Icons
- CSS Grid
- Local JSON data
- Local browser storage

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```text
src/
  components/
    blueprint/     Reusable blueprint display components
    editor/        Editing controls
  composables/     Shared blueprint state and storage logic
  data/            Sample blueprint content
  plugins/         Vuetify configuration
  types/           TypeScript data models
  utils/            Formatting and helper functions
  views/           Main application views
```

## Creating a New Blueprint

1. Duplicate this repository.
2. Replace the sample content in `src/data/blueprintData.json`.
3. Update the project details.
4. Run the application with `npm run dev`.
5. Use Edit mode to make changes in the browser.
6. Export the completed blueprint JSON when needed.

Blueprint edits are stored in the browser's localStorage.

Use **Reset** to restore the original sample blueprint.

## GitHub Template Usage

This repository is intended to be used as a GitHub Template Repository.

To create a new project:

1. Open the repository on GitHub.
2. Select **Use this template**.
3. Create a new repository for the project.
4. Clone the new repository locally.
5. Replace the sample blueprint data.
6. Customize the project details and content.

## Data

Project-specific blueprint content belongs in:

```text
src/data/blueprintData.json
```

Reusable layout and behavior belong in:

```text
src/components/
src/composables/
src/types/
```

Avoid placing project-specific copy directly inside reusable Vue components.
