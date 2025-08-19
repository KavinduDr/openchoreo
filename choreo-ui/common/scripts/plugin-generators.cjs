const fs = require('fs');
const path = require('path');

/**
 * Simple template renderer - replaces {{variable}} with values from data object
 * @param {string} template - Template string with {{variable}} placeholders
 * @param {object} data - Data object with variable values
 * @returns {string} Rendered template
 */
function simpleTemplateRender(template, data) {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
        return data[key] !== undefined ? data[key] : match;
    });
}

/**
 * Converts PascalCase to kebab-case
 * @param {string} str - PascalCase string
 * @returns {string} kebab-case string
 */
function toKebabCase(str) {
    return str.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
}

/**
 * Converts PascalCase to display name with spaces
 * @param {string} str - PascalCase string
 * @returns {string} display name string
 */
function toDisplayName(str) {
    return str.replace(/([A-Z])/g, ' $1').trim();
}

/**
 * Renders a mustache template with provided data
 * @param {string} templateName - Name of the template file
 * @param {object} data - Data to render the template with
 * @returns {string} Rendered template content
 */
function renderTemplate(templateName, data) {
    const templatePath = path.join(__dirname, 'templates', templateName);
    const template = fs.readFileSync(templatePath, 'utf8');
    return simpleTemplateRender(template, data);
}

/**
 * Generates the package.json content for a plugin
 * @param {string} pluginName - Name of the plugin
 * @returns {string} Package.json content
 */
function generatePackageJson(pluginName) {
    const data = {
        kebabName: toKebabCase(pluginName),
        pluginName,
        displayName: toDisplayName(pluginName),
        camelName: pluginName[0].toLowerCase() + pluginName.slice(1)
    };
    return renderTemplate('package.json.mustache', data);
}

/**
 * Generates the tsconfig.json content for a plugin
 * @returns {string} tsconfig.json content
 */
function generateTsConfig() {
    return renderTemplate('tsconfig.json.mustache', {});
}

/**
 * Generates the eslint.config.js content for a plugin
 * @returns {string} eslint.config.js content
 */
function generateEslintConfig() {
    return renderTemplate('eslint.config.js.mustache', {});
}

/**
 * Generates the main index.ts content for a plugin
 * @returns {string} index.ts content
 */
function generateMainIndex() {
    return renderTemplate('index.ts.mustache', {});
}

/**
 * Generates the src/index.ts content for a plugin
 * @param {string} pluginName - Name of the plugin
 * @returns {string} src/index.ts content
 */
function generateSrcIndex(pluginName) {
    const data = {
        pluginName,
        displayName: toDisplayName(pluginName),
        camelName: pluginName[0].toLowerCase() + pluginName.slice(1)
    };
    return renderTemplate('src-index.ts.mustache', data);
}

/**
 * Generates the panel/index.tsx content for a plugin
 * @param {string} pluginName - Name of the plugin
 * @returns {string} panel/index.tsx content
 */
function generatePanelIndex(pluginName) {
    const data = {
        pluginName,
        pluginKey: pluginName.toLowerCase().replace(/([A-Z])/g, '-$1').toLowerCase()
    };
    return renderTemplate('panel-index.tsx.mustache', data);
}

/**
 * Generates the panel component content for a plugin
 * @param {string} pluginName - Name of the plugin
 * @returns {string} panel component content
 */
function generatePanelComponent(pluginName) {
    const data = {
        pluginName
    };
    return renderTemplate('panel-component.tsx.mustache', data);
}

/**
 * Generates the .gitignore content for a plugin
 * @returns {string} .gitignore content
 */
function generateGitignore() {
    return renderTemplate('gitignore.mustache', {});
}

/**
 * Generates all plugin files using templates
 * @param {string} pluginName - Name of the plugin
 * @param {string} outputPath - Path where the plugin files should be generated
 * @returns {object} Object containing all generated file contents
 */
function generateAllPluginFiles(pluginName, outputPath = null) {
    const files = {
        'package.json': generatePackageJson(pluginName),
        'tsconfig.json': generateTsConfig(),
        'eslint.config.js': generateEslintConfig(),
        'index.ts': generateMainIndex(),
        'src/index.ts': generateSrcIndex(pluginName),
        'src/panel/index.tsx': generatePanelIndex(pluginName),
        [`src/panel/${pluginName}Panel.tsx`]: generatePanelComponent(pluginName),
        '.gitignore': generateGitignore()
    };

    // If outputPath is provided, write files to disk
    if (outputPath) {
        const fs = require('fs');
        const path = require('path');
        
        // Create directories if they don't exist
        const srcDir = path.join(outputPath, 'src');
        const panelDir = path.join(srcDir, 'panel');
        
        if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath, { recursive: true });
        if (!fs.existsSync(srcDir)) fs.mkdirSync(srcDir, { recursive: true });
        if (!fs.existsSync(panelDir)) fs.mkdirSync(panelDir, { recursive: true });
        
        // Write files
        Object.entries(files).forEach(([fileName, content]) => {
            const filePath = path.join(outputPath, fileName);
            const dir = path.dirname(filePath);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            fs.writeFileSync(filePath, content);
        });
    }

    return files;
}

module.exports = {
    simpleTemplateRender,
    toKebabCase,
    toDisplayName,
    renderTemplate,
    generatePackageJson,
    generateTsConfig,
    generateEslintConfig,
    generateMainIndex,
    generateSrcIndex,
    generatePanelIndex,
    generatePanelComponent,
    generateGitignore,
    generateAllPluginFiles
}; 