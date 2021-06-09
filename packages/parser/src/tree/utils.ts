import { outdent } from '@mvasilkov/outdent';

export const handleError = (message: string) => {
  const error = Error(outdent(message));

  error.name = 'Liquid Parser';

  return error;
};
