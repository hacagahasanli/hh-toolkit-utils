import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/_global.ts',
    'src/lib/_global.ts',
    'src/utils/_global.ts',
    'src/hooks/_global.ts',
    'src/constants/_global.ts',
    'src/constants/_global.ts',
  ],
  format: ['esm', 'cjs'],
  dts: {
    compilerOptions: {
      moduleResolution: 'bundler',
    },
  },
  clean: true,
  sourcemap: true,
  minify: false, // keep readable for internal use
  outDir: 'dist',
  onSuccess: 'copyfiles -u 1 "src/styles/**/*.css" dist',
  ignoreWatch: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', 'src/__tests__'],
});
