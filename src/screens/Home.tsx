// src/screens/Home.tsx

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../styles/theme";

const Home = () => {
  const navigation = useNavigation();

  // Função de logout
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token"); // Remove o token armazenado
      navigation.navigate("Login"); // Redireciona para a tela de Login
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BW SYSTEMS</Text>

      {/* Texto de boas-vindas */}
      <Text style={styles.description}>Home</Text>

      {/* Botão de Logout */}
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair</Text>
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
  description: {
    color: colors.white,
    fontSize: 16,
    marginBottom: 40,
  },
  button: {
    backgroundColor: colors.orange[300],
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
  },
});

export default Home;