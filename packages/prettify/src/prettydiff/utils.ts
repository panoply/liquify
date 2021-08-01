
export const { is } = Object;

export const indexOf = (
  data
) => (
  prop: number,
  value: string,
  index: number = -1
) => data[prop].indexOf(value) > index;
