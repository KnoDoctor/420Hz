import React from "react";

import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import EditIcon from "@material-ui/icons/Edit";

const Header = (props) => {
    const { isMuted, toggleMute, switchVideo, closeMenu, stationsData } = props;
    console.log(stationsData);
    return (
        <div>
            <header className="page-header">
                <input id="menu-toggle-input" type="checkbox" />
                <label className="menu-toggle" htmlFor="menu-toggle-input">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
                <label onClick={toggleMute} className="mute-toggle-lable">
                    <div className="mute-toggle">
                        <span>
                            {isMuted ? (
                                <MicOffIcon
                                    style={{ color: "#fff", fontSize: "36px" }}
                                />
                            ) : (
                                <MicIcon
                                    style={{ color: "#fff", fontSize: "36px" }}
                                />
                            )}
                        </span>
                    </div>
                </label>

                <nav className="menu">
                    <EditIcon
                        style={{
                            position: "absolute",
                            top: "15px",
                            right: "50px",
                            color: "#fff",
                            fontSize: "36px",
                        }}
                        onClick={function () {
                            console.log("Edit Button Click!!");
                        }}
                    />
                    <ol>
                        <li
                            className="menu-item"
                            style={{ position: "relative" }}
                        >
                            <a
                                href={"#/" + stationsData[0].station_slug}
                                onClick={function () {
                                    switchVideo(stationsData[0].station_url);
                                    closeMenu();
                                }}
                            >
                                {stationsData[0].station_name}
                            </a>
                        </li>
                        <li className="menu-item">
                            <a
                                href={"#/" + stationsData[1].station_slug}
                                onClick={function () {
                                    switchVideo(stationsData[1].station_url);
                                    closeMenu();
                                }}
                            >
                                {stationsData[1].station_name}
                            </a>
                        </li>
                        <li className="menu-item">
                            <a
                                href={"#/" + stationsData[2].station_slug}
                                onClick={function () {
                                    switchVideo(stationsData[2].station_url);
                                    closeMenu();
                                }}
                            >
                                {stationsData[2].station_name}
                            </a>
                            <ol className="sub-menu">
                                <li className="menu-item">
                                    <a href="./bikinibeach/">Bikini Beach</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#0">Bigger Widgets</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#0">Huge Widgets</a>
                                </li>
                            </ol>
                        </li>
                        <li className="menu-item">
                            <a href="#0">Kabobs</a>
                            <ol className="sub-menu">
                                <li className="menu-item">
                                    <a href="#0">Shishkabobs</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#0">BBQ kabobs</a>
                                </li>
                                <li className="menu-item">
                                    <a href="#0">Summer kabobs</a>
                                </li>
                            </ol>
                        </li>
                        <li className="menu-item">
                            <a href="#0">Contact</a>
                        </li>
                    </ol>
                </nav>
            </header>
        </div>
    );
};

export default Header;
