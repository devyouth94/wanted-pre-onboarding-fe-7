import { useState } from "react";
import { isCorrectEmail, isCorrectPassword } from "../shared/validation";

const useSignInput = () => {
  const [user, setUser] = useState({ email: "", password: "" });

  const [checkEmail, setCheckEmail] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
    if (name === "email") {
      setCheckEmail(isCorrectEmail(value));
    } else {
      setCheckPassword(isCorrectPassword(value));
    }
  };

  return { user, checkEmail, checkPassword, onChangeHandler };
};

export default useSignInput;
