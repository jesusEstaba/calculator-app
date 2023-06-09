
export async function calculate(auth: any, a: number, b: number, operation: string): Promise<string> {
    const response = await auth.post("https://estaba-calculator.herokuapp.com/api/calculator/v1/calculate", { a, b, operation });
    const { result } = response.data;

    return result;
}