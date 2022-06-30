import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";
import styled from "styled-components";

export default function Expense() {
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

  async function AddExpense(event) {
    event.preventDefault();

    const body = {
      value,
      description,
      type: "expense",
    };

    try {
      await axios.post("http://localhost:5000/expense", body, config);
      alert("Nova saída criada com sucesso!");
      navigate("/transactions");
    } catch (error) {
      const message = error.response.statusText;
      alert(message);
    }
  }

  function ExpenseForm() {
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
        <button type="submit">Salvar Saída</button>
      </>
    );
  }

  return (
    <Container>
      <h2>Nova Entrada</h2>
      <ExpenseForms onSubmit={AddExpense}>{ExpenseForm()}</ExpenseForms>
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

const ExpenseForms = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
