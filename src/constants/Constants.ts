const Constants = {
  regex: {
    password: {
      general:
        /^(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/])(?=.*\d)(?=.*[A-Z]).{12,}$/,
      length: /^.{12,}$/,
      uppercase: /[A-Z]/,
      number: /\d/,
      specialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
    },
    email: /\S+@\S+\.\S+/,
  },
};

export default Constants;
