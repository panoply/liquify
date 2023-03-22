import type { LanguageName, Rules } from 'esthetic';
import esthetic from 'esthetic';
import * as monaco from 'monaco-editor';
import { schema } from './schema';

/**
 * Editor Model
 */
export function getEditor (language: LanguageName, input: string) {

  return monaco.editor.createModel(`
  <header class="container-fluid navbar bb">
  <div id="navbar" class="row ai-center bg-white w-100 pr-0">
    <a
      href="/"
      class="col-auto italic fc-white fs-lg pl-4 pr-0"
      style="font-weight: 800;">
      Æ
      <small>
        STHETIC
      </small>
    </a>
    <small class="col-auto pl-0">
      <strong class="col-auto fs-sm mr-5">
        <span class="fs-xs fw-light">
          v&nbsp;
        </span>
        0.1.0
      </strong>
    </small>

    {% #  %}

    {% render 'snippet'
      , param: 'string'
      , boolean: false
      , number: 100 %}

    {% style %}
      .class {
        font-size: 100px; /* comment */
      }
    {% endstyle %}

    {% schema %}
      {
        "foo": "bar"
      }
    {% endschema %}

    {% for link in link.title %}
      <a
        href="{{ link.url }}"
        title="{{ link.title }}"
        class="col-auto fw-bolder {% unless forloop.index == active %}off{% endunless %}">
        {{ link.title | filter: 'foo' }}
      </a>
    {% endfor %}

    <a href="https://github.com/panoply/esthetic" class="col-auto ml-auto pr-0">
      {% svg 'github'
        , 'icon icon-github' %}
    </a>
  </div>
</header>
  `, language);

}

/**
 * Rules Model
 */
export function getRules (rules: Rules) {

  const input: string = JSON.stringify(rules ? esthetic.rules() : rules, null, 2);

  // configure the JSON language support with schemas and schema associations
  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: true,
    enableSchemaRequest: true,
    schemas: [
      {
        uri: 'http://myserver/foo-schema.json',
        fileMatch: [ '*' ], // associate with our model
        schema
      }
    ]
  });

  return monaco.editor.createModel(input, 'json');

}
