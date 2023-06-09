export interface Operation {
    id: string;
    operation_id: string;
    amount: number;
    operation_response: OperationResponse[];
}

interface OperationResponse {
    Value: string
}

export async function records(auth: any, searchTerm: string, page: number, perPage: number, sort: string): Promise<Operation[]> {
    const response = await auth.post("https://estaba-calculator.herokuapp.com/api/calculator/v1/records", {
        search_term: searchTerm,
        page,
        per_page: perPage,
        sort,
    });
    const { records } = response.data;

    return records;
}

export async function deleteRecord(auth: any, id: string): Promise<void> {
    await auth.delete(`https://estaba-calculator.herokuapp.com/api/calculator/v1/records/${id}`);

    return;
}