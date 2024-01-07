import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GlobalContentext = createContext();

const ContextProvider = ({ children }) => {
    const [localToken, setLocalToken] = useState(null);
    const [localUser, setLocalUser] = useState(null);

    const getUser = async () => {
        try {
            const _user = await AsyncStorage.getItem("userData");
            setLocalUser(_user || null); // Establecer null si _user es null
        } catch (error) {
            console.error('Error al obtener el usuario', error);
            setLocalUser(null);
        }
    }

    const setUser = async (user) => {
        await AsyncStorage.setItem('userData', user);
        setLocalUser(user);
    }
    const removeUser = async () => {
        try {
            await AsyncStorage.removeItem('userData');
            setLocalUser(null);
            console.log('Token eliminado correctamente');
        } catch (error) {
            console.error('Error al eliminar el token', error);
        }
    };
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

    useEffect(() => {
        getToken();
        getUser();
    }, []);

    return (
        <GlobalContentext.Provider value={{ token: localToken, getToken, setToken, removeToken,user: localUser , setUser, getUser,removeUser }}>
            {children}
        </GlobalContentext.Provider>
    )
}

export default ContextProvider;
