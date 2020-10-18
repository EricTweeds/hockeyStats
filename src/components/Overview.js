import React, { Component } from 'react';
import classnames from 'classnames';

import { withGoogleSheets } from 'react-db-google-sheets';

import { FaAngleUp, FaAngleDown } from "react-icons/fa";

import styles from "../styles/overview.module.css";
import HockeyCard from './hockeyCard';

class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sort: {
                col: "G",
                direction: "up"
            }
        };
    }

    componentDidMount() {
        if (this.props.db.Players && this.props.db.Players.length) {
            this.setState({selected: this.props.db.Players[0], players: this.props.db.Players.slice(0)}); 
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.db !== this.props.db) {
            if (!this.state.selected) {
                this.setState({selected: this.props.db.Players[0], players: this.props.db.Players.slice(0)});
            } else {
                this.setState({players: this.props.db.Players.slice(0)});
            }
        }
    }
    
    cardSelected(player) {
        this.setState({selected: player});
    }

    handleSort(col, direction) {
        if (col === this.state.sort.col && direction === this.state.sort.direction) {
            this.setState({sort: { direction: "up", col: "G" }, players: this.props.db.Players.slice(0), selected: this.props.db.Players[0]});
            return;
        }
        let players = this.state.players.sort((a, b) => {
            if (a[col] < b [col]) return direction === "up" ? 1 : -1;
            return direction === "up" ? -1 : 1;
        });
        this.setState({selected: players[0], players, sort: {direction: direction, col: col}});
    }

    render() {
        const { players, selected, sort } = this.state;

        let player = selected;

        let headers = ["Player", "Position", "Number", "GP", "G", "A", "Pts", "PIM"];
        return (
            <div className={styles.wrapper}>
                <div className={styles.controller}>

                </div>
                <div className={styles.data}>
                    <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                        {players && players.length ?
                            <tr className={styles.headerRow}>
                                {headers.map(col => {
                                    let selectedUp = sort.col === col && sort.direction === "up" ? styles.selected : null;
                                    let selectedDown = sort.col === col && sort.direction === "down" ? styles.selected : null;
                                    return (
                                        <th key={`player-header-${col}`} className={styles.rowHeader}>
                                            <span>{col}</span>
                                            <div className={styles.sort}>
                                                <FaAngleUp className={classnames(styles.sortIcon, selectedUp)} onClick={this.handleSort.bind(this, col, "up")}/>
                                                <FaAngleDown className={classnames(styles.sortIcon, selectedDown)} onClick={this.handleSort.bind(this, col, "down")} />
                                            </div>
                                        </th>
                                    );
                                })}
                            </tr>   
                        : null}
                        </thead>
                        <tbody className={styles.tableBody}>
                        {players && players.length ? 
                            players.map(player => {
                                return (
                                    <tr className={styles.row} key={`player-${player.Player}`} onClick={this.cardSelected.bind(this, player)}>
                                        {headers.map(col => {
                                            let value = player[col];
                                            return (
                                                <td className={styles.column} key={`player-${player.Player}-${col}`}>
                                                    {value}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })
                        : null}
                        </tbody>
                    </table>
                    </div>
                    <div className={styles.card}>
                        <HockeyCard {...player} />
                    </div>
                </div>
            </div>
        );
    }
}

export default withGoogleSheets('Players')(Overview);