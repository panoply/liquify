import { ParseError } from '../enums/errors'

export function ReportError (document) {

  return (severity = ParseError.Error, message, range) => (
    {
      severity,
      message,
      range
    }

  )

}
