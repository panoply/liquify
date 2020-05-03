import { grammar } from '@liquify/cli'

export default grammar.bundle([
  {
    languageId: 'liquid',
    scopeName: 'source.liquid',
    filename: 'liquid.tmLanguage.json',
    include: [ 'comments' ]
  },
  {
    languageId: 'liquid-llty',
    scopeName: 'source.liquid.11ty',
    filename: 'liquid-11ty.tmLanguage.json',
    include: [ 'comments', 'frontmatter', 'imports' ]
  },
  {
    languageId: 'liquid-jekyll',
    scopeName: 'source.liquid.jekyll',
    filename: 'liquid-jekyll.tmLanguage.json',
    include: [ 'comments', 'frontmatter', 'imports', 'rouge' ]
  },
  {
    languageId: 'liquid-shopify',
    scopeName: 'source.liquid.shopify',
    path: 'liquid-shopify.tmLanguage.json',
    include: [ 'comments', 'embedded', 'imports' ]
  },
  {
    scopeName: 'markdown.liquid.codeblock',
    filename: 'markdown-liquid.codeblock.json',
    injectTo: [ 'text.html.markdown' ],
    include: [ 'comments' ]
  },
  {
    scopeName: 'source.liquid.injection',
    filename: 'liquid.injection.json',
    include: [ 'comments' ]
  }
])
