import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  async function Signup(event) {
    event.preventDefault();

    const body = {
      name,
      email,
      password,
      confirmPassword,
    };

    if (password.length < 5) {
      return alert("A senha precisa ter no mínimo cinco caracteres!");
    }

    if (password !== confirmPassword) {
      return alert("As senhas não são iguais. Tente novamente!");
    }

    try {
      await axios.post("https://barbara-mywallet.herokuapp.com/signup", body);
      alert("Usuário criado com sucesso!");
      navigate("/");
    } catch (error) {
      const message = error.response.statusText;
      alert(message);
    }
  }

  function SignupForm() {
    return (
      <>
        <input
          type="name"
          id="name"
          value={name}
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          id="email"
          value={email}
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          value={password}
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          required
          placeholder="Confirme a senha"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </>
    );
  }

  return (
    <Container>
      <h1>My Wallet</h1>
      <SignupForms onSubmit={Signup}>{SignupForm()}</SignupForms>
      <Link to="/">Já tem uma conta? Entre agora!</Link>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Raleway", sans-serif;
  height: 100vh;
`;
const SignupForms = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
