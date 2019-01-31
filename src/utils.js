export const msToTime = msecs => {
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

    return {
        w,
        d,
        h,
        m,
        s,
        ms
    };
};

export const simplePluralize = (count, word) => {
    return count === 1 ? word : `${word}s`;
};

export const paramsFromString = (queryString) => {
    const params = new URLSearchParams(queryString);
    const until = params.get("until");
    const countWorkdays = params.get("wd") === "true";
    const title = params.get("title");

    return {
        until,
        countWorkdays,
        title
    };
}
