import chalk from 'chalk';
import { POTION_THEME } from './theme';

const COMMENT = /(?:(?:\x9B|\x1B\[)[0-?]*[ -\\/]*[@-~])*?{%(?:(?:\x9B|\x1B\[)[0-?]*[ -\\/]*[@-~])*-?(?:(?:\x9B|\x1B\[)[0-?]*[ -\\/]*[@-~])*\s*comment[\s\S]+?endcomment[^}]*%}(?:(?:\x9B|\x1B\[)[0-?]*[ -\\/]*[@-~])*/gm

const LINE_COMMENT = /(?:(?:\x9B|\x1B\[)[0-?]*[ -\\/]*[@-~])*?{%(?:(?:\x9B|\x1B\[)[0-?]*[ -\\/]*[@-~])*-?(?:(?:\x9B|\x1B\[)[0-?]*[ -\\/]*[@-~])*\s*#[^}]*%}(?:(?:\x9B|\x1B\[)[0-?]*[ -\\/]*[@-~])*/gm

/**
 * Strip Ansi
 */
const strip = (token: string) => token.replace(/(\x9B|\x1B\[)[0-?]*[ -\\/]*[@-~]/g, ''); // eslint-disable-line

/**
 * Properties Colouring
 */
const props = (token: string) => chalk.hex('#81D4FA')(token);

/**
 * Logical Colouring
 */
const logical = (token: string) => POTION_THEME.keyword(strip(token));

/**
 * Operator Colouring
 */
const operators = (token: string) => chalk.hex('#FF91E3')(token);

/**
 * Boolean Colouring
 */
const boolean = (token: string) => POTION_THEME.literal(strip(token));

/**
 * String Colouring
 */
const strings = (token: string) => POTION_THEME.string(strip(token));

/**
 * Filter Colouring
 */
const filters = (token: string) => chalk.hex('#5CD7E')(token);

/**
 * Keyword Colouring
 */
const keyword = (token: string) => POTION_THEME.keyword(token);

/**
 * Delimiter Colouring
 */
const delimiters = (token: string) => {

  if (token === '{%-') return `${chalk.gray('{%')}${POTION_THEME.keyword('-')}`;
  if (token === '{{-') return `${chalk.gray('{{')}${POTION_THEME.keyword('-')}`;
  if (token === '-}}') return `${POTION_THEME.keyword('-')}${chalk.gray('}}')}`;
  if (token === '-%}') return `${POTION_THEME.keyword('-')}${chalk.gray('%}')}`;

  return chalk.gray(token);

};

function inner (token: string) {
  return token
    .replace(/\s*[a-zA-Z._]+/, keyword)
    .replace(/(?<=[|,])\s*[a-zA-Z_]*(?=:?)/g, filters)
    .replace(/[a-zA-Z_]+?\s*(?=[[.])/, props)
    .replace(/[|,.:]/g, logical)
    .replace(/(?:=|[!=]=|[<>]=?|\b(?:and|or|contains|with|in|null|with|as)\b)/g, operators)
    .replace(/["'].*?["']/g, strings)
    .replace(/#[\s\S]*/, POTION_THEME.comment);

}

function objects (token: string) {
  return token
    .replace(/(?<=[|,])\s*[a-zA-Z_]*(?=:?)/g, filters)
    .replace(/[a-zA-Z_]+?\s*(?=[[.])/, props)
    .replace(/[|,.:]/g, logical)
    .replace(/["'].*?["']/g, strings);

}

export function tags (content: string) {

  const color = content
    .replace(/(?<={%-?)[\s\S]+?(?=-?%})/g, inner)
    .replace(/(?<={{-?)[\s\S]+?(?=-?}})/g, objects)
    .replace(/\b(null|false|nil|true|empty)\b/g, boolean)
    .replace(/{[{%]-?|-?[%}]}/g, delimiters)


  return color
    .replace(COMMENT, m => chalk.gray(strip(m)))
    .replace(LINE_COMMENT, m => chalk.gray(strip(m)))


}
