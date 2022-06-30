import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";
import styled from "styled-components";

export default function Income() {
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");

  const { user } = useContext(UserContext);
  const { token } = user;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  async function AddIncome(event) {
    event.preventDefault();

    const body = {
      value: parseFloat(value),
      description,
      type: "income",
    };

    try {
      await axios.post("http://localhost:5000/income", body, config);
      alert("Nova entrada criada com sucesso!");
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
        <button type="submit">Salvar Entrada</button>
      </>
    );
  }

  return (
    <Container>
      <h2>Nova Entrada</h2>
      <IncomeForms onSubmit={AddIncome}>{IncomeForm()}</IncomeForms>
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
