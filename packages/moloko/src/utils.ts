import { Languages } from 'types';

const extmap = {
  '.liquid': 'liquid',
  '.js.liquid': 'liquidjs',
  '.ts.liquid': 'liquidts',
  '.css.liquid': 'liquidcss',
  '.scss.liquid': 'liquidscss',
  '.js': 'javascript',
  '.ts': 'typescript',
  '.css': 'css',
  '.html': 'html',
  '.jsx': 'jsx',
  '.scss': 'scss',
  '.tsx': 'tsx',
  '.json': 'json',
  '.md': 'markdown',
  '.xml': 'xml',
  '.yaml': 'yaml',
  '.txt': 'text'
};

export const extlang = {
  liquid: '.liquid',
  javascript: '.js',
  typescript: '.ts',
  css: '.css',
  html: '.html',
  jsx: '.jsx',
  scss: '.scss',
  tsx: '.tsx',
  json: '.json',
  markdown: '.md',
  xml: '.xml',
  yaml: '.yaml',
  txt: '.text'
};

export function ext (filename: string) {

  return filename.slice(filename.lastIndexOf('.'));

}

export function langmap (extension: string): false | Languages {

  if (extension in extmap) return extmap[extension];

  return false;

}

export function ghissue (options = {}) {

  const url = new URL('https://github.com/panoply/esthetic/issues/new');

  const types = [
    'body',
    'title',
    'labels',
    'template',
    'milestone',
    'assignee',
    'projects'
  ];

  for (const type of types) {

    let value = options[type];

    if (value === undefined) continue;

    if (type === 'labels' || type === 'projects') {
      if (!Array.isArray(value)) throw new TypeError(`The \`${type}\` option should be an array`);
      value = value.join(',');
    }

    url.searchParams.set(type, value);

  }

  return url.toString();
}

export function normal (path: string, stripTrailing: boolean = true) {

  if (typeof path !== 'string') throw new TypeError('expected path to be a string');
  if (path === '\\' || path === '/') return '/';

  const len = path.length;

  if (len <= 1) return path;

  let prefix = '';

  if (len > 4 && path[3] === '\\') {

    const ch = path[2];

    if ((ch === '?' || ch === '.') && path.slice(0, 2) === '\\\\') {
      path = path.slice(2);
      prefix = '//';
    }
  }

  const segs = path.split(/[/\\]+/);

  if (stripTrailing !== false && segs[segs.length - 1] === '') segs.pop();

  return prefix + segs.join('/');
}
