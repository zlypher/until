import React from "react";
import { msToTime, simplePluralize } from "./utils";
import "./Timer.css";

export const Timer = ({ time }) => {
    const { w, d, h, m, s, ms } = msToTime(time);

    const hStr = `${h}`.padStart(2, "0");
    const mStr = `${m}`.padStart(2, "0");
    const sStr = `${s}`.padStart(2, "0");
    const msStr = `${ms}`.padStart(3, "0");

    return (
        <div className="Timer">
            <div>
                {w > 0 && `${simplePluralize(w, "week")} and `}
                {d > 0 && simplePluralize(d, "day")}
            </div>
            <div>
                {hStr}:{mStr}:{sStr}.{msStr}
            </div>
        </div>
    );
};

export default Timer;
