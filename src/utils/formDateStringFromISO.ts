const formDateStringFromISO = (deadline: string) => {
  if (deadline) {
    const date = new Date(deadline);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    return new Date(date).toLocaleDateString();
  }
};

export default formDateStringFromISO;
