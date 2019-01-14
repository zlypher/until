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
    const countWorkdays = params.get("wd");
    const title = params.get("title");

    return { until, countWorkdays, title };
};

const updateUrl = (title, untilDate) => {
    const url = `/?title=${title}&until=${format(untilDate, "yyyy-MM-dd'T'hh:mm:ss")}`;
    window.history.replaceState({}, document.title, url);
}

class App extends Component {
    constructor(props) {
        super(props);

        const data = loadFromUrl();
        this.handle = null;
        this.state = {
            untilDate: data.until ? new Date(data.until) : new Date(),
            countWorkdays: data.countWorkdays || false,
            title: data.title || "",
            timeLeft: null
        };

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeUntilDate = this.onChangeUntilDate.bind(this);
        this.onChangeCountWorkdays = this.onChangeCountWorkdays.bind(this);
        this.updateTimer = this.updateTimer.bind(this);
    }

    onChangeTitle(evt) {
        const title = evt.target.value;
        this.setState({
            title: title
        }, () => updateUrl(title, this.state.untilDate));
    }

    onChangeUntilDate(evt) {
        this.setState({
            untilDate: new Date(evt.target.value)
        }, () => {
            updateUrl(this.state.title, this.state.untilDate)
            this.updateTimer();
        });
    }

    onChangeCountWorkdays(evt) {
        this.setState({
            countWorkdays: evt.target.checked
        });
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
                <header className="App-Header">
                    <h1 className="App-Title">{title}</h1>
                    {timeLeft != null && <Timer time={timeLeft} />}
                </header>
                <main className="App-Main">
                    <h2 className="App-SectionTitle">Configuration</h2>
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
                            value={format(untilDate, "yyyy-MM-dd'T'hh:mm:ss")}
                            onChange={this.onChangeUntilDate}
                        />
                    </label>

                    <label className="App-Label">
                        <span className="App-LabelText">Count Workdays</span>
                        <input
                            className="App-Checkbox"
                            type="checkbox"
                            value={countWorkdays}
                            onChange={this.onChangeCountWorkdays}
                        />
                    </label>
                </main>
            </div>
        );
    }
}

export default App;
