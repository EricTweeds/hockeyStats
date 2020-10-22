import React, { Component } from 'react';

import { withGoogleSheets } from 'react-db-google-sheets';

import classnames from 'classnames';

import styles from "../styles/gamestats.module.css";

class GameStats extends Component {
    constructor(props) {
        super(props);
    }

    calculateTotals(games) {
        let ret = {
            GP: 0,
            Wins: 0,
            Loses: 0,
            Ties: 0,
            Pts: 0,
            GF: 0,
            GA: 0
        };
        games.forEach(game => {
            ret.GP += 1;
            if (parseInt(game["Opponent Score"]) > parseInt(game["Team Score"])) {
                ret.Loses += 1;
            } else if (parseInt(game["Opponent Score"]) < parseInt(game["Team Score"])) {
                ret.Wins += 1;
                ret.Pts += 2;
            } else if (parseInt(game["Opponent Score"]) === parseInt(game["Team Score"])) {
                ret.Ties += 1;
                ret.Pts += 1;
            }
            ret.GF += parseInt(game["Team Score"]);
            ret.GA += parseInt(game["Opponent Score"]);
        });

        return ret;
    }

    render() {
        let games = this.props.db.Games;
        let results = this.calculateTotals(games);
        return (
            <div className={styles.gameStats}>
                <div className={styles.results}>
                    {Object.keys(results).map(x => {
                        return (
                            <div className={styles.resultBox}>
                                <span className={styles.resultName}>{x}</span>
                                <span className={styles.resultValue}>{results[x]}</span>
                            </div>
                        );
                    })}
                </div>
                <div className={styles.games}>
                    {games.map(game => {
                        let oppScore = parseInt(game["Opponent Score"]);
                        let yourScore = parseInt(game["Team Score"]);
                        let result = oppScore > yourScore ? "Loss" : oppScore < yourScore ? "Win" : "Tie";
                        return (
                            <div className={classnames(styles.gameBox, styles[result])}>
                                <div className={styles.gameResult}>
                                    <span className={styles[`${result}-text`]}>{result}</span>    
                                </div>
                                <div className={styles.team}>
                                    <span className={styles.teamName}>{game.Opponent}</span>
                                    <span className={styles.gameScore}>{oppScore}</span>
                                </div>
                                <div className={styles.team} style={{marginTop: 0}}>
                                    <span className={styles.teamName}>Ducks</span>
                                    <span className={styles.gameScore}>{yourScore}</span>
                                </div>
                                <span className={styles.gameDate}>{game.Date}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default withGoogleSheets('Games')(GameStats);