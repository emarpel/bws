import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons"; // Importa os ícones do pacote
import { colors } from "../styles/theme";
import { API_URL } from "../config/api";

const Login = () => {
  // Navegação entre telas
  const navigation = useNavigation();

  // Estados para login, senha e mensagens de erro
  const [userLogin, setUserLogin] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Novo estado para armazenar mensagens de erro

  const handleLogin = async () => {
    const data = {
      userLogin,    // Campo de login do usuário
      userPassword, // Campo de senha
    };

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // Sucesso: redirecionar para a tela Home
        console.log("Login bem-sucedido:", result);
        navigation.navigate("Home");
      } else {
        // Se houve erro no login, exibe a mensagem retornada
        
        setErrorMessage(result.message); // Atualiza o estado com a mensagem de erro

        // Após 3 segundos, limpa a mensagem de erro
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      }
    } catch (error) {
      
      setErrorMessage("Erro ao se conectar ao servidor!"); // Mensagem genérica de erro de conexão

      // Após 3 segundos, limpa a mensagem de erro
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BW SYSTEMS</Text>

      {/* Mensagem de erro */}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      {/* Campo de Login */}
      <View style={styles.inputContainer}>
        <MaterialIcons name="person" size={24} color={colors.green[200]} />
        <TextInput
          style={styles.input}
          placeholder="Login"
          placeholderTextColor={colors.gray[300]}
          value={userLogin}
          onChangeText={setUserLogin}
        />
      </View>

      {/* Campo de Senha */}
      <View style={styles.inputContainer}>
        <MaterialIcons name="lock" size={24} color={colors.green[200]} />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor={colors.gray[300]}
          secureTextEntry
          value={userPassword}
          onChangeText={setUserPassword}
        />
      </View>

      {/* Botão de Login */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Link para recuperar senha */}
      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.link}>recuperar senha</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilização
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.green[500],
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    color: colors.orange[300],
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
  },
  errorText: {
    color: "#F48F56",  // Cor vermelha para destacar o erro
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.green[400],
    borderRadius: 8,
    marginBottom: 10,
    width: "100%",
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    color: colors.white,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: colors.orange[300],
    padding: 15,
    marginBottom: 5,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
  },
  link: {
    color: colors.white,
    fontSize: 14,
  },
});

export default Login;