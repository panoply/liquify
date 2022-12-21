import test from 'ava';
import { liquid, forSnippet, explore } from '@liquify/ava/parser';
import { LiquidParser } from '@liquify/liquid-parser';

export const parser = new LiquidParser(
  {
    engine: 'shopify',
    validate: {
      unknownObjects: true,
      unknownProperties: true
    }
  }
);

test('notations', t => {

  forSnippet(
    [
      // liquid`{{ object.property }}`
      // ,
      // liquid`{{ object.foo.bar.bar }}`
      // ,
      // liquid`{{ object['property']}}`
      // ,
      // liquid`{{ object.property['foo'] }}`
      // ,
      // liquid`{{ object.foo['bar'].baz['qux'] }}`
      // ,
      // liquid`{{ object['foo']['bar']['bax']['qux'] }}`
      // ,
      // liquid`{{ object[variable]['bar'].baz['qux'] }}`
      // ,
      // liquid`{{ object[var.prop[foo['bar']]] }}`
      // ,
      // liquid`{{ object.property[var.prop[foo['bar']].qux].baz }}`
      // ,
      // liquid`{{ object[0] }}`
      // ,
      liquid`{{ object.property  [  foo.bar[  baz  .qux  ]  ]  .prop[0] }}`
      ,
      liquid`{{ example.prop[nested.value['array'][0][1].foo].something[1] }}`
    ]
  )(function (sample) {

    explore.ast = parser.parse(sample);

    t.log(sample);

    explore.errors(t)(explore.ast);
    explore.stack([ 'objects' ]);

    t.pass();

    // t.snapshot(ast);

  });

});
