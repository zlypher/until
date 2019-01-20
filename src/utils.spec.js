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
            expect(simplePluralize(0, "day")).toEqual("0 days")
            expect(simplePluralize(0, "week")).toEqual("0 weeks")
            expect(simplePluralize(0, "month")).toEqual("0 months")
        })

        it("formats singular correctly", () => {
            expect(simplePluralize(1, "day")).toEqual("1 day")
            expect(simplePluralize(1, "week")).toEqual("1 week")
            expect(simplePluralize(1, "month")).toEqual("1 month")
        })

        it("formats plural correctly", () => {
            expect(simplePluralize(10, "day")).toEqual("10 days")
            expect(simplePluralize(2, "week")).toEqual("2 weeks")
            expect(simplePluralize(5, "month")).toEqual("5 months")
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
