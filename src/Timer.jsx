import React from "react";
import "./Timer.css";

const msToTime = msecs => {
    const ms = msecs % 1000;
    const secs = Math.floor(msecs / 1000);
    let d = Math.floor(secs / (60 * 60 * 24));

    let divHours = secs % (60 * 60 * 24);
    let h = Math.floor(divHours / (60 * 60));

    let divMinutes = secs % (60 * 60);
    let m = Math.floor(divMinutes / 60);

    let divSeconds = divMinutes % 60;
    let s = Math.ceil(divSeconds);

    return {
        d: d,
        h: `${h}`.padStart(2, "0"),
        m: `${m}`.padStart(2, "0"),
        s: `${s}`.padStart(2, "0"),
        ms: `${ms}`.padStart(3, "0")
    };
};

export const Timer = ({ time }) => {
    const { d, h, m, s, ms } = msToTime(time);

    return (
        <div className="Timer">
            {d > 0 && (
                <div>
                    {d}
                    days
                </div>
            )}
            <div>
                {h}:{m}:{s}.{ms}
            </div>
        </div>
    );
};

export default Timer;
