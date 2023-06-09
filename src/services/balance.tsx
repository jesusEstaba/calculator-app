export async function balance(auth: any): Promise<number> {
    const response = await auth.get("https://estaba-calculator.herokuapp.com/api/calculator/v1/balance");
    const { balance } = response.data;

    return balance;
}