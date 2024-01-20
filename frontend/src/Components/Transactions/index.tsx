import React, { useEffect, useState } from "react";
import { formatMoney, getRequest } from "../../utils";

export default function Transactions() {
    const [accountData, setAccountData] = useState([]);
    const [cash, setCash] = useState(0);
    const [savings, setSavings] = useState(0);
    const [investments, setInvestments] = useState(0);
    const [debt, setDebt] = useState(0);
    const [assets, setAssets] = useState(0);
    const [liabilities, setLiabilities] = useState(0);

    async function fetchTransactions() {
        const results = await getRequest("/plaid/api/accounts");
        console.log(results.data);
        setAccountData(results.data.accounts);
        calculateAssetsValues();
    }

    function calculateAssetsValues() {
        const CHECKING = "checking";
        const SAVINGS = "savings";
        const INVESMENTS = "investments";
        const CREDIT_CARD = "credit card";

        let newCash = 0;
        let newSavings = 0;
        let newInvestments = 0;
        let newDebt = 0;
        for (const account of accountData) {
            switch (account.subtype) {
                case CHECKING:
                    newCash += account.balances.available;
                    break;
                case SAVINGS:
                    newSavings += account.balances.available;
                    break;
                case INVESMENTS:
                    newInvestments += account.balances.available;
                    break;
                case CREDIT_CARD:
                    newDebt += account.balances.current;
                    break;
            }
        }

        setCash(newCash);
        setSavings(newSavings);
        setInvestments(newInvestments);
        setDebt(newDebt);
        setAssets(newCash + newSavings + newInvestments);
        setLiabilities(newDebt);
    }

    useEffect(() => {
        fetchTransactions();
    }, []);

    useEffect(() => {
        calculateAssetsValues();
    }, [accountData]);

    return (
        <div>
            <div>
                <p>Stats:</p>
                <div>Cash: {formatMoney(cash)}</div>
                <div>Savings: {formatMoney(savings)}</div>
                <div>Investments: {formatMoney(investments)}</div>
                <div>Debt: {formatMoney(debt)}</div>
                <div>Assets: {formatMoney(assets)}</div>
                <div>Liabilities: {formatMoney(liabilities)}</div>
                <div>Net worth: {formatMoney(assets - liabilities)}</div>
            </div>
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
            <div>Available Balance: {formatMoney(accountData.balances.available)}</div>
            <div>Current Balance: {formatMoney(accountData.balances.current)}</div>
        </div>
    );
}
