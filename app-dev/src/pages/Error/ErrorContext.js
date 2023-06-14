import React, {useContext, useState} from "react";
import { useNavigate } from "react-router-dom";

const ErrorContext = React.createContext();

export const useError = () => {
    return useContext(ErrorContext)
}

export const ErrorProvider = ({children}) => {

    const navigate = useNavigate();

    const [error, setError] = useState("");

    const showError = (valueError) => {
        setError(valueError);
        console.log(valueError);
        navigate("/error")
        
    }

    return (
        <ErrorContext.Provider value={
            {
                message: error,
                showError
            }
        }>
            {children}
        </ErrorContext.Provider>
    )
}