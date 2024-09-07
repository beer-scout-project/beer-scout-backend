import * as esbuild from 'esbuild';
import * as fs from 'fs/promises';

async function build() {
  // Use esbuild to bundle and compile the TypeScript code
  await esbuild.build({
    entryPoints: ['src/index.ts'], // The entry point for the app (index.ts)
    bundle: true, // Bundle all dependencies into a single output
    outdir: 'dist', // Output the build files to the 'dist' folder
    platform: 'node',
    format: 'esm', // Ensure output format is ES module
  });

  const packageJson = {
    scripts: {
      start: 'node index.js',
    },
    type: 'module',
  };

  await fs.writeFile('dist/package.json', JSON.stringify(packageJson, null, 2));

  console.log('Build completed successfully.');
}

build();
