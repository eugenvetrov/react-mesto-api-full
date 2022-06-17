import { useState } from "react";

function Login(props) {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    props.validateField(name, value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const isSomeFieldEmpty = Object.values(values).some((item) => item == "");
    if (props.formValid && !isSomeFieldEmpty) {
      props.onLogin({
        password: values.password,
        email: values.email,
      });
    }
    if (isSomeFieldEmpty) alert("Простите! Поля не должны быть пустыми.");
    if (props.formErrors.email || props.formErrors.password)
      alert(`${props.formErrors.email} ${props.formErrors.password}`);
  }
  return (
    <div className="auth">
      <h1 className="auth__title">Вход</h1>
      <form className="auth__form" onSubmit={(e) => handleSubmit(e)}>
        <input
          className="popup__text auth__field"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          className="popup__text auth__field"
          name="password"
          type="password"
          placeholder="Пароль"
          onChange={handleChange}
        />
        <button className="popup__submit auth__submit" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
