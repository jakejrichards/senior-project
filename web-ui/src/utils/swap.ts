export const swap = (arr: any[], i: number, j: number) => {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  return arr;
};
