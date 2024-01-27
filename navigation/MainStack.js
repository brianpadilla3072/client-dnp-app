import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "../navigation/TabNavigator";
import Ajustes from "../screens/Ajustes";
import publicarDevocional from "../components/publicarDevocional";
import publicarEvento from "../components/publicarEvento";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }} // Puedes configurar las opciones del header aquí
      />
         <Stack.Screen
        name="ajustes"
        component={Ajustes}
        options={{ headerShown: true }} // Puedes configurar las opciones del header aquí
      />
         <Stack.Screen
        name="Nuevo Devocional"
        component={publicarDevocional}
        options={{ headerShown: true }} // Puedes configurar las opciones del header aquí
      />
         <Stack.Screen
        name="Nuevo Evento"
        component={publicarEvento}
        options={{ headerShown: true }} // Puedes configurar las opciones del header aquí
      />
    </Stack.Navigator>
  );
};

export default MainStack;
