import { File } from '../interfaces/File';

export const sortFile = (files: File[]): File[] => files.sort((a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0));
