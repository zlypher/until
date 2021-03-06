import React from "react";
import Mono from "./Mono";
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
                {w > 0 && (
                    <>
                        <Mono>{w}</Mono>
                        <span> {simplePluralize(w, "week")}</span>
                    </>
                )}
                {w > 0 && d > 0 && <span> and </span>}
                {d > 0 && (
                    <>
                        <Mono>{d}</Mono>
                        <span> {simplePluralize(d, "day")}</span>
                    </>
                )}
            </div>
            <Mono>
                {hStr}:{mStr}:{sStr}.{msStr}
            </Mono>
        </div>
    );
};

export default Timer;
