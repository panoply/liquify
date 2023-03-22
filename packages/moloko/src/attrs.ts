import esthetic from 'esthetic';
import type { IAttrs, IOptions } from 'types';

/**
 * Internal state reference.
 */
export const attrs: IAttrs = {
  set input (file) {
    attrs.idx = attrs.model.input.length;
    attrs.model.input.push(file);
  },
  get input () {
    return attrs.model.input[attrs.idx];
  },
  get rules () {
    return esthetic.rules();
  },
  hash: '',
  detectLanguage: true,
  languagesOpen: false,
  previewMode: 'diff',
  previewOpen: false,
  rulesOpen: false,
  idx: 0,
  model: {
    diff: null,
    rules: null,
    input: []
  },
  editor: {
    diff: null,
    input: null,
    rules: null
  }
};

/**
 * Internal state reference.
 */
export const config: IOptions = {
  monaco: {
    automaticLayout: false,
    useShadowDOM: true,
    disableLayerHinting: true,
    scrollbar: {
      verticalScrollbarSize: 2
    },
    smoothScrolling: false,
    minimap: {
      enabled: false
    },
    formatOnPaste: false,
    scrollBeyondLastLine: false,
    fontFamily: 'Courier New, Monaco',
    fontWeight: '300',
    fontSize: 16,
    lineHeight: 19,
    bracketPairColorization: {
      enabled: false,
      independentColorPoolPerBracketType: false
    },
    padding: {
      top: 25,
      bottom: 25
    }
  },
  offset: 0,
  detect: true,
  diff: false,
  hash: true,
  input: '',
  language: 'liquid',
  sidebar: {
    enable: true,
    background: '#13171a',
    width: 75,
    actions: {
      file: {
        active: true,
        icon: 'document',
        tooltip: 'Current Document'
      },
      rules: {
        active: false,
        icon: 'rules',
        tooltip: 'Formatting Rules'
      },
      preview: {
        active: false,
        icon: 'pane',
        tooltip: 'Toggle Preview'
      },
      link: {
        active: false,
        icon: 'link',
        tooltip: 'Copy Link'
      },
      github: {
        active: false,
        icon: 'github',
        tooltip: 'Submit Issue to Github'
      }
    }
  },
  footer: {
    enable: false,
    background: '#181b20',
    height: 35,
    actions: {
      detect: {
        active: true,
        icon: 'detect',
        tooltip: 'Automatic Language Detection'
      },
      language: {
        active: true,
        icon: 'gears',
        tooltip: 'Choose Language'
      },
      formatToggle: {
        active: true,
        icon: 'check',
        tooltip: 'Toggle Formatting'
      }
    }
  },
  colors: {
    background: '#0f1215',
    accents: '#e45589',
    borders: '#666666'
  }
};
