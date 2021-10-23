import React, { Component } from 'react';
import classnames from 'classnames';

import { withGoogleSheets } from 'react-db-google-sheets';

import { FaAngleUp, FaAngleDown, FaCircle } from "react-icons/fa";

import styles from "../styles/overview.module.css";
import HockeyCard from './hockeyCard';

class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sort: {
                col: "Pts",
                direction: "up"
            }
        };
    }

    componentDidMount() {
        if (this.props.db[this.props.sheetName] && this.props.db[this.props.sheetName].length) {
            let players = this.props.db[this.props.sheetName].slice(0).sort((a, b) => {
                a["Pts"] = parseInt(a["Pts"]);
                b["Pts"] = parseInt(b["Pts"]);
                a["G"] = parseInt(a["G"]);
                b["G"] = parseInt(b["G"]);
                if (a["Pts"] < b ["Pts"]) return 1;
                if (a["Pts"] === b ["Pts"]) return b["G"] - a["G"];
                return -1;
            });
            this.setState({selected: players[0], players: players});
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.db !== this.props.db || prevProps.sheetName !== this.props.sheetName) {
            if (!this.state.selected) {
                this.setState({selected: this.props.db[this.props.sheetName][0], players: this.props.db[this.props.sheetName].slice(0)});
            } else {
                this.setState({players: this.props.db[this.props.sheetName].slice(0)});
            }
        }
    }
    
    cardSelected(player) {
        this.setState({selected: player});
    }

    handleSort(col, direction) {
        if (col === this.state.sort.col && direction === this.state.sort.direction) {
            this.setState({sort: { direction: "up", col: "Pts" }, players: this.props.db[this.props.sheetName].slice(0), selected: this.props.db[this.props.sheetName][0]});
            return;
        }
        let players = this.state.players.sort((a, b) => {
            if (col !== 'Player' && col !== 'Position') {
                a[col] = parseInt(a[col]);
                b[col] = parseInt(b[col]);
            }
            if (a[col] < b[col]) return direction === "up" ? 1 : -1;
            if (a[col] === b[col]) return direction === "up" ? b["G"] - a["G"] : a["G"] - b["G"];
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
                {/* <div className={styles.controller}>

                </div> */}
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
                                            if (col === "Player" && player.Player === selected.Player) {
                                                return (
                                                    <td className={styles.column} key={`player-${player.Player}-${col}`}>
                                                        <FaCircle className={styles.selectedDot} /> {value}
                                                    </td>
                                                );
                                            }
                                            if (sort.col === col) {
                                                return (
                                                    <td className={styles.column} key={`player-${player.Player}-${col}`}>
                                                        <b>{value}</b>
                                                    </td>
                                                );
                                            }
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

export default withGoogleSheets('*')(Overview);