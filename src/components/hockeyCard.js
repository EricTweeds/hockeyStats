import React, { Component } from 'react';
import classnames from 'classnames';

import styles from '../styles/hockeycard.module.css';

export default class HockeyCard extends Component {
    render() {
        const { Player, Number, Position, GP, G, A, Pts, PIM } = this.props;
        return (
            <div className={classnames(styles.container)}>
                <div className={classnames(styles.topRow)}>
                    <div className={classnames(styles.position)}>{Position}</div>
                    <div className={classnames(styles.name)}>{Player}</div>
                </div>
                <div className={classnames(styles.middleRow)}>
                    <div className={styles.statRow}>
                        <div className={styles.statBox}>
                            <span className={styles.statName}>G</span>
                            <span className={styles.statValue}>{G}</span>
                        </div>
                        <div className={styles.statBox}>
                            <span className={styles.statName}>A</span>
                            <span className={styles.statValue}>{A}</span>
                        </div>
                        <div className={styles.statBox}>
                            <span className={styles.statName}>Pts</span>
                            <span className={styles.statValue}>{Pts}</span>
                        </div>
                    </div>
                    <div className={styles.statRow}>
                        <div className={styles.statBox}>
                            <span className={styles.statName}>GP</span>
                            <span className={styles.statValue}>{GP}</span>
                        </div>

                        <div className={styles.statBox}>
                            <span className={styles.statName}>PIM</span>
                            <span className={styles.statValue}>{PIM}</span>
                        </div>
                    </div>
                </div>
                <div className={classnames(styles.bottomRow)}>
                    <div className={classnames(styles.teamName)}>CYO Ducks</div>
                    <div className={classnames(styles.number)}>#{Number}</div>
                </div>
            </div>
        )
    }
}