import { File } from '../interfaces/File';

export const sortFile = (files: File[]): File[] => {
  return [...files].sort((a, b) => {
    const aParts = a.name.split('/');
    const bParts = b.name.split('/');
    if (aParts.length !== bParts.length) {
      return bParts.length - aParts.length;
    }
    return a.name.localeCompare(b.name);
  });
};
