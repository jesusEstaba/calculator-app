import React, {useContext, useEffect, useState} from "react";
import {AlertContext} from "../contexts/AlertContext";
import useAuth from "../hooks/auth";
import {getErrorMessage} from "../utils/getError";
import {deleteRecord, Operation, records} from "../services/records";
import useRedirectToHome from "../hooks/redirectToHome";


export const History: React.FC = () => {
    const redirection = useRedirectToHome();

    const [flag, setFlag] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("desc");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const [operations, setOperations] = useState<Operation[]>([]);
    const { showAlert, hideAlert } = useContext(AlertContext);
    const auth = useAuth();

    const call = async () => {
        hideAlert();
        try {
            const userRecords = await records(auth, searchTerm, currentPage, itemsPerPage, sortBy)
            setOperations(userRecords);
        } catch (e) {
            showAlert('danger', getErrorMessage(e));
            console.log({e});
        }
        setFlag(true);
    };

    useEffect(() => {
        if (flag) {
            return;
        }

        call();
    }, [flag, redirection]);

    const handleDeleteOperation = async (id: string) => {
        hideAlert();
        try {
            await deleteRecord(auth, id)
            setOperations(operations.filter(o => o.id != id))
        } catch (e) {
            showAlert('danger', getErrorMessage(e));
            console.log({e});
        }
    };

    const handleSearch = (event: any) => {
        event.preventDefault();
        call();
    };

    const handleSortChange = (event: any) => {
        setSortBy(event.target.value);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
        call();
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
        call();
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8 mx-auto mt-5">
                    <h2>History</h2>

                    <form onSubmit={handleSearch}>
                        <div className="form-group">
                            <label htmlFor="searchTerm">Search:</label>
                            <input
                                type="text"
                                id="searchTerm"
                                className="form-control"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="sortBy">Sort by:</label>
                            <select
                                id="sortBy"
                                className="form-control"
                                value={sortBy}
                                onChange={handleSortChange}
                            >
                                <option value="desc">Descending</option>
                                <option value="asc">Ascending</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Search
                        </button>
                    </form>

                    <table className="table table-dark mt-3">
                        <thead>
                        <tr>
                            <th>Operation</th>
                            <th>Cost</th>
                            <th>Result</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {operations.map((operation) => (
                            <tr key={operation.id}>
                                <td>{operation.operation_id}</td>
                                <td>${operation.amount}</td>
                                <td>{operation.operation_response[0].Value}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDeleteOperation(operation.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <nav>
                        <ul className="pagination">
                            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                <button className="page-link" onClick={handlePreviousPage}>
                                    Previous
                                </button>
                            </li>
                            <li className="page-item">
                                <button className="page-link" onClick={handleNextPage}>
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};