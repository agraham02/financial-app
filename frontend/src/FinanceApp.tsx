import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
    selectIsLinkSuccessful,
    setLinkSuccessful,
    setUserId,
} from "./features/auth/authSlice";
import InitializeLink from "./Components/PlaidLink";
import { getRequest } from "./utils";
import Nav from "./Components/Nav";
import Home from "./features/home";
import Footer from "./Components/Footer";
import { selectPlaidItemIds, setPlaidItems } from "./features/plaid/plaidSlice";

export default function FinanceApp() {
    const [isLoading, setIsLoading] = useState(true);
    const plaidItemsIds = useAppSelector(selectPlaidItemIds);
    
    const dispatch = useAppDispatch();

    async function getUserPlaidItemsIds() {
        const response = await getRequest("/account/item-ids");
        const plaidItems = response.data;
        console.log(plaidItems);
        dispatch(setPlaidItems(plaidItems));
    }

    useEffect(() => {
        getUserPlaidItemsIds();
    }, []);

    return (
        <div className="w-full h-full flex flex-col">
            <Nav />
            {plaidItemsIds ? <Home /> : <InitializeLink />}
            {/* <InitializeLink /> */}
            <Footer />
        </div>
    );
}
