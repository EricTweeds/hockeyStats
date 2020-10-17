import React, { Component } from 'react';

import styles from "../styles/overview.module.css";
import HockeyCard from './hockeyCard';

export default class Overview extends Component {
    render() {
        const { players, teams } = this.props;
        let player = players && players.length ? players[0] : {};
        return (
            <div className={styles.wrapper}>
                <div className={styles.controller}>

                </div>
                <div className={styles.data}>
                    <div className={styles.table}>
                        {players && players.length ?
                            <tr>
                                {Object.keys(players[0]).map(col => {
                                    return (
                                        <th>{col}</th>
                                    )
                                })}
                            </tr>   
                        : null}
                        {players && players.length ? 
                            players.map((player, i) => {
                                return (
                                    <tr className={styles.row} key={`player-${i}`}>
                                        {Object.values(player).map((col, j) => {
                                            return (
                                                <td className={styles.column} key={`player-${i}-${j}`}>{col}</td>
                                            );
                                        })}
                                    </tr>
                                );
                            })
                        : null}
                    </div>
                    <div className={styles.card}>
                        {/* <HockeyCard {...card} teams={teams} /> */}
                    </div>
                </div>
            </div>
        );
    }
}