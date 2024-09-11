import * as esbuild from 'esbuild';
import * as fs from 'fs/promises';

async function build() {
  // Build the project using CommonJS
  await esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    outdir: 'dist',
    platform: 'node',
    format: 'cjs', // Change to CommonJS format
  });

  const packageJson = {
    scripts: {
      start: 'node index.js',
    },
    type: 'commonjs', // Ensure this is set correctly
  };

  await fs.writeFile('dist/package.json', JSON.stringify(packageJson, null, 2));

  console.log('Build completed successfully.');
}

build();
