import React from "react";

import ReactPlayer from "react-player";

const VideoPlayer = (props) => {
    const { isMuted, volume, currentVideo } = props;
    return (
        <div className="tv">
            <ReactPlayer
                url={currentVideo}
                playing={true}
                width={"100%"}
                height={"100vh"}
                controls={false}
                volume={volume}
                muted={isMuted}
            />
        </div>
    );
};

export default VideoPlayer;
