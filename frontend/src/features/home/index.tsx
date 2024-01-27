import React, { useEffect, useState } from "react";
import { formatMoney, getRequest } from "../../utils";
import { useAppSelector } from "../../app/hooks";
import { selectPlaidItemIds } from "../plaid/plaidSlice";

export default function Home() {
    const plaidItemIds = useAppSelector(selectPlaidItemIds);
    return (
        <div className="grow w-10/12 lg:w-3/6 self-center space-y-20">
            <NetWorth plaidItemIds={plaidItemIds} />
            {/* <MonthlySpending /> */}
            <BanksLinked />
        </div>
    );
}

function NetWorth({ plaidItemIds }) {
    const [netWorthData, setNetWorthData] = useState({});

    async function fetchNetWorth() {
        const results = await getRequest("/account/plaid/net-worth");
        console.log(results.data);
        setNetWorthData(results.data);
    }

    useEffect(() => {
        fetchNetWorth();
    }, []);

    return (
        <div className="">
            <div className="my-3 space-y-1">
                <p className="text-4xl">Net Worth</p>
                <p className="text-lg">
                    A summary of your assets and liabilities
                </p>
            </div>
            <div className="space-y-1 my-4">
                <p>
                    Your total across {plaidItemIds.length} bank account
                    {plaidItemIds.length === 1 ? "" : "s"}
                </p>
                <div className="text-3xl font-bold">
                    {formatMoney(
                        netWorthData.assets - netWorthData.liabilities
                    )}
                </div>
            </div>
            <div className="flex space-x-5">
                <NetWorthCard
                    title={"Assets"}
                    amount={netWorthData.assets}
                    values={[
                        { title: "Cash", value: netWorthData.cash },
                        {
                            title: "Investments",
                            value: netWorthData.investments,
                        },
                    ]}
                />
                <NetWorthCard
                    title={"Liabilities"}
                    amount={netWorthData.liabilities}
                    values={[
                        {
                            title: "Credit Cards",
                            value: netWorthData.creditCards,
                        },
                        { title: "Loans", value: netWorthData.loans },
                    ]}
                />
            </div>
        </div>
    );
}

function NetWorthCard({ title, amount, values }) {
    return (
        <div className="p-6 grow rounded shadow">
            <div className="font-bold text-2xl">{formatMoney(amount)}</div>
            <p className="py-4 text-2xl">{title}</p>
            <div>
                {values.map((item, index) => (
                    <div className="flex justify-between py-1" key={index}>
                        {item.title} <div>{formatMoney(item.value)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function MonthlySpending() {
    return (
        <div>
            <div>
                <p className="text-3xl font-semibold">Monthly Spending</p>
                <p className=" text-lg">A breakdown of your monthly spending</p>
            </div>
            <div>
                <p>Your total across {1} bank account</p>
            </div>
            <div>
                <div>
                    <p>Spending Categories</p>
                    <div>Pie Chart Here</div>
                </div>
                <div>
                    Top 5 Vendors
                    <div>Vendors Here</div>
                </div>
            </div>
        </div>
    );
}

function BanksLinked() {
    const plaidItemIds = useAppSelector(selectPlaidItemIds);
    const [institutionsData, setInstitutionsData] = useState([]);

    async function fetchInstitutionsData() {
        const response = await getRequest(
            "/account/plaid/items/institution-info"
        );
        setInstitutionsData(response.data);
    }

    useEffect(() => {
        fetchInstitutionsData();
    }, []);

    return (
        <div className="">
            <div className="flex flex-wrap justify-between my-6">
                <div>
                    <div className="text-4xl">
                        {plaidItemIds.length} Bank
                        {plaidItemIds.length === 1 ? "" : "s"} Linked
                    </div>
                    <div className="my-2">
                        Below is a list of all your connected banks. Click on a
                        bank to view its associated accounts.
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 h-fit dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        Add another bank
                    </button>
                </div>
            </div>
            <div className="flex flex-col items-center space-y-6">
                {institutionsData.map((institutionData, index) => (
                    <InstitutionCard
                        institutionData={institutionData}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
}

function InstitutionCard({ institutionData }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);

    async function handleRemoveInstitution() {
        console.log("remove institution");
    }

    return (
        <div className="w-full">
            <div className="flex justify-between items-center bg-gray-100 shadow-md rounded">
                <button
                    onClick={toggleDropdown}
                    className="grow text-left mr-10 p-7"
                >
                    <div>
                        <div></div>
                        <div>{institutionData.name}</div>
                    </div>
                </button>
                <button
                    onClick={handleRemoveInstitution}
                    className="text-left p-7 py-2 h-fit"
                >
                    Remove
                </button>
            </div>
            <InstitutionAccountsSection
                plaidItemId={institutionData.itemId}
                isOpen={isOpen}
            />
        </div>
    );
}

function InstitutionAccountsSection({ plaidItemId, isOpen }) {
    const [accounts, setAccounts] = useState([]);

    async function fetchAccountsData() {
        const response = await getRequest(
            `/account/plaid/items/accounts/${plaidItemId}`
        );
        console.log(response.data);
        setAccounts(response.data);
    }

    useEffect(() => {
        fetchAccountsData();
    }, []);

    return (
        <div
            className={`${
                isOpen ? "" : "hidden"
            } m-3 divide-y bg-white rounded ring-1 ring-black ring-opacity-5`}
        >
            {accounts.map((accountData, index) => (
                <InstitutionAccountCard accountData={accountData} key={index} />
            ))}
        </div>
    );
}

function InstitutionAccountCard({ accountData }) {
    return (
        <div className="p-4 space-y-1">
            <div className="font-medium">{accountData.name}</div>
            <div className="flex space-x-1 text-sm">
                <div>{accountData.subtype.toUpperCase()}</div>
                <div>•</div>
                <div>Balance {formatMoney(accountData.balances.current)}</div>
            </div>
        </div>
    );
}
