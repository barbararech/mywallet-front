import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";
import styled from "styled-components";
import {
  IoExitOutline,
  IoAddCircleOutline,
  IoRemoveCircleOutline,
  IoCloseOutline,
} from "react-icons/io5";

export default function Signup() {
  const navigate = useNavigate();
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
          "https://barbara-mywallet.herokuapp.com/transactions",
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
      return (
        <div className="withouttransaction">
          <p>Não há registros de entrada ou saída</p>
        </div>
      );
    }

    return transactions.map((transaction, index) => {
      const { date, description, value, type, _id } = transaction;
      const valueFixed = value.toFixed(2);

      return (
        <Transaction type={type} index={index}>
          <span>{date}</span>
          <span
            onClick={() =>
              type === "income"
                ? navigate("/editIncome", { state: { _id } })
                : navigate("/editExpense", { state: { _id } })
            }
          >
            {description}
          </span>
          <span>{valueFixed}</span>
          <i onClick={() => Delete(_id)}>
            <IoCloseOutline />
          </i>
        </Transaction>
      );
    });
  }

  async function Delete(_id) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const body = {
      _id,
    };
    let confirmAlert = window.confirm(
      "Você tem certeza que quer apagar esse registro?"
    );

    if (!confirmAlert) {
      return;
    }

    try {
      const response = await axios.post(
        "https://barbara-mywallet.herokuapp.com/delete",
        body,
        config
      );
      alert("Registro apagado com sucesso!");
      setTransactions(response.data);
    } catch (error) {
      const message = error.response.statusText;
      alert(message);
    }
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

  async function SignOut() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.get("https://barbara-mywallet.herokuapp.com/signout", config);
      alert("Usuário deslogado com sucesso!");
      navigate("/");
    } catch (error) {
      const message = error.response.statusText;
      alert(message);
    }
  }

  return (
    <Container>
      <TransactionsHeader>
        <h2>Olá, {name}</h2>
        <i onClick={() => SignOut()}>
          <IoExitOutline />
        </i>
      </TransactionsHeader>
      <TransactionsContainer transactions={transactions}>
        <Transactions>{RenderTransactions()}</Transactions>
        {RenderBalance()}
      </TransactionsContainer>
      <ContainerAddTransaction>
        <Link to="/income">
          <i>
            <IoAddCircleOutline />
          </i>
          <span>Nova Entrada</span>
        </Link>
        <Link to="/expense">
          <i>
            <IoRemoveCircleOutline />
          </i>
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

  i {
    font-size: 30px;
    color: #ffffff;
    cursor: pointer;
  }
`;

const TransactionsContainer = styled.div`
  width: 100%;
  height: calc((100vh - 120px));
  background-color: #ffffff;
  border-radius: 5px;
  margin: 22px 0 13px 0;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) =>
    props.transactions.length === 0 ? "center" : "space-between"};
  padding: 15px;
  overflow-y: scroll;

  .withouttransaction {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

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

  :last-child {
    margin-bottom: 20px;
  }

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
    cursor: pointer;
  }

  span:nth-child(3) {
    color: ${(props) => (props.type === "income" ? "#03AC00" : "#C70000")};
  }

  i {
    color: #c6c6c6;
    margin: 1px -5px 0 11px;
    font-size: 18px;
    line-height: 18.78px;
    cursor: pointer;
  }
`;

const Balance = styled.div`
  height: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  bottom: 153px;
  left: 40px;
  right: 39px;
  background-color: #ffffff;

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

  i {
    font-size: 25px;
    color: #ffffff;
  }
`;
