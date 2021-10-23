import React, { Component } from 'react';

import GoogleSheetsProvider from 'react-db-google-sheets';

import Overview from "./components/Overview";
import GameStats from "./components/GameStats";
import SeasonSelector from "./components/SeasonSelector";

import styles from "./styles/app.module.css";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.handleSelection = this.handleSelection.bind(this);

        this.state = {
            season: "2"
        }
    }

    handleSelection(e) {
        let value = e.target.value;
        this.setState({ season: value });
    }

    render() {
        return(
            <GoogleSheetsProvider>
                <div className={styles.header}>
                    <div className={styles.headerSeason}>
                        <SeasonSelector handleSelection={this.handleSelection} selectedValue={this.state.season} />
                    </div>
                    <div className={styles.headerNavName}>HOCKEY STATS</div>
                    <div style={{width: "33%"}}></div>
                </div>
                <div>
                    <div className={styles.games}>
                        <h1>Games</h1>
                        <div className={styles.gameStats}>
                            <GameStats sheetName={`Games-S${this.state.season}`} />
                        </div>
                    </div>
                    <div className={styles.playerStats}>
                        <h1>Player Stats</h1>
                        <div className={styles.playerStatsTable}>
                            <Overview sheetName={`Players-S${this.state.season}`} />
                        </div>
                    </div>
                </div>
            </GoogleSheetsProvider>
        );
    }
}