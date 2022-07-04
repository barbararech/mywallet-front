import axios from "axios";

export default async function SignOut(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    await axios.get("https://barbara-mywallet.herokuapp.com/signout", config);
    alert("Usuário deslogado com sucesso!");
    
  } catch (error) {
    const message = error.response.statusText;
    alert(message);
  }
}
