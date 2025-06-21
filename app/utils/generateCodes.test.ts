import { describe, expect, it } from 'vitest';
import { generateExportStatements, generateImportStatements } from './generateCodes';

describe('generateImportStatements', () => {
  it('should return the correct imports', () => {
    const imports = generateImportStatements([{ name: 'react', as: 'React', type: true, default: true, library: 'react' }]);
    expect(imports).toBe(`import type default React from 'react';`);
  });
});

describe('generateExportStatements', () => {
  it('should return the correct exports', () => {
    const exports = generateExportStatements([{ name: 'react' }]);
    expect(exports).toEqual(['export default react;']);
  });
});
