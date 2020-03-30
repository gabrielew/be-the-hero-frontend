import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { FiLogIn } from "react-icons/fi";
import api from "../../services/api";
import "./styles.css";

import heroes from "../../assets/heroes.png";
import logo from "../../assets/logo.svg";

export default function Logon() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const handleLogin = async event => {
    event.preventDefault();
    try {
      console.log(email, password);
      const response = await api.post("sessions", { email, password });
      localStorage.setItem("ongName", response.data.name);
      localStorage.setItem("ongToken", response.data.token);

      toast.success(`${response.data.name}, bem-vindo`, {
        className: "toastify"
      });

      history.push("/profile");
    } catch (err) {
      toast.error(`Erro, tente novamente`, {
        className: "toastify"
      });
    }
  };
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logo} alt="Be The Hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu Logon</h1>

          <input
            placeholder="E-mail da ONG"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            placeholder="Senha"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroes} alt="heroes" />
    </div>
  );
}
