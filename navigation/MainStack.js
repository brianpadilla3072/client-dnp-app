import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "../navigation/TabNavigator";
import Ajustes from "../screens/Ajustes";
import publicar from "../components/publicarDevocional";

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
        component={publicar}
        options={{ headerShown: true }} // Puedes configurar las opciones del header aquí
      />
    </Stack.Navigator>
  );
};

export default MainStack;
