# Snapshot report for `tests/cases/javascript.test.mjs`

The actual snapshot is saved in `javascript.test.mjs.snap`.

Generated by [AVA](https://avajs.dev).

## Preserve Comments

> ### Snapshot 1
> Tests block comment indentations. All block comments should indent and align with the tokens the exist above of.
> ```js
> {
>   "preserveComment": false,
>   "script": {
>     "braceNewline": false
>   }
> }
> ```

    `const object = {␊
    ␊
      /**␊
       * Some comment␊
       */␊
      foo: 'bar',␊
    ␊
      /** nested comment */␊
      foo: {␊
    ␊
        /**␊
         * Nested comment␊
         */␊
        nested: [␊
          1, 2, 3, 4␊
        ],␊
    ␊
        /**␊
         * A function comment␊
         */␊
        function: () => {␊
    ␊
          /**␊
           * Variable comment annotation,␊
           * We are spanning multiple lines here.␊
           */␊
          const x = 'foo'␊
    ␊
          // Single line commment␊
          // another single line comment␊
          function x() {}␊
    ␊
        }␊
      }␊
    ␊
    }␊
    ␊
    /**␊
     * Comments␊
     * Comments␊
     */␊
    function() {␊
    ␊
      /** jsdoc inline wrap comment */␊
      let x = 'foo'␊
    ␊
    }`

> ### Snapshot 2
> Tests block comment indentations. All block comments should indent and align with the tokens the exist above of.
> ```js
> {
>   "preserveComment": true,
>   "script": {
>     "braceNewline": false
>   }
> }
> ```

    `const object = {␊
    ␊
      /**␊
       * Some comment␊
       */␊
      foo: 'bar',␊
    ␊
      /** nested comment */␊
      foo: {␊
    ␊
        /**␊
         * Nested comment␊
         */␊
        nested: [␊
          1, 2, 3, 4␊
        ],␊
    ␊
        /**␊
         * A function comment␊
         */␊
        function: () => {␊
    ␊
          /**␊
           * Variable comment annotation,␊
           * We are spanning multiple lines here.␊
           */␊
          const x = 'foo'␊
    ␊
          // Single line commment␊
          // another single line comment␊
          function x() {}␊
    ␊
        }␊
      }␊
    ␊
    }␊
    ␊
    /**␊
     * Comments␊
     * Comments␊
     */␊
    function() {␊
    ␊
      /** jsdoc inline wrap comment */␊
      let x = 'foo'␊
    ␊
    }`

## Inline Return

> ### Snapshot 1
> Tests `inlineReturn` beautification rule.
> ```js
> {
>   "attemptCorrection": false,
>   "indentSize": 2,
>   "script": {
>     "braceNewline": false,
>     "inlineReturn": true,
>     "elseNewline": false
>   }
> }
> ```

    `function() {␊
    ␊
      if (x === true) ␊
        return 'x'␊
       else ␊
        return x␊
    ␊
      ␊
    ␊
    }␊
    ␊
    ␊
    function() {␊
    ␊
      if (x === true) {␊
        if (x) {␊
          foo␊
        } else if (xx) {␊
    ␊
          if (x) {␊
            if (foo) {␊
              return x␊
            }␊
          }␊
    ␊
          if (y) ␊
            return d␊
          ␊
        }␊
      } else {␊
        return x␊
      }␊
    }␊
    ␊
    ␊
    function() {␊
    ␊
      if (foo === true) ␊
        return 'x'␊
      ␊
      if (bar === true) ␊
        return 'x'␊
      ␊
      if (baz === true) ␊
        return 'x'␊
    ␊
      ␊
    ␊
      return x␊
    ␊
    }␊
    ␊
    function() {␊
    ␊
      if (y === 1) {␊
        x = f␊
      } else if (f === 22) {␊
        x = 1;␊
      } else {␊
        return x␊
        if (1 === 4) {␊
          return x␊
        } else if (2) {␊
          if (3) ␊
            return foo;␊
           else ␊
            return xx;␊
          ␊
    ␊
        }␊
      }␊
    ␊
    }␊
    ␊
    ␊
    function() {␊
    ␊
      if (foo === true) ␊
        return 'x'␊
      ␊
      if (bar === true) ␊
        return 'x'␊
      ␊
      if (baz === true) ␊
        return 'x'␊
    ␊
      ␊
    ␊
      if (x === true && y === false) {␊
        return 'x'␊
      }␊
    ␊
      if (y === 1) {␊
        x = f␊
      } else if (f === 2) {␊
        x = 1␊
      } else {␊
        return x␊
        if (x === 4) {␊
          return x␊
        } else if (9) {␊
          if (xs) {␊
            return f9␊
          } else {␊
            return x9␊
          }␊
        }␊
      }␊
    ␊
      if (d === c) {␊
        f == 2;␊
        for (let x in {foo: bar, doo: yoo}) {␊
          g = x␊
          if (g === 'ff') ␊
            return g␊
          ␊
        }␊
        return x␊
      }␊
    ␊
    ␊
      if (y === 1) {␊
        x = f␊
      } else if (ctype === 'string') {␊
        string();␊
      } else if (ctype.indexOf('template_string') === 0) ␊
        return x␊
    ␊
      ␊
    ␊
    }`

> ### Snapshot 2
> Tests `inlineReturn` beautification rule.
> ```js
> {
>   "attemptCorrection": true,
>   "indentSize": 2,
>   "script": {
>     "braceNewline": false,
>     "inlineReturn": true,
>     "elseNewline": false
>   }
> }
> ```

    `function() {␊
    ␊
      if (x === true) ␊
        return 'x'␊
       else ␊
        return x␊
    ␊
      ␊
    ␊
    }␊
    ␊
    ␊
    function() {␊
    ␊
      if (x === true) {␊
        if (x) {␊
          foo␊
        } else if (xx) {␊
    ␊
          if (x) {␊
            if (foo) {␊
              return x␊
            }␊
          }␊
    ␊
          if (y) ␊
            return d␊
          ␊
        }␊
      } else {␊
        return x␊
      }␊
    }␊
    ␊
    ␊
    function() {␊
    ␊
      if (foo === true) ␊
        return 'x'␊
      ␊
      if (bar === true) ␊
        return 'x'␊
      ␊
      if (baz === true) ␊
        return 'x'␊
    ␊
      ␊
    ␊
      return x␊
    ␊
    }␊
    ␊
    function() {␊
    ␊
      if (y === 1) {␊
        x = f␊
      } else if (f === 22) {␊
        x = 1;␊
      } else {␊
        return x␊
        if (1 === 4) {␊
          return x␊
        } else if (2) {␊
          if (3) ␊
            return foo;␊
           else ␊
            return xx;␊
          ␊
    ␊
        }␊
      }␊
    ␊
    }␊
    ␊
    ␊
    function() {␊
    ␊
      if (foo === true) ␊
        return 'x'␊
      ␊
      if (bar === true) ␊
        return 'x'␊
      ␊
      if (baz === true) ␊
        return 'x'␊
    ␊
      ␊
    ␊
      if (x === true && y === false) {␊
        return 'x'␊
      }␊
    ␊
      if (y === 1) {␊
        x = f␊
      } else if (f === 2) {␊
        x = 1␊
      } else {␊
        return x␊
        if (x === 4) {␊
          return x␊
        } else if (9) {␊
          if (xs) {␊
            return f9␊
          } else {␊
            return x9␊
          }␊
        }␊
      }␊
    ␊
      if (d === c) {␊
        f == 2;␊
        for (let x in {foo: bar, doo: yoo}) {␊
          g = x␊
          if (g === 'ff') ␊
            return g␊
          ␊
        }␊
        return x␊
      }␊
    ␊
    ␊
      if (y === 1) {␊
        x = f␊
      } else if (ctype === 'string') {␊
        string();␊
      } else if (ctype.indexOf('template_string') === 0) ␊
        return x␊
    ␊
      ␊
    ␊
    }`

## Object Sorting

> ### Snapshot 1
> Tests `object` sorting or property keys. Sorting will apply alphabetical ordering. This case also tests against non-english letters.
> ```js
> {
>   "indentSize": 4,
>   "script": {
>     "objectSort": true,
>     "objectIndent": "indent"
>   },
>   "style": {
>     "sortProperties": true
>   }
> }
> ```

    `const A_Z = {␊
        a: 4,␊
        b: 16,␊
        c: 9,␊
        e: 11,␊
        f: 10,␊
        g: 5,␊
        h: 17,␊
        j: 18,␊
        k: 20,␊
        m: 19,␊
        n: 12,␊
        o: 21,␊
        r: 13,␊
        t: 14,␊
        u: 6,␊
        v: 1,␊
        w: 15,␊
        x: 7,␊
        x: 8,␊
        y: 3,␊
        z: 2,␊
        ä: 23,␊
        ö: 22␊
    };␊
    ␊
    const inArray = [␊
        {␊
            a: 4,␊
            b: 16,␊
            c: 9,␊
            e: 11,␊
            f: 10,␊
            g: 5,␊
            h: 17,␊
            j: 18,␊
            k: 20,␊
            m: 19,␊
            n: 12,␊
            o: 21,␊
            r: 13,␊
            t: 14,␊
            u: 6,␊
            v: 1,␊
            w: 15,␊
            x: 7,␊
            x: 8,␊
            y: 3,␊
            z: 2,␊
            ä: 23,␊
            ö: 22␊
        }, {␊
            a: 4,␊
            b: 16,␊
            c: 9,␊
            e: 11,␊
            f: 10,␊
            g: 5,␊
            h: 17,␊
            j: 18,␊
            k: 20,␊
            m: 19,␊
            n: 12,␊
            o: 21,␊
            r: 13,␊
            t: 14,␊
            u: 6,␊
            v: 1,␊
            w: 15,␊
            x: 7,␊
            x: 8,␊
            y: 3,␊
            z: 2,␊
            ä: 23,␊
            ö: 22␊
        }␊
    ]␊
    ␊
    ␊
    function inFunction() {␊
    ␊
        const number = {␊
            a: 4,␊
            b: 16,␊
            c: 9,␊
            e: 11,␊
            f: 10,␊
            g: 5,␊
            h: 17,␊
            j: 18,␊
            k: 20,␊
            m: 19,␊
            n: 12,␊
            o: 21,␊
            r: 13,␊
            t: 14,␊
            u: 6,␊
            v: 1,␊
            w: 15,␊
            x: 7,␊
            x: 8,␊
            y: 3,␊
            z: 2,␊
            ä: 23,␊
            ö: 22␊
        }␊
    }`

> ### Snapshot 2
> Tests `object` sorting or property keys. Sorting will apply alphabetical ordering. This case also tests against non-english letters.
> ```js
> {
>   "attemptCorrection": false,
>   "indentSize": 2,
>   "script": {
>     "objectSort": false,
>     "objectIndent": "indent"
>   },
>   "style": {
>     "sortProperties": false
>   }
> }
> ```

    `const A_Z = {␊
      v: 1,␊
      z: 2,␊
      y: 3,␊
      a: 4,␊
      g: 5,␊
      u: 6,␊
      x: 7,␊
      x: 8,␊
      c: 9,␊
      f: 10,␊
      e: 11,␊
      n: 12,␊
      r: 13,␊
      t: 14,␊
      w: 15,␊
      b: 16,␊
      h: 17,␊
      j: 18,␊
      m: 19,␊
      k: 20,␊
      o: 21,␊
      ö: 22,␊
      ä: 23␊
    };␊
    ␊
    const inArray = [␊
      {␊
        v: 1,␊
        z: 2,␊
        y: 3,␊
        a: 4,␊
        g: 5,␊
        u: 6,␊
        x: 7,␊
        x: 8,␊
        c: 9,␊
        f: 10,␊
        e: 11,␊
        n: 12,␊
        r: 13,␊
        t: 14,␊
        w: 15,␊
        b: 16,␊
        h: 17,␊
        j: 18,␊
        m: 19,␊
        k: 20,␊
        o: 21,␊
        ö: 22,␊
        ä: 23␊
      }, {␊
        v: 1,␊
        z: 2,␊
        y: 3,␊
        a: 4,␊
        g: 5,␊
        u: 6,␊
        x: 7,␊
        x: 8,␊
        c: 9,␊
        f: 10,␊
        e: 11,␊
        n: 12,␊
        r: 13,␊
        t: 14,␊
        w: 15,␊
        b: 16,␊
        h: 17,␊
        j: 18,␊
        m: 19,␊
        k: 20,␊
        o: 21,␊
        ö: 22,␊
        ä: 23␊
      }␊
    ]␊
    ␊
    ␊
    function inFunction() {␊
    ␊
      const number = {␊
        v: 1,␊
        z: 2,␊
        y: 3,␊
        a: 4,␊
        g: 5,␊
        u: 6,␊
        x: 7,␊
        x: 8,␊
        c: 9,␊
        f: 10,␊
        e: 11,␊
        n: 12,␊
        r: 13,␊
        t: 14,␊
        w: 15,␊
        b: 16,␊
        h: 17,␊
        j: 18,␊
        m: 19,␊
        k: 20,␊
        o: 21,␊
        ö: 22,␊
        ä: 23␊
      }␊
    }`