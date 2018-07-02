const testColumn = str => {
  const regex = /^=[a-jA-J](?:[1-9]|10)(?:\+[a-jA-J][1-9]|10)*$/;
  return regex.test(str);
};

const testNumber = str => {
  const regex = /^=\d+\.?\d*(?:\+\d+\.?\d*)*$/;
  return regex.test(str);
};

export { testColumn, testNumber };
