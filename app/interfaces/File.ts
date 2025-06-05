import { PrismLanguage } from './PrismLanguage';

export interface File {
  name: string;
  code: string;
  type: PrismLanguage;
}
