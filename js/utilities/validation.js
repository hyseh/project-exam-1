export const lengthChecker = (value, length) => {
  if (value.trim().length > length) {
    return true;
  } else {
    return false;
  }
};

export const regexValidator = (input, rule) => {
  if (input === '') {
    return false;
  } else {
    return rule.test(input);
  }
};
