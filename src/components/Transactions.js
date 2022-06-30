import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";
import styled from "styled-components";
import {
  IoExitOutline,
  IoAddCircleOutline,
  IoRemoveCircleOutline,
} from "react-icons/io5";

export default function Signup() {
  const { user } = useContext(UserContext);
  const { name, token } = user;
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function GetTransactions() {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.get(
          "http://localhost:5000/transactions",
          config
        );

        setTransactions(response.data);
      } catch (error) {
        const message = error.response.statusText;
        alert(message);
      }
    }
    GetTransactions();
  }, []);

  function RenderTransactions() {
    if (transactions.length === 0) {
      return <p>Não há registros de entrada ou saída</p>;
    }

    return transactions.map((transaction, index) => {
      const { date, description, value, type } = transaction;
      const valueFixed = value.toFixed(2);

      return (
        <Transaction type={type} index={index}>
          <span>{date}</span>
          <span>{description}</span>
          <span>{valueFixed}</span>
        </Transaction>
      );
    });
  }

  function CalculateBalance() {
    const initialValue = 0;

    return transactions.reduce((previousValue, currentValue) => {
      if (currentValue.type === "income") {
        return previousValue + currentValue.value;
      } else {
        return previousValue - currentValue.value;
      }
    }, initialValue);
  }

  function RenderBalance() {
    if (transactions.length > 0) {
      const total = CalculateBalance().toFixed(2);
      return (
        <Balance total={total}>
          <span>SALDO</span>
          <span>{total}</span>
        </Balance>
      );
    }
  }

  return (
    <Container>
      <TransactionsHeader>
        <h2>Olá, {name}</h2>
        <icon>
          <IoExitOutline />
        </icon>
      </TransactionsHeader>
      <TransactionsContainer transactions={transactions}>
        <Transactions>{RenderTransactions()}</Transactions>
        {RenderBalance()}
      </TransactionsContainer>
      <ContainerAddTransaction>
        <Link to="/income">
          <icon>
            <IoAddCircleOutline />
          </icon>
          <span>Nova Entrada</span>
        </Link>
        <Link to="/expense">
          <icon>
            <IoRemoveCircleOutline />
          </icon>
          <span>Nova Saída</span>
        </Link>
      </ContainerAddTransaction>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Raleway", sans-serif;
  height: 100vh;
  padding-bottom: 50px;

  h2 {
    font-weight: 700;
    font-size: 26px;
    color: #ffffff;
    line-height: 30px;
  }
`;

const TransactionsHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  icon {
    font-size: 30px;
    color: #ffffff;
  }
`;

const TransactionsContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 5px;
  margin: 22px 0 13px 0;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) =>
    props.transactions.length === 0 ? "center" : "space-between"};
  padding: 15px;

  p {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    font-family: "Raleway", sans-serif;
    font-size: 20px;
    color: #868686;
    line-height: 24px;
  }
`;

const Transactions = styled.div`
  height: 100%;
`;

const Transaction = styled.div`
  display: flex;
  flex-direction: row;

  span {
    font-family: "Raleway", sans-serif;
    font-size: 16px;
    line-height: 19px;
    font-weight: 400;
    color: #c6c6c6;
    margin-bottom: 15px;
  }

  span:nth-child(2) {
    color: #000000;
    width: 100%;
    margin-left: 8px;
  }

  span:nth-child(3) {
    color: ${(props) => (props.type === "income" ? "#03AC00" : "#C70000")};
  }
`;

const Balance = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  span {
    font-family: "Raleway", sans-serif;
    font-size: 17px;
    color: #000000;
    line-height: 20px;
    font-weight: 700;
  }

  span:nth-child(2) {
    color: ${(props) => (props.total > 0 ? "#03AC00" : "#C70000")};
    font-weight: 400;
  }
`;

const ContainerAddTransaction = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  a {
    height: 115px;
    width: 50%;
    margin: 0;
    border-radius: 5px;
    background-color: #a328d6;
    padding: 10px;
    font-size: 17px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    word-spacing: 100vw;
    line-height: 20px;
  }

  a:first-child {
    margin-right: 8px;
  }

  icon {
    font-size: 25px;
    color: #ffffff;
  }
`;
