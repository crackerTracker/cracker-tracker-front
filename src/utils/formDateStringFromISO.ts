const formDateStringFromISO = (deadline: string) => {
  const date = new Date(deadline);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  return new Date(date).toLocaleDateString();
};

export default formDateStringFromISO;
