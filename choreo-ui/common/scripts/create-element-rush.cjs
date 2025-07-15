/**
 * Script to create a new design system element with all necessary files.
 * @module create-element-rush
 */

const fs = require('fs');
const path = require('path');
const {
    generateComponentContent,
    generateStyledContent,
    generateStoriesContent,
    generateTestContent,
    generateViewContent,
    generateViewStoriesContent
} = require('./element-generators.cjs');

/**
 * @typedef {Object} ElementConfig
 * @property {string} type - The type of element (e.g., 'component', 'layout')
 * @property {string} name - The name of the element
 */

/**
 * Validates command line arguments and returns element configuration
 * @returns {ElementConfig}
 * @throws {Error} If required arguments are missing
 */
function parseCommandLineArgs() {
    const typeIndex = process.argv.findIndex((arg) => arg === '--type' || arg === '-t');
    const nameIndex = process.argv.findIndex((arg) => arg === '--name' || arg === '-n');

    if (typeIndex === -1 || nameIndex === -1) {
        throw new Error(
            'Missing required arguments.\n' +
            'Usage: rushx create --type <type> --name <elementName>\n' +
            'Example: rushx create --type components --name Button'
        );
    }

    const type = process.argv[typeIndex + 1];
    const name = process.argv[nameIndex + 1];

    if (!type || !name) {
        throw new Error('Both type and name arguments are required.');
    }

    // Validate element name format (PascalCase)
    if (!/^[A-Z][a-zA-Z0-9]*$/.test(name)) {
        throw new Error('Element name must be in PascalCase format (e.g., Button, DataTable)');
    }

    return { type, name };
}

/**
 * Creates directory if it doesn't exist
 * @param {string} dirPath - Directory path to create
 * @throws {Error} If directory creation fails
 */
function createDirectory(dirPath) {
    try {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    } catch (error) {
        throw new Error(`Failed to create directory ${dirPath}: ${error.message}`);
    }
}

function getProjectPath(type) {
    if(type === 'layout' || type === 'component') {
        const projectPath = path.resolve(__dirname, '../../workspaces/libs/design-system/src', type + 's');
        return projectPath;    
    }
    if(type === 'common-view' || type === 'resource-view') {
        const projectPath = path.resolve(__dirname, `../../workspaces/libs/${type}s/src`);
        return projectPath;
    }
    if (!fs.existsSync(projectPath)) {
        throw new Error('Project path does not exist. Please ensure you are in the correct directory.');
    }
}

/**
 * Creates a new element with all necessary files
 * @param {ElementConfig} config - Element configuration
 */
function createElement({ type, name }) {
    try {
        // Setup paths
        const baseDir = path.resolve(__dirname, getProjectPath(type));
        const elementDir = path.join(baseDir, name);

        // Create directories
        createDirectory(elementDir);

        // Define file paths
        const files = {
            component: path.join(elementDir, `${name}.tsx`),
            styled: path.join(elementDir, `${name}.styled.tsx`),
            stories: path.join(elementDir, `${name}.stories.tsx`),
            test: path.join(elementDir, `${name}.test.tsx`),
            index: path.join(elementDir, 'index.tsx'),
        };

        // Write files
        if(type === 'component' || type === 'layout') {
          fs.writeFileSync(files.component, generateComponentContent(name));
          fs.writeFileSync(files.styled, generateStyledContent(name));
          fs.writeFileSync(files.stories, generateStoriesContent(name));
          fs.writeFileSync(files.test, generateTestContent(name));
          fs.writeFileSync(files.index, `export { ${name} } from './${name}';\n`);
        }
        if(type === 'common-view' || type === 'resource-view') {
            fs.writeFileSync(files.component, generateViewContent(name));
            fs.writeFileSync(files.stories, generateViewStoriesContent(name));
            fs.writeFileSync(files.index, `export { ${name} } from './${name}';\n`);
        }

        // Update main index file
        const mainIndexPath = path.join(baseDir, 'index.tsx');
        const exportStatement = `export * from './${name}';\n`;
        
        if (fs.existsSync(mainIndexPath)) {
            fs.appendFileSync(mainIndexPath, exportStatement);
        } else {
            fs.writeFileSync(mainIndexPath, exportStatement);
        }

        console.log(`✨ Successfully created ${name} ${type}.`);

    } catch (error) {
        console.error('❌ Error creating element:', error.message);
        process.exit(1);
    }
}

// Execute the script
try {
    const config = parseCommandLineArgs();
    createElement(config);
} catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
}