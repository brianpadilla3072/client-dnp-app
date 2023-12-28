import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
/**   Este código define un contexto llamado tokenContext que gestiona el estado del token de usuario 
 * y proporciona funciones para obtener, establecer y eliminar el token. Este contexto se utiliza como un
 *  componente llamado ContextProvider, que debe envolver a los componentes secundarios para que puedan acceder al estado del token y a las funciones relacionadas.

Puedes usar este ContextProvider en tu aplicación para gestionar el estado del token de manera centralizada y compartirlo entre diferentes componentes. */
// 1. Crear el Contexto
export const tokenContext = createContext();

// 2. Definir el Componente `contextProvider`
const ContextProvider = ({ children }) => {
    // 3. Establecer el Estado Local
    const [localToken, setLocalToken] = useState(null);

    // 4. Funciones para Obtener, Establecer y Eliminar el Token
    const getToken = async () => {
        const _token = await AsyncStorage.getItem("userToken");
        setLocalToken(_token);
    }

    const setToken = async (token) => {
        await AsyncStorage.setItem('userToken', token);
        setLocalToken(token);
    }

    const removeToken = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            setLocalToken(null);
            console.log('Token eliminado correctamente');
        } catch (error) {
            console.error('Error al eliminar el token', error);
        }
    };

    // 5. Efecto Secundario para Obtener el Token Inicial
    useEffect(() => {
        getToken();
    }, [])

    // 6. Proporcionar el Contexto a los Componentes Secundarios
    return (
        <tokenContext.Provider value={{ token: localToken, getToken, setToken, removeToken }}>
            {children}
        </tokenContext.Provider>
    )
}

// 7. Exportar el Componente `contextProvider`
export default ContextProvider;
