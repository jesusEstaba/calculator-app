export function getErrorMessage(e: any): string {
    const { response: { data: { error = "" } = {} } = {} } = e;

    return error ? error : e.toString();
}