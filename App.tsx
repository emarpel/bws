// App.tsx

import React from "react";
import { StatusBar } from "expo-status-bar";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <>
      {/* Barra de status com tema escuro */}
      <StatusBar style="light" backgroundColor="#00292E" />
      {/* Carrega a navegação */}
      <AppNavigator />
    </>
  );
}
