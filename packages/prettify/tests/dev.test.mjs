import test from 'ava';
import { dev } from '@liquify/ava/prettify';
import prettify from '@liquify/prettify';

test('develop', async t => {

  await dev(t)(function (source) {

    // prettify.grammar({
    //   html: {
    //     embedded: {
    //       script: [
    //         {
    //           language: 'json',
    //           attribute: {
    //             type: [ 'application/ldss+json' ]
    //           }
    //         }
    //       ]
    //     }
    //   },
    //   liquid: {
    //     embedded: {
    //       capture: [
    //         {
    //           language: 'json',
    //           argument: [
    //             'json'
    //           ]
    //         }
    //       ],
    //       stylesheet: [
    //         {
    //           language: 'css',
    //           argument: [
    //             'foo'
    //           ]
    //         },
    //         {
    //           language: 'css',
    //           argument: [
    //             'foo',
    //             'fo',
    //             'foox'
    //           ]
    //         },
    //         {
    //           language: 'css',
    //           argument: [
    //             'foox'
    //           ]
    //         },
    //         {
    //           language: 'css',
    //           argument: /['"]scss['"]/
    //         }
    //       ]
    //     }
    //   }
    // });

    //  prettify.rules.listen((changed) => console.log(changed));

    // prettify.rules({
    //   language: 'liquid',
    //   preserveLine: 0,
    //   wrap: 0,
    //   liquid: {
    //     correct: false,
    //     valueForce: 'always',
    //     lineBreakSeparator: 'before',
    //     ignoreTagList: [ 'javascript' ]
    //   },
    //   json: {
    //     arrayFormat: 'indent',
    //     objectIndent: 'indent',
    //     braceAllman: true,
    //     objectSort: true,
    //     bracePadding: false

    //   },
    //   markup: {
    //     correct: true,
    //     delimiterForce: false,
    //     selfCloseSpace: true,
    //     forceAttribute: 3,
    //     forceIndent: true,
    //     forceLeadAttribute: false,
    //     ignoreJS: false,
    //     ignoreJSON: false,
    //     ignoreCSS: false
    //   },
    //   script: {
    //     correct: true,
    //     noSemicolon: true,
    //     vertical: true,
    //     braceAllman: false
    //   },
    //   style: {
    //     classPadding: true
    //   }
    // });

    prettify.grammar({
      liquid: {
        embedded: {
          capture: [
            {
              language: 'json',
              argument: [ 'json_tag' ]
            }
          ]
        }
      }
    });

    const output = prettify.format.sync(source, {
      language: 'liquid',
      markup: {
        forceAttribute: false
      }

    });

    return {
      repeat: 0,
      source: output,
      logger: false,
      finish: () => {
        t.log(output);
        t.log(prettify.stats);
      }
    };

  });

});
