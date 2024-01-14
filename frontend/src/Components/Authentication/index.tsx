import axios from "axios";
import React, { useState } from "react";
import { postRequest } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUserId, setUserId } from "../../features/auth/authSlice";

export default function Login() {
    const userId = useAppSelector(selectUserId);
    const dispatch = useAppDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {
        const response = await postRequest("/auth/login", {
            username,
            password,
        });
        console.log(response.data);
        const userId = response.data.authenticated._id;
        console.log(userId);
        dispatch(setUserId(userId));
        localStorage.setItem("userId", userId);
    }

    async function handleRegister() {
        const response = await postRequest("/auth/register", {
            username,
            password,
        });
        console.log(response.data);
    }

    return (
        <div>
            <div>username</div>
            <input onChange={(e) => setUsername(e.target.value)} />
            <div>password</div>
            <input onChange={(e) => setPassword(e.target.value)} />
            <button onClick={() => handleLogin()}>Login</button>
            <button onClick={() => handleRegister()}>Register</button>
        </div>
    );
}
