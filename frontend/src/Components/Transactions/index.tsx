import React, { useEffect } from "react";
import { getRequest } from "../../utils";

export default function Transactions() {
    async function fetchTransactions() {
        const results = await getRequest("/plaid/api/accounts");
        console.log(results.data);
    }

    useEffect(() => {
        fetchTransactions();
    }, []);

    return <div>index</div>;
}
