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

                </div>
                <div className={classnames(styles.bottomRow)}>
                    <div className={classnames(styles.teamName)}>CYO Ducks</div>
                    <div className={classnames(styles.number)}>#{Number}</div>
                </div>
            </div>
        )
    }
}