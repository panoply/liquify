import test from 'ava';
import { forSample } from '@liquify/ava/prettify';
import prettify from '@liquify/prettify';

test.skip('Embedded Template string expression', async t => {

  await forSample('cases/jsx')(
    [
      'template-literal-1'
    ]
    , async function (source) {

      await prettify.format(source, {
        language: 'jsx',
        markup: {
          forceAttribute: false,
          selfCloseSpace: true
        },
        script: {
          braceAllman: false,
          braceNewline: false,
          bracePadding: false,
          methodChain: 0
        }
      });

      // t.log(output);

      t.pass();
    }
  );

});
/*
test.skip('Embedded JSX Expressions', async t => {

  await samples.forTest('cases')(
    [
      'jsx/embedded-exp-1',
      'jsx/embedded-exp-2'
    ]
    , async function (description, source) {

      const output = await prettify.format(source, {
        language: 'jsx',
        markup: {
          forceAttribute: true,
          selfCloseSpace: true
        }
      });

      t.snapshot(output, description);

      t.log(output);

    }
  );

});
*/
