import React, { Component } from "react";
import Timer from "./Timer";
import "./App.css";

const calculateRemainingTime = untilDate => {
    return untilDate - Date.now();
};

class App extends Component {
    constructor(props) {
        super(props);

        const params = new URLSearchParams(window.location.search);
        const until = params.get("until"); // "1995-12-17T03:24:00"

        this.untilDate = new Date(until);
        this.handle = null;
        this.state = {
            timeLeft: null
        };

        this.updateTimer = this.updateTimer.bind(this);
    }

    updateTimer() {
        const timeLeft = calculateRemainingTime(this.untilDate);
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
            timeLeft: calculateRemainingTime(this.untilDate)
        });

        this.handle = requestAnimationFrame(this.updateTimer);
    }

    componentWillUnmount() {
        this.stopTimer();
    }

    render() {
        const { timeLeft } = this.state;

        return (
            <div className="App">
                <header>
                    <label>
                        Final Date
                        <input type="datetime-local" />
                    </label>

                    <label>
                        Count Workdays
                        <input type="checkbox" />
                    </label>
                </header>
                <main>{timeLeft != null && <Timer time={timeLeft} />}</main>
            </div>
        );
    }
}

export default App;
