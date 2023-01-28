import test from 'ava';
import { forRules, forAssert, liquid } from '@liquify/ava/prettify';
import prettify from '@liquify/prettify';

test('Structure Test: singleton <path>', t => {

  forRules(
    [

      liquid`
        {% # paths expressed without closer %}

        <svg>
          <path d="M11.03 11.68A5.784">
          <path d="M11.03 11.68A5.784">
        </svg>
      `
      ,
      liquid`
        {% # first path using close tag and second using no closer %}

        <svg>
          <path d="M11.03 11.68A5.784"></path>
          <path d="M11.03 11.68A5.784">
        </svg>
      `
      ,
      liquid`
        {% # path expressed as void self closer %}

        <svg>
          <path d="M11.03 11.68A5.784" />
        </svg>
      `
      ,
      liquid`
        {% # path contained within symbol %}

        <svg>
          <symbol>
            <path d="M11.03 11.68A5.784">
          </symbol>
        </svg>
      `
      ,
      liquid`
        {% # path deeply nested within svg tokens %}

        <svg>
          <symbol>
            <g>
              <path d="M11.03 11.68A5.784">
              <path d="M11.03 11.68A5.784" />
              <path d="M11.03 11.68A5.784"></path>
            </g>
          </symbol>
        </svg>
      `
      ,
      liquid`
        {% # path deeply nested within HTML tokens %}

        <div>
          <ul>
            <li>
              <svg>
                <symbol>
                  <g>
                    <path d="M11.03 11.68A5.784">
                    <path d="M11.03 11.68A5.784" />
                    <path d="M11.03 11.68A5.784"></path>
                  </g>
                </symbol>
              </svg>
            </li>
          </ul>
        </div>
     `
    ]
  )(
    {
      language: 'liquid',
      markup: {
        forceAttribute: false,
        selfCloseSVG: false
      }
    }
  )(function (source, rules) {

    const actual = prettify.format.sync(source, rules);

    t.deepEqual(actual, source);

  });
});

test('Structure Test: singleton <circle>', t => {

  forRules(
    [

      liquid`
        {% # circle path expressed without closer %}

        <svg>
          <circle cx="33" cy="33" r="33">
        </svg>
      `
      ,
      liquid`
        {% # circle paths expressed with closer and self closing %}

        <svg>
          <circle cx="33" cy="33" r="33"></circle>
          <circle cx="33" cy="33" r="33" />
        </svg>
      `
      ,
      liquid`
        {% # circle contained within symbol %}

        <svg>
          <symbol>
            <circle cx="33" cy="33" r="33">
          </symbol>
          <symbol>
            <circle cx="33" cy="33" r="33" />
          </symbol>
          <symbol>
            <circle cx="33" cy="33" r="33"></circle>
          </symbol>
        </svg>
      `
    ]
  )(
    {
      language: 'liquid',
      markup: {
        forceAttribute: false,
        selfCloseSVG: false
      }
    }
  )(function (source, rules) {

    const actual = prettify.format.sync(source, rules);

    t.deepEqual(actual, source);

  });
});

test('Structure Test: singleton <use>', t => {

  forRules(
    [

      liquid`
        {% # use path expressed without closer %}

        <svg>
          <use href="#xxx">
        </svg>
      `
      ,
      liquid`
        {% # use path expressed with self closer %}

        <svg>
          <use href="#xxx" />
        </svg>
      `
    ]
  )(
    {
      language: 'liquid',
      markup: {
        forceAttribute: false,
        selfCloseSVG: false
      }
    }
  )(function (source, rules) {

    const actual = prettify.format.sync(source, rules);

    t.deepEqual(actual, source);

  });
});

test('Structure Test: singleton <polygon>', t => {

  forRules(
    [

      liquid`
        {% # use polygon expressed without closer %}

        <svg>
          <polygon points="200,10 250,190 160,210">
        </svg>
      `
      ,
      liquid`
        {% # use polygon expressed with self closer %}

        <svg>
          <polygon points="200,10 250,190 160,210" />
        </svg>
      `
      ,
      liquid`
        {% # use polygon expressed with end tag %}

        <svg>
          <polygon points="200,10 250,190 160,210"></polygon>
        </svg>
     `
    ]
  )(
    {
      language: 'liquid',
      markup: {
        forceAttribute: false,
        selfCloseSVG: false
      }
    }
  )(function (source, rules) {

    const actual = prettify.format.sync(source, rules);

    t.deepEqual(actual, source);

  });
});

test('Structure Test: singleton <polyline>', t => {

  forRules(
    [

      liquid`
        {% # use polyline expressed without closer %}

        <svg>
          <polyline points="200,10 250,190 160,210">
        </svg>
      `
      ,
      liquid`
        {% # polyline expressed with self closer %}

        <svg>
          <polyline points="200,10 250,190 160,210" />
        </svg>
      `
      ,
      liquid`
        {% #  polyline expressed with end tag %}

        <svg>
          <symbol>
            <polyline points="200,10 250,190 160,210"></polyline>
          </symbol>
        </svg>
     `
      ,
      liquid`
        {% # polyline nested within symbol expressed with combiners %}

        <svg>
          <symbol>
            <polyline points="200,10 250,190 160,210"></polyline>
            <polyline points="200,10 250,190 160,210" />
            <polyline points="200,10 250,190 160,210">
          </symbol>
        </svg>
      `
    ]
  )(
    {
      language: 'liquid',
      markup: {
        forceAttribute: false,
        selfCloseSVG: false
      }
    }
  )(function (source, rules) {

    const actual = prettify.format.sync(source, rules);

    t.deepEqual(actual, source);

  });
});

test('Structure Test: singleton <rect>', t => {

  forRules(
    [

      liquid`
        {% # rect expressed without closer %}

        <svg>
          <rect x="50" y="20" rx="20" ry="20" width="150" height="150">
        </svg>
      `
      ,
      liquid`
        {% # rect expressed with self closer %}

        <svg>
          <rect x="50" y="20" rx="20" ry="20" width="150" height="150" />
        </svg>
      `
      ,
      liquid`
        {% # rect expressed with end tag %}

        <svg>
          <symbol>
            <rect x="50" y="20" rx="20" ry="20" width="150" height="150"></rect>
          </symbol>
        </svg>
     `
      ,
      liquid`
        {% # rect nested within symbol expressed with various %}

        <svg>
          <symbol>
            <rect x="50" y="20" rx="20" ry="20" width="150" height="150">
            <rect x="50" y="20" rx="20" ry="20" width="150" height="150" />
            <rect x="50" y="20" rx="20" ry="20" width="150" height="150"></rect>
          </symbol>
        </svg>
      `
    ]
  )(
    {
      language: 'liquid',
      markup: {
        forceAttribute: false,
        selfCloseSVG: false
      }
    }
  )(function (source, rules) {

    const actual = prettify.format.sync(source, rules);

    t.deepEqual(actual, source);

  });
});

test('Structure Test: singleton <ellipse>', t => {

  forRules(
    [

      liquid`
        {% # use ellipse expressed without closer %}

        <svg>
          <ellipse cx="200" cy="80" rx="100" ry="50">
        </svg>
      `
      ,
      liquid`
        {% # ellipse expressed with self closer %}

        <svg>
          <ellipse cx="200" cy="80" rx="100" ry="50" />
        </svg>
      `
      ,
      liquid`
        {% #  ellipse expressed with end tag %}

        <svg>
          <symbol>
            <ellipse cx="200" cy="80" rx="100" ry="50"></ellipse>
          </symbol>
        </svg>
     `
      ,
      liquid`
        {% # ellipse nested within symbol expressed with various %}

        <svg>
          <symbol>
            <ellipse cx="200" cy="80" rx="100" ry="50">
            <ellipse cx="200" cy="80" rx="100" ry="50"></ellipse>
            <ellipse cx="200" cy="80" rx="100" ry="50" />
          </symbol>
        </svg>
      `
    ]
  )(
    {
      language: 'liquid',
      markup: {
        forceAttribute: false,
        selfCloseSVG: false
      }
    }
  )(function (source, rules) {

    const actual = prettify.format.sync(source, rules);

    t.deepEqual(actual, source);

  });
});

test('Structure Test: singleton <stop>', t => {

  forRules(
    [

      liquid`
        {% # stop expressed without closer %}

        <svg height="150" width="400">
          <defs>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%">
              <stop offset="100%">
            </linearGradient>
          </defs>
        </svg>
      `
      ,
      liquid`
        {% # ellipse expressed with self closer and ender %}

        <svg height="150" width="400">
          <defs>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" />
              <stop offset="100%"></stop>
            </linearGradient>
          </defs>
        </svg>
      `
    ]
  )(
    {
      language: 'liquid',
      markup: {
        forceAttribute: false,
        selfCloseSVG: false
      }
    }
  )(function (source, rules) {

    const actual = prettify.format.sync(source, rules);

    t.deepEqual(actual, source);

  });
});

test.todo('Improve Tests');
test('Convert and correct singletons to self closing tokens', t => {

  forAssert([
    [

      liquid`
        {% # apply self closing forward slashes %}

        <svg height="150" width="400">
          <defs>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%">
              <stop offset="100%">
            </linearGradient>
          </defs>
        </svg>
      `
      ,
      liquid`
        {% # apply self closing forward slashes %}

        <svg height="150" width="400">
          <defs>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%">
              <stop offset="100%">
            </linearGradient>
          </defs>
        </svg>
      `
    ],
    [
      liquid`

        <svg height="120" width="120">
          <defs>
            <filter id="f1" x="0" y="0" width="200%" height="200%">
              <feOffset result="offOut" in="SourceGraphic" dx="20" dy="20">
              <feBlend in="SourceGraphic" in2="offOut" mode="normal">
            </filter>
          </defs>
          <rect width="90" height="90" stroke="green" stroke-width="3">
        </svg>

      `,
      liquid`

        <svg height="120" width="120">
          <defs>
            <filter id="f1" x="0" y="0" width="200%" height="200%">
              <feOffset result="offOut" in="SourceGraphic" dx="20" dy="20">
              <feBlend in="SourceGraphic" in2="offOut" mode="normal">
            </filter>
          </defs>
          <rect width="90" height="90" stroke="green" stroke-width="3">
        </svg>

      `
    ]
  ])(function (source, expect) {

    const actual = prettify.format.sync(source, {
      language: 'liquid',
      markup: {
        forceAttribute: false,
        correct: true,
        selfCloseSVG: true
      }
    });

    t.deepEqual(actual, expect);

  });
});
