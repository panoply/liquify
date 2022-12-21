import { IEngine } from '@liquify/liquid-parser';
import { IFormatting } from './formatting';

export interface ILiquidrc {
  engine: IEngine,
  paths: { [dirname: string]: string },
  format: IFormatting
}
