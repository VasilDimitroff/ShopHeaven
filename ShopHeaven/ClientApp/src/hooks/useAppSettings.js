import { useContext } from "react";
import AppSettingsContext from "../context/AppSettingsProvider";

const useAppSettings = () => {
    return useContext(AppSettingsContext);
}

export default useAppSettings;