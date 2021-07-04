'use strict';

const shopify = require('./export.js');

const F = {
    relative_url: {
        description: 'Prepend the baseurl value to the input. Useful if your site is hosted at a subpath rather than the root of the domain.',
        ref: 'https://jekyllrb.com/docs/liquid/filters/'
    },
    absolute_url: {
        description: 'Prepend the url and baseurl value to the input.',
        ref: 'https://jekyllrb.com/docs/liquid/filters/'
    },
    date_to_xmlschema: {
        description: 'Convert a Date into XML Schema (ISO 8601) format.',
        ref: 'https://jekyllrb.com/docs/liquid/filters/'
    },
    date_to_rfc822: {
        description: 'Convert a Date into the RFC-822 format used for RSS feeds.',
        ref: 'https://jekyllrb.com/docs/liquid/filters/'
    },
    date_to_string: {
        description: 'Convert a date to short format.',
        ref: 'https://jekyllrb.com/docs/liquid/filters/'
    }
};

const T = {
    post_url: {
        type: 'output',
        description: 'Link to a post on your site, the post_url tag will generate the correct permalink URL for the post you specify',
        singular: true,
        ref: 'https://jekyllrb.com/docs/liquid/tags/#linking-to-posts'
    },
    include: {
        type: 'import',
        description: 'The include tag allows you to include the content from another file stored in the _includes folder',
        singular: true,
        seperator: 'space',
        ref: 'https://jekyllrb.com/docs/includes'
    },
    include_relative: {
        type: 'import',
        description: 'Iinclude file fragments relative to the current file by using the include_relative tag',
        seperator: 'space',
        singular: true,
        ref: 'https://jekyllrb.com/docs/includes/#including-files-relative-to-another-file'
    },
    link: {
        type: 'output',
        filters: true,
        parameters: false
    },
    highlight: {
        type: 'raw',
        description: 'Render a code block with syntax highlighting.',
        snippet: 'highlight ${1}',
        filters: false,
        ref: 'https://jekyllrb.com/docs/liquid/tags/#code-snippet-highlighting'
    }
};

const O = {
    site: {
        description: 'Site wide information + configuration settings from _config.yml. See below for details.',
        properties: [
            {
                description: 'A list of all Pages.',
                name: 'pages'
            },
            {
                description: 'A reverse chronological list of all Posts.',
                name: 'posts'
            },
            {
                description: 'If the page being processed is a Post, this contains a list of up to ten related Posts. By default, these are the ten most recent posts. For high quality but slow to compute results, run the jekyll command with the --lsi (latent semantic indexing) option. ',
                name: 'related_posts'
            },
            {
                description: 'The current time (when you run the jekyll command).',
                name: 'time'
            }
        ],
        reference: 'https://jekyllrb.com/docs/variables/#site-variables',
        type: 'object'
    }
};

var jekyll;
(function (jekyll) {
    jekyll.Objects = O;
    jekyll.filters = Object.assign(Object.assign({}, F), shopify.standard.filters);
    jekyll.tags = Object.assign(Object.assign({}, T), shopify.standard.tags);
})(jekyll || (jekyll = {}));

const Specification = /*#__PURE__*/Object.freeze({
  __proto__: null,
  get standard () { return shopify.standard; },
  get shopify () { return shopify.shopify; },
  get jekyll () { return jekyll; }
});

let variation;
let cursor;
function Engine(engine) {
    variation = Specification[engine];
}
function Cursor(name, tag) {
    var _a, _b, _c;
    if (variation === undefined || !name)
        return false;
    if (tag === 'tags') {
        if ((_a = variation === null || variation === void 0 ? void 0 : variation.tags) === null || _a === void 0 ? void 0 : _a[name]) {
            cursor = variation.tags[name];
            return true;
        }
    }
    if (tag === 'filters') {
        if ((_b = variation === null || variation === void 0 ? void 0 : variation.filters) === null || _b === void 0 ? void 0 : _b[name]) {
            cursor = variation.filters[name];
            return true;
        }
    }
    if (tag === 'objects') {
        if (variation.engine !== "standard" && ((_c = variation === null || variation === void 0 ? void 0 : variation.objects) === null || _c === void 0 ? void 0 : _c[name])) {
            cursor = variation.objects[name];
            return true;
        }
    }
    cursor = undefined;
    return false;
}

const index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  get variation () { return variation; },
  get cursor () { return cursor; },
  Engine: Engine,
  Cursor: Cursor
});

exports.Specs = index;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZXMiOltdLCJzb3VyY2VzQ29udGVudCI6W10sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
