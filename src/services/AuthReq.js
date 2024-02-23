import { filter } from "@chakra-ui/react";
import pluralize from "pluralize";

const baseUrl= `${process.env.REACT_APP_API_DOMAIN}/api`
export const login = async (identifier, password) => {
    console.log("baseUrl", baseUrl);
    var rValue=null;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "identifier": identifier,
        "password": password
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    try {
        const response = await fetch(`${baseUrl}/auth/local/`, requestOptions);
        const result = await response.json();
        rValue = result.jwt;
    } catch (error) {
        console.log('error', error);
        rValue = null;
    }
    return rValue;
};

export const register = async (username, email, password) => {
    try {
    // Make a request to the Strapi register endpoint
    const response = await fetch(`${baseUrl}/auth/local/register`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        }),
    });

    // Check if the request was successful (status code 2xx)
    if (response.ok) {
        // Parse the response JSON
        const data = await response.json();

        // Extract the token from the response
        const token = data.jwt;

        // You can save the token in localStorage or a cookie for later use
        // For example: localStorage.setItem('token', token);

        // Return the token
        return token;
    } else {
        // If the register was unsuccessful, return null
        return "";
    }
    } catch (error) {
    console.error('Error during register:', error);
    // Handle the error as needed
    return "";
    }
};

export const getUserId = async (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);


    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch(`${baseUrl}/users/me`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result.id))
    .catch(error => console.log('error', error));
};

export const getUser = async (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const query = `${baseUrl}/users/me`;

    try {
        const response = await fetch(query, requestOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log('error', error);
        // Handle the error or return a default value
        return null;
    }
};

export const isUsernameAvailable = async (username) => {
    var myHeaders = new Headers();

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const query = `${baseUrl}/is-username-available/${username}`;

    try {
        const response = await fetch(query, requestOptions);
        const result = await response.json();
        console.log("R", result);
        return result;
    } catch (error) {
        console.log('error', error);
        // Handle the error or return a default value
        return null;
    }
};
export const isEmailAvailable = async (email) => {
    var myHeaders = new Headers();

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const query = `${baseUrl}/is-email-available/${email}`;

    try {
        const response = await fetch(query, requestOptions);
        const result = await response.json();
        console.log("R", result);
        return result;

    } catch (error) {
        console.log('error', error);
        // Handle the error or return a default value
        return null;
    }
};