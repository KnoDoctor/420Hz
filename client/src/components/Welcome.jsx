import React from "react";
import Four20HzLogo from "../images/Logo.png";

const Welcome = (props) => {
    const { closeWelcome, toggleMute } = props;

    return (
        <div className="cover">
            <div className="hi">
                <img src={Four20HzLogo}></img>
                <h1>Welcome to 420Hz Radio</h1>
                <p>
                    Listen to some chill beats, perfect For studying or what
                    ever...
                </p>
                <a
                    onClick={function () {
                        closeWelcome();
                        toggleMute();
                    }}
                    className="btn btn-2"
                >
                    Start Listening
                </a>
            </div>
        </div>
    );
};

export default Welcome;
