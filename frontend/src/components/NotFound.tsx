import React from "react";

const NotFound: React.FC = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <div className="not-found-text">
                <h1 style={{ textAlign: 'center' }}>404</h1>
                <h2>This page does not exist...</h2>
            </div>
            <div className="not-found-actions" id="actions_buttons">
                <button
                    className="not-found-button"
                    onClick={() => window.history.back()}
                >
                    Go back
                </button>
            </div>
        </div>
    );
}

export default NotFound;
