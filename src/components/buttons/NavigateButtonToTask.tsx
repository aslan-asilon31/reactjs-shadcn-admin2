import { Link } from 'react-router-dom';

const NavigateButtonToTask: React.FC = () => {
    return (
        <Link to="/tasks">
            <button className="bg-red-600 text-white p-2 rounded">
                Go to Tasks
            </button>
        </Link>
    );
};

export default NavigateButtonToTask;
