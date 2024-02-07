import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Toast({ message }) {
    const toastMsg = toast(message);

    return (
        <div>
            {toastMsg}
            <ToastContainer />
        </div>
    );
}