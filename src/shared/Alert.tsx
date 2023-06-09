import React, { useContext } from 'react';
import { AlertContext } from '../contexts/AlertContext';

const Alert: React.FC = () => {
    const { alert, hideAlert } = useContext(AlertContext);

    if (!alert) {
        return null;
    }

    const { type, message } = alert;

    return (
        <div className="container">
            <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
                {message}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={hideAlert}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    );
};

export default Alert;
