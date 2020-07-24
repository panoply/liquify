function Errors (document) {

  return (error, start, end) => ({

    incomplete: {
      severity: Severities.Error,
      message: '',
      range: {
        start: document.positionAt(start),
        end: document.positionAt(end)
      }
    }

  }[error])

}
