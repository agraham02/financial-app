// APP COMPONENT
// Upon rendering of App component, make a request to create and
// obtain a link token to be used in the Link component
import React, { useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import { API_ENDPOINT, getRequest, postRequest } from "../../utils";
import { useAppDispatch } from "../../app/hooks";
import { setLinkSuccessful, setUserId } from "../../features/auth/authSlice";

export default function InitializeLink() {
    const [linkToken, setLinkToken] = useState(null);
    const dispatch = useAppDispatch();

    async function generateToken() {
        try {
            const results = await postRequest("/plaid/create-link-token", {});
            // console.log(response);
            // console.log(results);
            setLinkToken(results.data.link_token);
        } catch (error) {
            console.log(error);
            if (error.response.data.needToLogin) {
                localStorage.removeItem("userId");
                dispatch(setUserId(""));
            }
        }
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
    const dispatch = useAppDispatch();
    const onSuccess = React.useCallback(async (public_token, metadata) => {
        // send public_token to server
        console.log(metadata);
        const { institution_id } = metadata.institution;
        const results = await postRequest("/plaid/exchange_public_token", {
            public_token,
            institution_id,
        });
        console.log(results);
        // Handle response ...
    }, []);

    const config: Parameters<typeof usePlaidLink>[0] = {
        token: props.linkToken!,
        onSuccess,
    };

    const { open, ready } = usePlaidLink(config);

    return (
        <div className="grow flex flex-col justify-center items-center">
            <div>
                Connect to at least one of your financial institutions to
                continue
            </div>
            <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => open()}
                disabled={!ready}
            >
                Link account
            </button>
        </div>
    );
};
