// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import InitializeLink from "./Components/PlaidLink";
import Login from "./Components/Authentication";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
    selectUserId,
    setUserId,
} from "./features/auth/authSlice";
import { useEffect, useState } from "react";
import Transactions from "./Components/Transactions";
import { getRequest } from "./utils";
import FinanceApp from "./FinanceApp";

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const userId = useAppSelector(selectUserId);
    const dispatch = useAppDispatch();

    // Check for userId in storage and update state
    function getLocalUserId() {
        const storedUserId = localStorage.getItem("userId"); // or sessionStorage
        console.log(storedUserId);

        if (storedUserId) {
            dispatch(setUserId(storedUserId));
        }
        setIsLoading(false);
    }

    useEffect(() => {
        getLocalUserId();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (userId) {
        return <FinanceApp />;
    } else {
        return <Login />;
    }
}

export default App;
