import test from 'ava';
import { dev } from '@liquify/ava/parser';
import { LiquidParser } from '@liquify/liquid-parser';

export const parser = new LiquidParser({ engine: 'shopify' });

test('develop', async t => {

  await dev(t)(async text => {

    const doc = parser.scan(
      {
        languageId: 'liquid',
        version: 1,
        text,
        uri: 'test.liquid'
      }
    );

    // THIS IS AST
    // console.log(doc);

    // THIS IS A NODE
    // console.log(doc.getNodeAt(300));

    // THIS IS ERRORS
    console.log(doc.errors);

    // THIS RETURNS THE STRING OF ERROR DETERMINED
    console.log(doc.getText(doc.errors[0].range));

  });

});
