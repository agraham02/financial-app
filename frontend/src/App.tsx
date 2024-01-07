// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import InitializeLink from "./Components/PlaidLink";
import Login from "./Components/Authentication";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
    selectIsLinkSuccessful,
    selectUserId,
    setLinkSuccessful,
    setUserId,
} from "./features/auth/authSlice";
import { useEffect, useState } from "react";
import Transactions from "./Components/Transactions";
import { getRequest } from "./utils";

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const userId = useAppSelector(selectUserId);
    const isLinkSuccessful = useAppSelector(selectIsLinkSuccessful);
    const dispatch = useAppDispatch();

    // Check for userId in storage and update state
    function getLocalUserId() {
        const storedUserId = localStorage.getItem("userId"); // or sessionStorage
        console.log(storedUserId);

        if (storedUserId) {
            console.log("Storing");
            dispatch(setUserId(storedUserId));
        }
        setIsLoading(false);
    }

    async function checkPlaidAccessToken() {
        const results = await getRequest("/auth");
        console.log(results);
        if (results.data.plaidData.accessToken) {
            dispatch(setLinkSuccessful(true));
        }
    }

    useEffect(() => {
        getLocalUserId();
        checkPlaidAccessToken();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (userId) {
        if (isLinkSuccessful) {
            return <Transactions />;
        } else {
            return <InitializeLink />;
        }
    } else {
        return <Login />;
    }
}

export default App;
