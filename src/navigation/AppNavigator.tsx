// src/navigation/AppNavigator.tsx

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importa as telas
import Login from "../../src/screens/Login";
import Home from "../../src/screens/Home";
import ForgotPassword from "../../src/screens/ForgotPassword";

// Configura o stack de navegação
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Rota para a tela de Login */}
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />

        {/* Rota para a tela Home */}
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />

        {/* Rota para a tela de Esqueci Minha Senha */}
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;