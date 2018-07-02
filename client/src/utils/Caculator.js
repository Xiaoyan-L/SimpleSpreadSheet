const simpleCaculator = str => {
  const nums = str.split(/(?=\+|-)/);
  return nums.reduce((sum, num) => sum + +num, 0);
};
export default simpleCaculator;
