import axios from "axios";
import React, { useState } from "react";
import { postRequest } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUserId, setUserId } from "../../features/auth/authSlice";
import { Button, FloatingLabel, Spinner } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import Footer from "../Footer";

export default function Login() {
    const userId = useAppSelector(selectUserId);
    const dispatch = useAppDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [isError, setIsError] = useState(false);

    async function handleLogin() {
        try {
            const response = await postRequest("/auth/login", {
                username,
                password,
            });
            console.log(response.data);

            const userId = response.data.authenticated._id;
            console.log(userId);
            dispatch(setUserId(userId));
            localStorage.setItem("userId", userId);
        } catch (error) {
            console.log(error);
            setIsError(true);
        }
    }

    async function handleRegister() {
        const response = await postRequest("/auth/register", {
            username,
            password,
        });
        console.log(response.data);
        const userId = response.data.register._id;
        dispatch(setUserId(userId));
        localStorage.setItem("userId", userId);
    }

    return (
        <div className="w-full h-full flex flex-col">
            <div className="grow flex flex-col justify-center items-center">
                <h1 className="text-6xl m-10 text-center">
                    Ahmad's Finance App
                </h1>

                <div className="w-72 text-center">
                    <FloatingLabel
                        // className="w-72"
                        variant="outlined"
                        label="Username"
                        color={isError ? "error" : "default"}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <FloatingLabel
                        // className="w-72"
                        type="password"
                        variant="outlined"
                        label="Password"
                        color={isError ? "error" : "default"}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div
                        className={`text-red-600 dark:text-red-400 ${
                            isError ? "" : "hidden"
                        }`}
                    >
                        Username or password is incorrect
                    </div>
                </div>

                <div className="flex m-2 space-x-4">
                    <Button color="blue" onClick={handleLogin}>
                        Login
                    </Button>
                    <Button outline color="blue" onClick={handleRegister}>
                        Register
                    </Button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

function Component() {
    return (
        <>
            <div className="grid grid-flow-col justify-stretch space-x-4">
                <FloatingLabel
                    variant="filled"
                    label="Filled Success"
                    color="error"
                />
                <FloatingLabel
                    variant="outlined"
                    label="Outlined Success"
                    color="error"
                />
            </div>
        </>
    );
}
