import React from "react";

import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeUp from "@material-ui/icons/VolumeUp";

const Header = (props) => {
    const {
        isMuted,
        toggleMute,
        switchVideo,
        closeMenu,
        stationsData,
        volume,
        handleVolume,
    } = props;
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
                <Grid
                    container
                    spacing={2}
                    style={{
                        maxWidth: "350px",
                        width: "60vw",
                    }}
                >
                    <Grid item>
                        <VolumeDown style={{ color: "#fff" }} />
                    </Grid>
                    <Grid item xs>
                        <Slider
                            min={0}
                            max={1}
                            step={0.01}
                            value={volume}
                            onChange={handleVolume}
                            aria-labelledby="continuous-slider"
                            style={{ color: "#fff" }}
                        />
                    </Grid>
                    <Grid item>
                        <VolumeUp style={{ color: "#fff" }} />
                    </Grid>
                </Grid>
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
                    {/* <EditIcon
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
                    /> */}
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
                                    <a
                                        href={
                                            "#/" + stationsData[3].station_slug
                                        }
                                        onClick={function () {
                                            switchVideo(
                                                stationsData[3].station_url
                                            );
                                            closeMenu();
                                        }}
                                    >
                                        {stationsData[3].station_name}
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a
                                        href={
                                            "#/" + stationsData[4].station_slug
                                        }
                                        onClick={function () {
                                            switchVideo(
                                                stationsData[4].station_url
                                            );
                                            closeMenu();
                                        }}
                                    >
                                        {stationsData[4].station_name}
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a
                                        href={
                                            "#/" + stationsData[5].station_slug
                                        }
                                        onClick={function () {
                                            switchVideo(
                                                stationsData[5].station_url
                                            );
                                            closeMenu();
                                        }}
                                    >
                                        {stationsData[5].station_name}
                                    </a>
                                </li>
                            </ol>
                        </li>
                        <li className="menu-item">
                            <a
                                href={"#/" + stationsData[6].station_slug}
                                onClick={function () {
                                    switchVideo(stationsData[6].station_url);
                                    closeMenu();
                                }}
                            >
                                {stationsData[6].station_name}
                            </a>
                            <ol className="sub-menu">
                                <li className="menu-item">
                                    <a
                                        href={
                                            "#/" + stationsData[7].station_slug
                                        }
                                        onClick={function () {
                                            switchVideo(
                                                stationsData[7].station_url
                                            );
                                            closeMenu();
                                        }}
                                    >
                                        {stationsData[7].station_name}
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a
                                        href={
                                            "#/" + stationsData[8].station_slug
                                        }
                                        onClick={function () {
                                            switchVideo(
                                                stationsData[8].station_url
                                            );
                                            closeMenu();
                                        }}
                                    >
                                        {stationsData[8].station_name}
                                    </a>
                                </li>
                                <li className="menu-item">
                                    <a
                                        href={
                                            "#/" + stationsData[9].station_slug
                                        }
                                        onClick={function () {
                                            switchVideo(
                                                stationsData[9].station_url
                                            );
                                            closeMenu();
                                        }}
                                    >
                                        {stationsData[9].station_name}
                                    </a>
                                </li>
                            </ol>
                        </li>
                        <li className="menu-item">
                            <a
                                href={"#/" + "white-noise"}
                                onClick={function () {
                                    switchVideo("https://youtu.be/mCmlobVDp3o");
                                    closeMenu();
                                }}
                            >
                                White Noise
                            </a>
                        </li>
                    </ol>
                </nav>
            </header>
        </div>
    );
};

export default Header;
