import test from 'ava';
import { dev, explore } from '@liquify/ava/parser';
import { LiquidParser } from '@liquify/liquid-parser';

export const parser = new LiquidParser({ engine: 'shopify' });

test('develop', async t => {

  await dev(t)(async text => {

    explore.ast = parser.scan(
      {
        languageId: 'liquid',
        version: 1,
        text,
        uri: 'test.liquid'
      }
    );

    // THIS IS AST
    explore.stack([ 'filters', 'objects', 'arguments', 'scope' ]);

    // THIS IS A NODE
    // console.log(doc.getNodeAt(300));

    // THIS IS ERRORS
    console.log(explore.ast.errors);

    // THIS RETURNS THE STRING OF ERROR DETERMINED
    // console.log(doc.getText(doc.errors[0].range));

  });

});
