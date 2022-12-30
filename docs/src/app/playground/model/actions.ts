import type { Options } from '@liquify/prettify';
import type { State, Rulesets } from './types';
import merge from 'mergerino';
import moloko from '@liquify/moloko';

export function actions (state: State) {

  /**
   * Merges the combined rulesets into the formal Prettify
   * compliant (accepted) options. Deconstructs the `global`
   * grouped rules and returns an immutable valid copy.
   */
  function mergeOptions ({ global, liquid, markup, script, style, json }: Rulesets) {

    return merge<Options>(
      state.options
      , global
      ,
      {
        markup
        , liquid
        , script
        , style
        , json
      }
    );
  }

  /**
   * Executes format, this is triggered each time
   * rules are augmented.
   */
  function format (rules: Rulesets) {

    state.loading = true;
    state.error = '';
    state.options = mergeOptions(rules);

    console.log(state.options);

    return moloko.beautify(state.options);

  };

  return {

    format

  };
};
