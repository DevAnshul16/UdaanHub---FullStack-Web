import { createContext, useState, useEffect, useContext } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);

    // Load user from token on mount
    useEffect(() => {
        const loadUser = async () => {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                try {
                    const response = await authAPI.getMe();
                    setUser(response.data.user);
                    setToken(storedToken);
                } catch (error) {
                    console.error("Failed to load user:", error);
                    localStorage.removeItem("token");
                    setToken(null);
                }
            }
            setLoading(false);
        };

        loadUser();
    }, []);

    const register = async (userData) => {
        const response = await authAPI.register(userData);
        const { token: newToken, user: newUser } = response.data;
        localStorage.setItem("token", newToken);
        setToken(newToken);
        setUser(newUser);
        return response.data;
    };

    const login = async (credentials) => {
        const response = await authAPI.login(credentials);
        const { token: newToken, user: newUser } = response.data;
        localStorage.setItem("token", newToken);
        setToken(newToken);
        setUser(newUser);
        return response.data;
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    const value = {
        user,
        token,
        loading,
        register,
        login,
        logout,
        isAuthenticated: !!token,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
