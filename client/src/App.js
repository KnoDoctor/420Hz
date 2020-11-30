//Import React
import React, { useState, useEffect } from "react";

//Import API
import { api } from "./api/api";

//Import Components
import Header from "./components/Header";
import Welcome from "./components/Welcome";
import VideoPlayer from "./components/VideoPlayer";
import FrequencySlider from "./components/FrequencySlider";

//Import Styles
import "./App.css";

function App() {
    //Define Data Refresh Function
    const [isLoading, setIsLoading] = useState(true);
    const [stationsData, setStationsData] = useState([]);
    const [isWelcome, setIsWelcome] = useState(true);
    const [volume, setVolume] = useState(35);
    const [isMuted, setIsMuted] = useState(true);
    const [currentVideo, setCurrentVideo] = useState(null);

    const refreshPageData = () => {
        setIsLoading(true);
        api(process.env.REACT_APP_API_ENDPOINT + "/api/stations/")
            .then((stationsData) => {
                console.log(stationsData);
                setStationsData(stationsData.stations);
                setCurrentVideo(stationsData.stations[0].station_url);
            })
            .catch((err) => {
                //Do Something
                console.log(err.Error);
            });
        setIsLoading(false);
    };

    //Fetch Page Data
    useEffect(() => {
        refreshPageData();
    }, []);

    const closeWelcome = () => setIsWelcome(false);
    const toggleMute = () => setIsMuted(!isMuted);
    const handleVolume = (event, newVolume) => {
        setVolume(newVolume);
    };
    const switchVideo = (url) => setCurrentVideo(url);
    const closeMenu = () => {
        let inputs = document.getElementById("menu-toggle-input");
        inputs.checked = false;
    };

    return (
        <div className="App">
            {isWelcome ? (
                <Welcome toggleMute={toggleMute} closeWelcome={closeWelcome} />
            ) : (
                <>
                    <Header
                        volume={volume}
                        handleVolume={handleVolume}
                        isMuted={isMuted}
                        toggleMute={toggleMute}
                        switchVideo={switchVideo}
                        closeMenu={closeMenu}
                        stationsData={stationsData}
                    />
                    <VideoPlayer
                        currentVideo={currentVideo}
                        isMuted={isMuted}
                        volume={volume}
                    />
                    <FrequencySlider />
                </>
            )}
        </div>
    );
}

export default App;
