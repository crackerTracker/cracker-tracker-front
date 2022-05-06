const reg = /(\d+)[hHчЧ]?(\s)?(\d+)[mMмМ]|(\d+)[hHчЧ]/; // todo проверить 5м4ч

const timeValidator = (str: string) => reg.test(str);

export default timeValidator;
