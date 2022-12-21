import test from 'ava';
import { dev } from '@liquify/ava/prettify';
import prettify from '@liquify/prettify';

test('develop', async t => {

  await dev(t)(async (source) => {

    const output = prettify.formatSync(source, {
      language: 'liquid',
      markup: {
        selfCloseSpace: true,
        forceAttribute: false,
        forceLeadAttribute: false
      }

    });

    return {
      repeat: 0,
      source: output,
      logger: false,
      finish: () => t.log(output)
    };

  });

});
