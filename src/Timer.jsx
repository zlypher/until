import React from "react";
import "./Timer.css";

const msToTime = msecs => {
    const ms = msecs % 1000;
    const secs = Math.floor(msecs / 1000);

    let w = Math.floor(secs / (60 * 60 * 24 * 7));

    let divDays = secs % (60 * 60 * 24 * 7);
    let d = Math.floor(divDays / (60 * 60 * 24));

    let divHours = secs % (60 * 60 * 24);
    let h = Math.floor(divHours / (60 * 60));

    let divMinutes = secs % (60 * 60);
    let m = Math.floor(divMinutes / 60);

    let divSeconds = divMinutes % 60;
    let s = Math.ceil(divSeconds);

    return { w, d, h, m, s, ms };
};

const simplePluralize = (count, word) => {
    return count === 1 ? `${count} ${word}` : `${count} ${word}s`;
};

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
