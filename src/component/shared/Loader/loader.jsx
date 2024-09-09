import { Loader } from 'lucide-react';
import './loader.module.css';

const Loading = ({ message = 'Loading...' }) => (
    <div className="loader">
        <div className="loader-content ">
            <div role="alert" aria-live="assertive" className="flex items-center justify-center">
                <Loader className="mr-2 animate-spin" />
                <span>{message}</span>
            </div>
        </div>
    </div>
);

export default Loading;