import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
    selectIsLinkSuccessful,
    setLinkSuccessful,
    setUserId,
} from "./features/auth/authSlice";
import Transactions from "./Components/Transactions";
import InitializeLink from "./Components/PlaidLink";
import { getRequest } from "./utils";
import Header from "./Components/Header";
import Home from "./features/home";

export default function FinanceApp() {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useAppDispatch();
    const isLinkSuccessful = useAppSelector(selectIsLinkSuccessful);

    async function checkPlaidAccessTokens() {
        try {
            const results = await getRequest("/account");
            console.log(results);
            dispatch(setLinkSuccessful(results.data.plaidItems.length > 0));
        } catch (error) {
            if (error.response.data.needToLogin) {
                localStorage.removeItem("userId");
                dispatch(setUserId(""));
            }
            console.log(error);
        }
    }

    useEffect(() => {
        checkPlaidAccessTokens();
    }, []);

    return (
        <>
            <Header />
            {isLinkSuccessful ? <Home /> : <InitializeLink />}
            {/* <InitializeLink /> */}
        </>
    );
}
