const reg = /^(\d+)[hHчЧ]?(\s)?(\d+)[mMмМ]$|^(\d+)[hHчЧ]$|^(\d+)[mMмМ]$/;

const timeValidator = (str: string) => reg.test(str);

export default timeValidator;
