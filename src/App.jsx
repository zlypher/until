import React, { Component } from "react";
import { format } from "date-fns/esm";
import Timer from "./Timer";
import "./App.css";

const calculateRemainingTime = untilDate => {
    return untilDate - Date.now();
};

const loadFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const until = params.get("until"); // "1995-12-17T03:24:00"
    const countWorkdays = params.get("wd") === "true";
    const title = params.get("title");

    return { until, countWorkdays, title };
};

const updateUrl = (title, untilDate, countWorkdays) => {
    const url = `/?title=${title}&until=${format(
        untilDate,
        "yyyy-MM-dd'T'hh:mm:ss"
    )}&wd=${countWorkdays}`;
    window.history.replaceState({}, document.title, url);
};

class App extends Component {
    constructor(props) {
        super(props);

        const data = loadFromUrl();

        this.handle = null;
        this.mainEl = React.createRef();
        this.headerEl = React.createRef();

        this.state = {
            isConfigured: data.until !== null,
            untilDate: data.until ? new Date(data.until) : new Date(),
            countWorkdays: data.countWorkdays || false,
            title: data.title || "",
            timeLeft: null
        };

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeUntilDate = this.onChangeUntilDate.bind(this);
        this.onChangeCountWorkdays = this.onChangeCountWorkdays.bind(this);
        this.updateTimer = this.updateTimer.bind(this);
        this.onClickScrollTo = this.onClickScrollTo.bind(this);
    }

    onClickScrollTo(ref) {
        return () => {
            ref.current.scrollIntoView({ behavior: "smooth" });
        };
    }

    onChangeTitle(evt) {
        const { untilDate, countWorkdays } = this.state;
        const title = evt.target.value;

        this.setState(
            {
                title: title
            },
            () => updateUrl(title, untilDate, countWorkdays)
        );
    }

    onChangeUntilDate(evt) {
        const { title, countWorkdays } = this.state;
        const untilDate = new Date(evt.target.value);

        this.setState(
            {
                untilDate: untilDate
            },
            () => {
                updateUrl(title, untilDate, countWorkdays);
                this.updateTimer();
            }
        );
    }

    onChangeCountWorkdays(evt) {
        const { title, untilDate } = this.state;
        const countWorkdays = evt.target.checked;

        this.setState(
            {
                countWorkdays: countWorkdays
            },
            () => {
                updateUrl(title, untilDate, countWorkdays);
            }
        );
    }

    updateTimer() {
        const timeLeft = calculateRemainingTime(this.state.untilDate);
        if (timeLeft <= 0) {
            this.stopTimer();
            this.setState({
                timeLeft: 0
            });

            return;
        }

        this.setState(
            {
                timeLeft
            },
            () => {
                this.handle = requestAnimationFrame(this.updateTimer);
            }
        );
    }

    stopTimer() {
        if (this.handle) {
            cancelAnimationFrame(this.handle);
        }
    }

    componentDidMount() {
        if (!this.state.isConfigured) {
            this.mainEl.current.scrollIntoView({ behavior: "smooth" });
        }
        this.setState({
            timeLeft: calculateRemainingTime(this.state.untilDate)
        });

        this.handle = requestAnimationFrame(this.updateTimer);
    }

    componentWillUnmount() {
        this.stopTimer();
    }

    render() {
        const { untilDate, countWorkdays, title, timeLeft } = this.state;

        return (
            <div className="App">
                <header className="App-Header" ref={this.headerEl}>
                    <h1 className="App-Title">{title}</h1>
                    {timeLeft != null ? (
                        <Timer time={timeLeft} />
                    ) : (
                        <div>↓ Enter config below ↓</div>
                    )}
                    <button
                        onClick={this.onClickScrollTo(this.mainEl)}
                        className="App-ScrollBtn App-ScrollBtn--Light"
                    >
                        ↓
                    </button>
                </header>
                <main className="App-Main" ref={this.mainEl}>
                    <button
                        onClick={this.onClickScrollTo(this.headerEl)}
                        className="App-ScrollBtn App-ScrollBtn--Dark"
                    >
                        ↑
                    </button>
                    <h2 className="App-SectionTitle">Configuration</h2>
                    <div className="App-Config">
                        <label className="App-Label">
                            <span className="App-LabelText">Title</span>
                            <input
                                className="App-Input"
                                type="text"
                                value={title}
                                onChange={this.onChangeTitle}
                            />
                        </label>
                        <label className="App-Label">
                            <span className="App-LabelText">Final Date</span>
                            <input
                                className="App-Input"
                                type="datetime-local"
                                value={format(
                                    untilDate,
                                    "yyyy-MM-dd'T'hh:mm:ss"
                                )}
                                onChange={this.onChangeUntilDate}
                            />
                        </label>

                        <label className="App-Label App-Label--Horizontal">
                            <input
                                className="App-Checkbox"
                                type="checkbox"
                                checked={countWorkdays}
                                onChange={this.onChangeCountWorkdays}
                            />
                            <span className="App-LabelText">
                                Count Workdays
                            </span>
                        </label>
                    </div>
                </main>
            </div>
        );
    }
}

export default App;
