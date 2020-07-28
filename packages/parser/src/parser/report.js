import { ParseError } from '../enums/errors'

export function ReportError (document) {

  const reports = ''

  return (severity = ParseError.Error, message, range) => (
    {
      severity,
      message,
      range
    }

  )

}
