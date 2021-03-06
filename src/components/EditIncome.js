import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";
import styled from "styled-components";

export default function EditIncome() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");

  const { user } = useContext(UserContext);
  const { token } = user;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  async function EditIncome(event) {
    event.preventDefault();

    const body = {
      value: parseFloat(value),
      description,
      type: "income",
      _id: state._id,
    };

    try {
      await axios.put(
        "https://barbara-mywallet.herokuapp.com/editTransaction",
        body,
        config
      );
      alert("Entrada atualizada com sucesso!");
      navigate("/transactions");
    } catch (error) {
      const message = error.response.statusText;
      alert(message);
    }
  }

  function IncomeForm() {
    return (
      <>
        <input
          type="number"
          id="value"
          value={value}
          placeholder="Valor"
          onChange={(e) => setValue(e.target.value)}
        />
        <input
          type="description"
          id="description"
          value={description}
          placeholder="Descrição"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Atualizar entrada</button>
      </>
    );
  }

  return (
    <Container>
      <h2>Editar entrada</h2>
      <IncomeForms onSubmit={EditIncome}>{IncomeForm()}</IncomeForms>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Raleway", sans-serif;
  height: 100vh;

  h2 {
    font-weight: 700;
    font-size: 26px;
    color: #ffffff;
    line-height: 30px;
    margin-bottom: 40px;
  }
`;

const IncomeForms = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
