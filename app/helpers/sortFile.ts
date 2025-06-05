import { File } from '../interfaces/File';

export const sortFile = (files: File[]): File[] => files.sort((a, b) => a.name.toLowerCase().charCodeAt(0) - b.name.toLowerCase().charCodeAt(0));
