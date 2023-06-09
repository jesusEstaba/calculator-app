import axios from "axios";

export async function login(username: string, password: string): Promise<string> {
    const response = await axios.post("https://estaba-calculator.herokuapp.com/api/calculator/v1/login", { username, password });
    const { token } = response.data;

    return token;
}

export async function register(username: string, password: string): Promise<void> {
    await axios.post("https://estaba-calculator.herokuapp.com/api/calculator/v1/register", { username, password });

    return;
}