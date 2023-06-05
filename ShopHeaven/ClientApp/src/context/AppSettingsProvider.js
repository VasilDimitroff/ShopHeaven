import { createContext, useState } from "react";

const AppSettingsContext = createContext({});

export const AppSettingsProvider = ({ children }) => {
    const [appSettings, setAppSettings] = useState({});

    return (
        <AppSettingsContext.Provider value = {{appSettings, setAppSettings }}>
            {children}
        </AppSettingsContext.Provider>
    )
}

export default AppSettingsContext;