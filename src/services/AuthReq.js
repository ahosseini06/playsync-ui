import { filter } from "@chakra-ui/react";
import pluralize from "pluralize";


export const login = async (identifier, password) => {
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
        const response = await fetch("http://localhost:1337/api/auth/local/", requestOptions);
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
    const response = await fetch('http://localhost:1337/auth/local/register', {
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
        return null;
    }
    } catch (error) {
    console.error('Error during register:', error);
    // Handle the error as needed
    return null;
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

    fetch("http://localhost:1337/api/users/me", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result.id))
    .catch(error => console.log('error', error));
};

export const getUserInfo = async (token, field) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const query = `http://localhost:1337/api/users/me${field ? "?populate=" + pluralize(field) : ""}`;
    console.log(query);

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
