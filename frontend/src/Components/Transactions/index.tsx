import React, { useEffect, useState } from "react";
import { getRequest } from "../../utils";

export default function Transactions() {
    const [accountData, setAccountData] = useState([]);

    async function fetchTransactions() {
        const results = await getRequest("/plaid/api/accounts");
        console.log(results.data);
        setAccountData(results.data.accounts);
    }

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <div>
            {accountData.map((accountData, index) => (
                <AccountCard key={index} accountData={accountData} />
            ))}
        </div>
    );
}

function AccountCard({ accountData }) {
    return (
        <div>
            <div>
                {accountData.name} {accountData.subtype}
            </div>
            <div>Available Balance: {accountData.balances.available}</div>
            <div>Current Balance: {accountData.balances.current}</div>
        </div>
    );
}
