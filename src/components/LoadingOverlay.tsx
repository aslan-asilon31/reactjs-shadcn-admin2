// src/components/LoadingOverlay.tsx
import React from 'react';
import './LoadingOverlay.css'; // Import CSS for styling

const LoadingOverlay: React.FC = () => {
    return (
        <div className="loading-overlay">
            <div className="spinner"></div>
            <p>Loading...</p>
        </div>
    );
};

export default LoadingOverlay;
