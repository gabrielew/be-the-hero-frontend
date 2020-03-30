import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { FiPower, FiTrash2 } from "react-icons/fi";
import api from "../../services/api";

import logo from "../../assets/logo.svg";
import "./styles.css";

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();
  const ongName = localStorage.getItem("ongName");
  const ongToken = localStorage.getItem("ongToken");

  const handleDelete = async id => {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          authorization: `Bearer ${ongToken}`
        }
      });
      setIncidents(incidents.filter(incidents => incidents.id !== id));
      toast.warning(`Caso deletado com sucesso.`, {
        className: "toastify"
      });
    } catch (err) {
      toast.error(`Erro, tente novamente`, {
        className: "toastify"
      });
    }
  };

  useEffect(() => {
    api
      .get("profile", {
        headers: {
          authorization: `Bearer ${ongToken}`
        }
      })
      .then(response => {
        setIncidents(response.data);
      });
  }, [ongToken]);

  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <div className="profile-container">
      <header>
        <img src={logo} alt="Be The Hero" />
        <span>Bem vinda, {ongName}</span>
        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>
      <ul>
        {incidents.map(item => (
          <li key={item.id}>
            <strong>CASO:</strong>
            <p>{item.title}</p>
            <strong>DESCRIÇÃO</strong>
            <p>{item.description}</p>
            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(item.value)}
            </p>

            <button type="button" onClick={() => handleDelete(item.id)}>
              <FiTrash2 size={20} color="#A8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
