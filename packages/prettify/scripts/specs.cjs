const { html, liquid, Type } = require('@liquify/liquid-language-specs');

const Grammar = {
  html: {
    voids: html.voids,
    tags: []
  },
  liquid: {
    else: [],
    singletons: [],
    tags: []
  }
};

for (const name in html.tags) {
  const tag = html.tags[name];
  if (tag.void !== true) Grammar.html.tags.push(name);
}

for (const name in liquid.shopify.tags) {

  const tag = liquid.shopify.tags[name];

  if (tag.singular === true) {
    if (tag.type === Type.control) {
      Grammar.liquid.else.push(name);
    } else {
      Grammar.liquid.singletons.push(name);
    }
  } else if (tag.type !== Type.embedded) {
    Grammar.liquid.tags.push(name);
  }
}

console.log(Grammar);
