import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../styles/theme";
import { API_URL } from "../config/api";

const ForgotPassword = () => {
  // Navegação entre telas
  const navigation = useNavigation();

  // Estados para email e mensagens de erro
  const [userEmail, setUserEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Estado para armazenar mensagens de erro

  const handlePasswordRecovery = async () => {
    const data = {
      userEmail,    // Campo de email do usuário
    };

    try {
      const response = await fetch(`${API_URL}/recovery`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // Sucesso: pode redirecionar ou mostrar uma mensagem
        console.log("Recuperação de senha bem-sucedida:", result);
        navigation.navigate("Login"); // Redireciona de volta para a tela de login
      } else {
        // Se houve erro, exibe a mensagem retornada
        setErrorMessage(result.message);

        // Após 3 segundos, limpa a mensagem de erro
        setTimeout(() => {
          setErrorMessage(""); // Limpa a mensagem de erro
        }, 3000);
      }
    } catch (error) {
      setErrorMessage("Erro ao se conectar ao servidor!");

      // Limpa a mensagem de erro após 3 segundos
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

      {/* Campo de E-mail */}
      <View style={styles.inputContainer}>
        <MaterialIcons name="email" size={24} color={colors.green[200]} />
        <TextInput
          style={styles.input}
          placeholder="Informe seu e-mail"
          placeholderTextColor={colors.gray[300]}
          value={userEmail}
          onChangeText={setUserEmail}
        />
      </View>

      {/* Botão de recuperação */}
      <TouchableOpacity style={styles.button} onPress={handlePasswordRecovery}>
        <Text style={styles.buttonText}>Recuperar Senha</Text>
      </TouchableOpacity>

      {/* Link para voltar ao login */}
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Voltar ao login</Text>
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

export default ForgotPassword;