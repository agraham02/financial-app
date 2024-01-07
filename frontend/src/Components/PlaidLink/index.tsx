// APP COMPONENT
// Upon rendering of App component, make a request to create and
// obtain a link token to be used in the Link component
import React, { useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import { API_ENDPOINT } from "../../utils";

export default function InitializeLink() {
    const [linkToken, setLinkToken] = useState(null);

    async function generateToken() {
        const response = await fetch(
            `${API_ENDPOINT}/plaid/create-link-token`,
            {
                method: "POST",
            }
        );
        const data = await response.json();

        setLinkToken(data.link_token);
    }

    useEffect(() => {
        generateToken();
    }, []);

    return linkToken != null ? <Link linkToken={linkToken} /> : <></>;
}

// LINK COMPONENT
// Use Plaid Link and pass link token and onSuccess function
// in configuration to initialize Plaid Link
interface LinkProps {
    linkToken: string | null;
}

const Link: React.FC<LinkProps> = (props: LinkProps) => {
    const onSuccess = React.useCallback(async (public_token, metadata) => {
        // send public_token to server
        const response = await fetch(
            `${API_ENDPOINT}/plaid/exchange_public_token`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ public_token }),
            }
        );
        const responseJson = await response.json();
        console.log(responseJson);

        // Handle response ...
        //TODO: save data locally
    }, []);

    const config: Parameters<typeof usePlaidLink>[0] = {
        token: props.linkToken!,
        onSuccess,
    };

    const { open, ready } = usePlaidLink(config);

    return (
        <button onClick={() => open()} disabled={!ready}>
            Link account
        </button>
    );
};
