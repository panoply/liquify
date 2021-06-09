import { outdent } from '@mvasilkov/outdent';

export const handleError = (message) => {
  const error = Error(outdent(message));

  error.name = 'Liquid Parser';

  return error;
};
