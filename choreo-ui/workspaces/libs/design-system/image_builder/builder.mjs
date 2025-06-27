import fse from 'fs-extra';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import path from 'path';
import { fileURLToPath } from 'url';
import Mustache from 'mustache';
import { glob } from 'glob';
import { optimize } from 'svgo';
import Queue from './Queue.mjs';

// ES modules don't have __dirname, so we need to create it
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function defaultDestRewriter(svgPathObj, options) {
  let fileName = svgPathObj.base;
  if (options.fileSuffix) {
    fileName.replace(options.fileSuffix, '.svg');
  } else {
    fileName = fileName.replace('.svg', '.tsx');
  }
  fileName = fileName.replace(/(^.)|(_)(.)/g, (match, p1, p2, p3) =>
    (p1 || p3).toUpperCase()
  );
  return fileName;
}

const svgoC = {
  floatPrecision: 4,
  plugins: [
    { name: 'cleanupAttrs' },
    { name: 'removeDoctype' },
    { name: 'removeXMLProcInst' },
    { name: 'removeComments' },
    { name: 'removeMetadata' },
    { name: 'removeTitle' },
    { name: 'removeDesc' },
    { name: 'removeUselessDefs' },
    { name: 'removeXMLNS' },
    { name: 'removeEditorsNSData' },
    { name: 'removeEmptyAttrs' },
    { name: 'removeHiddenElems' },
    { name: 'removeEmptyText' },
    { name: 'removeEmptyContainers' },
    // { name: 'removeViewBox' },
    // { name: 'cleanupEnableBackground' },
    // { name: 'minifyStyles' },
    // { name: 'convertStyleToAttrs' },
    // {
    //   name: 'convertColors',
    //   params: {
    //     currentColor: true,
    //   },
    // },
    { name: 'convertPathData' },
    { name: 'convertTransform' },
    { name: 'removeUnknownsAndDefaults' },
    { name: 'removeNonInheritableGroupAttrs' },
    {
      name: 'removeUselessStrokeAndFill',
      params: {
        // https://github.com/svg/svgo/issues/727#issuecomment-303115276
        removeNone: true,
      },
    },
    { name: 'removeUnusedNS' },
    { name: 'cleanupIds' },
    { name: 'cleanupNumericValues' },
    { name: 'cleanupListOfValues' },
    { name: 'moveElemsAttrsToGroup' },
    { name: 'moveGroupAttrsToElems' },
    { name: 'collapseGroups' },
    { name: 'removeRasterImages' },
    { name: 'mergePaths' },
    { name: 'convertShapeToPath' },
    { name: 'sortAttrs' },
    { name: 'removeDimensions' },
    {
      name: 'removeAttrs',
      params: {
        attrs: ['style'],
      },
    },
    { name: 'removeElementsByAttr' },
    { name: 'removeStyleElement' },

    { name: 'removeScriptElement' },
  ],
};

/**
 * Return Pascal-Cased component name.
 *
 * @param {string} destPath
 * @returns {string} class name
 */
function getComponentName(destPath) {
  const splitregex = new RegExp(`[\\${path.sep}-]+`);
  const parts = destPath
    .replace('.tsx', '')
    .split(splitregex)
    .map((part) => part.charAt(0).toUpperCase() + part.substring(1));

  return parts.join('');
}

async function generateIndex(options) {
  const files = await glob(path.join(options.outputDir, '*.tsx'));
  const index = files
    .map((file) => {
      const typename = path.basename(file).replace('.tsx', '');
      // Convert to camel case - first replace spaces with hyphens, then convert to camel case
      const camelCaseName = typename
        .replace(/\s+/g, '') // Replace spaces with hyphens
        .replace(/-([a-z])/g, (match, letter) => letter.toUpperCase()); // Convert to camel case
      return `export { default as Image${camelCaseName} } from './${typename}';\n`;
    })
    .join('');

  await fse.writeFile(path.join(options.outputDir, 'index.ts'), index);
}

// Noise introduced by Google by mistake
const noises = [
  ['="M0 0h24v24H0V0zm0 0h24v24H0V0z', '="'],
  ['="M0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0z', '="'],
];

function removeNoise(input, prevInput = null) {
  if (input === prevInput) {
    return input;
  }

  let output = input;

  noises.forEach(([search, replace]) => {
    if (output.indexOf(search) !== -1) {
      output = output.replace(search, replace);
    }
  });

  return removeNoise(output, input);
}

async function cleanPaths({ svgPath, data }) {
  // Remove hardcoded color fill before optimizing so that empty groups are removed
  const input = data
    .replace(/ fill="#010101"/g, '')
    .replace(/<rect fill="none" width="24" height="24"\/>/g, '')
    .replace(/<rect id="SVGID_1_" width="24" height="24"\/>/g, '');

  const result = await optimize(input, svgoC);

  // Extract the paths from the svg string
  // Clean xml paths
  // TODO: tmkasun test and change class to className
  let paths = result.data
    .replace(/<svg[^>]*>/g, '')
    .replace(/<\/svg>/g, '')
    .replace(/"\/>/g, '" />')
    .replace(/fill-opacity=/g, 'fillOpacity=')
    .replace(/xlink:href=/g, 'xlinkHref=')
    .replace(/class=/g, 'className=')
    .replace(/clip-rule=/g, 'clipRule=')
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/ clip-path=".+?"/g, '') // Fix visibility issue and save some bytes.
    .replace(/<clipPath.+?<\/clipPath>/g, ''); // Remove unused definitions

  const sizeMatch = svgPath.match(/^.*_([0-9]+)px.svg$/);
  const size = sizeMatch ? Number(sizeMatch[1]) : null;

  if (size !== 24) {
    const scale = Math.round((24 / size) * 100) / 100; // Keep a maximum of 2 decimals
    paths = paths.replace('clipPath="url(#b)" ', '');
  }

  paths = removeNoise(paths);

  // Add a fragment when necessary.
  if ((paths.match(/\/>/g) || []).length > 1) {
    paths = `<React.Fragment>${paths}</React.Fragment>`;
  }

  return paths;
}

async function worker({ svgPath, options, renameFilter, template }) {
  process.stdout.write('.');

  const normalizedSvgPath = path.normalize(svgPath);
  const svgPathObj = path.parse(normalizedSvgPath);

  const destPath = renameFilter(svgPathObj, options);

  const outputFileDir = options.outputDir;
  const exists2 = await fse.exists(outputFileDir);

  if (!exists2) {
    console.log(`Making dir: ${outputFileDir}`);
    fse.mkdirpSync(outputFileDir);
  }

  const data = await fse.readFile(svgPath, { encoding: 'utf8' });
  const paths = await cleanPaths({ svgPath, data });

  const fileString = Mustache.render(template, {
    paths,
    componentName: getComponentName(destPath),
  });

  const absDestPath = path.join(options.outputDir, destPath);
  await fse.writeFile(absDestPath, fileString);
}

async function main(options) {
  try {
    let originalWrite;
    options.glob = './**/*.svg';
    options.innerPath = '';
    options.disableLog = false;
    options.outputDir = '../src/Images/generated/';
    options.svgDir = '../src/Images/svgs';
    const localOutputDir = path.join(__dirname, options.outputDir);
    options.outputDir = localOutputDir;
    // rimraf.sync(`${localOutputDir}/*.tsx`); // Clean old files
    // rimraf.sync(`${localOutputDir}/*.ts`); // Clean old files
    // rimraf.sync(`${localOutputDir}/*.js`); // Clean old files

    const exists1 = await fse.exists(localOutputDir);
    if (!exists1) {
      await fse.mkdir(localOutputDir);
    }
    const [svgPaths, template] = await Promise.all([
      glob(path.join(__dirname, options.svgDir, options.glob)),
      fse.readFile(path.join(__dirname, 'utils/SvgIcon.template'), {
        encoding: 'utf8',
      }),
    ]);

    const queue = new Queue(
      (svgPath) =>
        worker({
          svgPath,
          options,
          renameFilter: defaultDestRewriter,
          template,
        }),
      { concurrency: 8 }
    );

    queue.push(svgPaths);
    await queue.wait({ empty: true });

    // let legacyFiles = await glob(path.join(__dirname, '/legacy', '*.js'));
    // legacyFiles = legacyFiles.map((file) => path.basename(file));
    // let generatedFiles = await glob(path.join(options.outputDir, '*.js'));
    // generatedFiles = generatedFiles.map((file) => path.basename(file));

    // if (intersection(legacyFiles, generatedFiles).length > 0) {
    //   console.warn(intersection(legacyFiles, generatedFiles));
    //   throw new Error('Duplicated icons in legacy folder');
    // }

    // await fse.copy(path.join(__dirname, '/legacy'), options.outputDir);
    // await fse.copy(path.join(__dirname, '/custom'), options.outputDir);

    await generateIndex(options);

    if (options.disableLog) {
      // bring back stdout
      process.stdout.write = originalWrite;
    }
  } catch (err) {
    console.log(err);
  }
}

/** 
    .demand('output-dir')
    .demand('svg-dir')

 * 
 * 
*/
// In ESM, this is how we check if file is being run directly
const scriptPath = fileURLToPath(import.meta.url);
const isMainModule = process.argv[1] === scriptPath;

if (isMainModule) {
  // Use yargs with ESM syntax
  yargs(hideBin(process.argv))
    .usage("Build JSX components from SVG's.\nUsage: $0")
    .command(
      '$0',
      'Build SVG icons',
      () => {},
      (argv) => {
        main(argv);
      }
    )
    .parse();
}
