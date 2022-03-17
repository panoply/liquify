import path from 'path';
import { globby } from 'globby';

export default function watch ({ assets = [] }) {

  const curried = f => x => f(x);
  const resolve = curried(path.resolve);

  return {
    name: 'watch',
    async load () {

      const watcher = assetPath => this.addWatchFile(assetPath);

      (await globby(assets)).map(resolve).forEach(watcher);
    }
  };
}
