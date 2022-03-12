import { IMarkupOptions } from './markup';
import { IScriptOptions } from './script';
import { IStyleOptions } from './style';
import { IJSONOptions } from './json';

interface IGlobalOptions {
  markup: IMarkupOptions,
  style: IStyleOptions,
  script: IScriptOptions,
  json: IJSONOptions
}

export { IGlobalOptions, IJSONOptions, IMarkupOptions, IStyleOptions, IScriptOptions };
