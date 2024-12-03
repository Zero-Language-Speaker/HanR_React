import React from "react";

export default function MissionBtn(props) {

    const generateMission = () => {
        props.actions.generateMission();
    }

    return (
        <div className="mission-btn-container">
            <button className="mission-btn" onClick={() => generateMission()}>Next Mission</button>
        </div>
    )
}