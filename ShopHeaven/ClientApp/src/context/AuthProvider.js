import { createContext, useState } from "react";

// user is set at two places - in Login component and useRefreshToken when token is refreshing
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value = {{ auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;