import React, { Component } from "react";
import { format } from "date-fns/esm";
import Timer from "./Timer";
import { paramsFromString } from "./utils";
import "./App.css";

const calculateRemainingTime = untilDate => {
    return untilDate - Date.now();
};

const loadFromUrl = () => {
    return paramsFromString(window.location.search);
};

const updateUrl = (title, untilDate, countWorkdays) => {
    const url = `/?title=${title}&until=${format(
        untilDate,
        "yyyy-MM-dd'T'HH:mm:ss"
    )}&wd=${countWorkdays}`;
    window.history.replaceState({}, document.title, url);
};

const toDateString = datetime => format(datetime, "yyyy-MM-dd");
const toTimeString = datetime => format(datetime, "HH:mm:ss");

class App extends Component {
    constructor(props) {
        super(props);

        const data = loadFromUrl();

        this.handle = null;
        this.mainEl = React.createRef();
        this.headerEl = React.createRef();

        const untilDate = data.until ? new Date(data.until) : new Date();

        this.state = {
            isConfigured: data.until !== null,
            dateValue: toDateString(untilDate),
            timeValue: toTimeString(untilDate),
            untilDate: untilDate,
            countWorkdays: data.countWorkdays || false,
            title: data.title || "",
            timeLeft: null
        };

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeUntilDate = this.onChangeUntilDate.bind(this);
        this.onChangeUntilTime = this.onChangeUntilTime.bind(this);
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
        const { title, countWorkdays, timeValue } = this.state;
        const dateValue = evt.target.value;
        const untilDate = new Date(`${dateValue}T${timeValue}`);

        this.setState(
            {
                untilDate: untilDate,
                dateValue: dateValue
            },
            () => {
                updateUrl(title, untilDate, countWorkdays);
                this.updateTimer();
            }
        );
    }

    onChangeUntilTime(evt) {
        const { title, countWorkdays, dateValue } = this.state;
        const timeValue = evt.target.value;
        const untilDate = new Date(`${dateValue}T${timeValue}`);

        this.setState(
            {
                untilDate: untilDate,
                timeValue: timeValue
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
        const {
            countWorkdays,
            title,
            timeLeft,
            dateValue,
            timeValue
        } = this.state;

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
                                type="date"
                                value={dateValue}
                                onChange={this.onChangeUntilDate}
                            />
                            <input
                                className="App-Input"
                                type="time"
                                value={timeValue}
                                onChange={this.onChangeUntilTime}
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
