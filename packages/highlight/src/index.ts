import { POTION_THEME } from './theme';
import { highlight, HighlightOptions } from 'cli-highlight';
import * as liquid from './liquid';

export default function (text: string, options: HighlightOptions = {}) {

  Object.assign<HighlightOptions, HighlightOptions>(options, {
    theme: POTION_THEME,
    language: 'html'
  });

  const syntax = highlight(text, options);

  if (options.language !== 'html') return syntax;

  return liquid.tags(syntax);

}
