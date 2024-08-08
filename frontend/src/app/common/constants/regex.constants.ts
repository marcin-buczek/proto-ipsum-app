
export const UsernameRegx: RegExp =
  /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:-[A-Za-zÀ-ÖØ-öø-ÿ]+)? [A-Za-zÀ-ÖØ-öø-ÿ]+(?:-[A-Za-zÀ-ÖØ-öø-ÿ]+)?$/;
  
export const EmailRegx: RegExp =
  /^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$/;

export const StrongPasswordRegx: RegExp =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@\[\]^_!"#$%&'()*+,\-./:;<>{}=|~?]).{8,}$/;