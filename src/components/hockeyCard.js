import React, { Component } from 'react';
import classnames from 'classnames';

import styles from '../styles/hockeycard.module.css';

const positionMap = {
    "Right Wing": "RW",
    "Left Wing": "LW",
    "Center": "C",
    "Defence": "D",
    "Goalie": "G",
    "Referee": "R",
    "Coach": "Co"
}

export default class HockeyCard extends Component {
    render() {
        const { firstName, lastName, position, team,  number, isSmall, teams } = this.props;
        let size = isSmall ? styles.small : null;
        return (
            <div style={{backgroundColor: `${teams[team] ? teams[team].Color : "fff"}`}} className={classnames(styles.container, size)}>
                <div className={classnames(styles.topRow, size)}>
                    <div className={classnames(styles.position, size)}>{positionMap[position]}</div>
                    <div className={classnames(styles.name, size)}>{firstName + " " + lastName}</div>
                </div>
                <div className={classnames(styles.middleRow, size)}>

                </div>
                <div className={classnames(styles.bottomRow, size)}>
                    <div className={classnames(styles.teamName, size)}>{team}</div>
                    <div className={classnames(styles.number, size)}>#{number}</div>
                </div>
            </div>
        )
    }
}