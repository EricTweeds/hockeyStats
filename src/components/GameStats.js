import React, { Component } from 'react';

import { withGoogleSheets } from 'react-db-google-sheets';

import classnames from 'classnames';

import styles from "../styles/gamestats.module.css";

class GameStats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMore: false
        }
    }

    calculateTotals(games) {
        let ret = {
            GP: 0,
            Wins: 0,
            Loses: 0,
            Ties: 0,
            Pts: 0,
            GF: 0,
            GA: 0,
            Strk: ""
        };

        if (!games.length) {
            return ret;
        }

        let oppScore = parseInt(games[0]["Opponent Score"]);
        let yourScore = parseInt(games[0]["Team Score"]);
        let curStreak = oppScore > yourScore ? "L" : oppScore < yourScore ? "W" : "T";
        let streakCounter = 0;
        let streakEnded = false;
        games.forEach(game => {
            ret.GP += 1;
            if (parseInt(game["Opponent Score"]) > parseInt(game["Team Score"])) {
                if (curStreak === "L" && !streakEnded) {
                    streakCounter ++;
                } else {
                    streakEnded = true;
                }
                ret.Loses += 1;
            } else if (parseInt(game["Opponent Score"]) < parseInt(game["Team Score"])) {
                if (curStreak === "W" && !streakEnded) {
                    streakCounter ++;
                } else {
                    streakEnded = true;
                }
                ret.Wins += 1;
                ret.Pts += 2;
            } else if (parseInt(game["Opponent Score"]) === parseInt(game["Team Score"])) {
                if (curStreak === "T" && !streakEnded) {
                    streakCounter ++;
                } else {
                    streakEnded = true;
                }
                ret.Ties += 1;
                ret.Pts += 1;
            }
            ret.GF += parseInt(game["Team Score"]);
            ret.GA += parseInt(game["Opponent Score"]);
        });

        ret.Strk = `${curStreak}-${streakCounter}`;

        return ret;
    }

    render() {
        let games = this.props.db[this.props.sheetName].slice(0).reverse();
        let results = this.calculateTotals(games);
        return (
            <div className={styles.gameStats}>
                <div className={styles.results}>
                    {Object.keys(results).map(x => {
                        return (
                            <div className={styles.resultBox} key={x}>
                                <span className={styles.resultName}>{x}</span>
                                <span className={styles.resultValue}>{results[x]}</span>
                            </div>
                        );
                    })}
                </div>
                <div className={styles.games}>
                    {games.map((game, i) => {
                        if (i > 9 && !this.state.showMore) {
                            return;
                        }

                        let oppScore = parseInt(game["Opponent Score"]);
                        let yourScore = parseInt(game["Team Score"]);
                        let result = oppScore > yourScore ? "Loss" : oppScore < yourScore ? "Win" : "Tie";

                        return (
                            <div className={classnames(styles.gameBox, styles[result])} key={game.Date}>
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
                {games.length > 10 ? <div className={styles.showMoreButton} onClick={() => this.setState({showMore: !this.state.showMore})}>{this.state.showMore ? "Show Less" : "Show More"}</div> : null}
            </div>
        );
    }
}

export default withGoogleSheets('*')(GameStats);