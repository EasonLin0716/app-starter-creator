import { MainLibraryEnum } from '../enums/DepEnums';
import { Tool } from './Tool';

export interface MakeHTML {
  entryID?: string;
  mainLibrary: MainLibraryEnum;
  tool: Tool;
}
