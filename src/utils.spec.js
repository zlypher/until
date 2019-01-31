import {
    msToTime,
    simplePluralize,
    paramsFromString
} from "./utils";

describe("Utility Functions", () => {
    describe("simplePluralize", () => {
        it("exports a function `simplePluralize`", () => {
            expect(simplePluralize).toBeDefined();
        })

        it("formats 0 correctly", () => {
            expect(simplePluralize(0, "day")).toEqual("days")
            expect(simplePluralize(0, "week")).toEqual("weeks")
            expect(simplePluralize(0, "month")).toEqual("months")
        })

        it("formats singular correctly", () => {
            expect(simplePluralize(1, "day")).toEqual("day")
            expect(simplePluralize(1, "week")).toEqual("week")
            expect(simplePluralize(1, "month")).toEqual("month")
        })

        it("formats plural correctly", () => {
            expect(simplePluralize(10, "day")).toEqual("days")
            expect(simplePluralize(2, "week")).toEqual("weeks")
            expect(simplePluralize(5, "month")).toEqual("months")
        })
    })

    describe("msToTime", () => {

        it("exports a function `msToTime`", () => {
            expect(simplePluralize).toBeDefined();
        })

        it("formats 6000ms correctly", () => {
            expect(msToTime(6000)).toEqual({
                w: 0,
                d: 0,
                h: 0,
                m: 0,
                s: 6,
                ms: 0
            })
        })

        it("formats 360050ms correctly`", () => {
            expect(msToTime(360050)).toEqual({
                w: 0,
                d: 0,
                h: 0,
                m: 6,
                s: 0,
                ms: 50
            })
        })

        it("formats a large number of milliseconds correctly", () => {
            expect(msToTime(12345678123)).toEqual({
                w: 20,
                d: 2,
                h: 21,
                m: 21,
                s: 18,
                ms: 123
            })
        })
    })

    describe("paramsFromString", () => {
        it("exports a function `paramsFromString`", () => {
            expect(paramsFromString).toBeDefined();
        })

        it("returns sensible default values for an empty string", () => {
            expect(paramsFromString("")).toEqual({
                countWorkdays: false,
                title: null,
                until: null
            });
        })

        it("can extract the query params correctly", () => {
            expect(paramsFromString("?title=Hello&until=2020-05-15T07:57:12&wd=true")).toEqual({
                countWorkdays: true,
                title: "Hello",
                until: "2020-05-15T07:57:12",
            });
        })
    })
})
