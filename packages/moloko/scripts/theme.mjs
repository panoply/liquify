import { join } from 'node:path';
import { writeFileSync } from 'node:fs';
import sass from 'sass';

const cwd = process.cwd();
const file = join(cwd, 'src/theme/potion.scss');
const { css } = sass.compile(file, { style: 'expanded' });
const make = 'module.exports = `' + css + '`;';

writeFileSync(join(cwd, 'src/build/theme/potion.css.js'), make);
