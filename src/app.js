import React, { Component } from 'react';

import GoogleSheetsProvider from 'react-db-google-sheets';

import Overview from "./components/Overview";
import GameStats from "./components/GameStats";

import styles from "./styles/app.module.css";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <GoogleSheetsProvider>
                <div className={styles.header}>
                    <span className={styles.headerNavName}>HOCKEY STATS</span>
                </div>
                <div className={styles.games}>
                    <h1>Games</h1>
                    <GameStats />
                </div>
                <div className={styles.playerStats}>
                    <h1>Player Stats</h1>
                    <div className={styles.playerStatsTable}>
                        <Overview />
                    </div>
                </div>
            </GoogleSheetsProvider>
        );
    }
}