import document from './document'
import stream from './stream'

export const global = {
  get Document () { return document.documents() },
  Spec: {},
  Parser: {
    ...document.global()
    , ...stream.global()
  }
}
