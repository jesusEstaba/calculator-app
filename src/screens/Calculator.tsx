import React, {useState, useContext} from "react";
import {AlertContext} from "../contexts/AlertContext";
import {getErrorMessage} from "../utils/getError";
import {calculate} from "../services/calculator";
import useAuth from "../hooks/auth";
import {BalanceContext} from "../contexts/BalanceContext";
import {balance} from "../services/balance";
import useRedirectToHome from "../hooks/redirectToHome";

export const Calculator: React.FC = () => {
    useRedirectToHome();

    const [number1, setNumber1] = useState(0);
    const [number2, setNumber2] = useState(0);
    const [operation, setOperation] = useState("addition");
    const [result, setResult] = useState("0");
    const { showAlert, hideAlert } = useContext(AlertContext);
    const { setBalance } = useContext(BalanceContext);
    const auth = useAuth();

    const handleCalculate = async () => {
        hideAlert();
        try {
            const operationResult = await calculate(auth, number1, number2, operation)
            setResult(operationResult);
        } catch (e) {
            showAlert('danger', getErrorMessage(e));
            console.log({e});
        }

        try {
            const userBalance = await balance(auth);
            await setBalance(userBalance);
        } catch (e) {
            console.log({e});
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 mx-auto mt-5">
                    <h2>Calculator</h2>
                    <form>
                        <div className="form-group">
                            <label>Number 1</label>
                            <input
                                type="number"
                                className="form-control"
                                value={number1}
                                onChange={(e) => setNumber1(Number(e.target.value))}
                            />
                        </div>
                        <div className="form-group">
                            <label>Number 2</label>
                            <input
                                type="number"
                                className="form-control"
                                value={number2}
                                onChange={(e) => setNumber2(Number(e.target.value))}
                            />
                        </div>
                        <div className="form-group">
                            <label>Operation</label>
                            <select
                                className="form-control"
                                value={operation}
                                onChange={(e) => setOperation(e.target.value)}
                            >
                                <option value="addition">+</option>
                                <option value="subtraction">-</option>
                                <option value="multiplication">*</option>
                                <option value="division">/</option>
                                <option value="square_root">√</option>
                                <option value="random_string">↺</option>
                            </select>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={handleCalculate}>
                            Calculate
                        </button>
                    </form>
                    <div className="mt-3">
                        Result: <strong>{result}</strong>
                    </div>
                </div>
            </div>
        </div>
    );
};