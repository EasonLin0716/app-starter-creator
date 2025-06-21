export const generateImportStatements = (imports: Array<{ name: string; as?: string; type?: boolean; default?: boolean; library?: string }>) => {
  return imports
    .map(({ name, as, type, default: isDefault, library }) => {
      let importStatement = 'import ';

      if (type) {
        importStatement += 'type ';
      }

      if (isDefault) {
        importStatement += 'default ';
      }

      if (as) {
        importStatement += as;
      } else {
        importStatement += name;
      }

      if (library) {
        importStatement += ` from '${library}'`;
      }

      return importStatement + ';';
    })
    .join('\n');
};

export const generateExportStatements = (exports: Array<{ name: string }>) => {
  return exports.map(({ name }) => {
    return `export default ${name};`;
  });
};
