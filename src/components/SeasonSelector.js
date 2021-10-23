import React, { Component } from 'react';

import styles from '../styles/seasonselector.module.css';

export default class SeasonSelector extends Component {
    render() {
        return (
            <select onChange={this.props.handleSelection} value={this.props.selectedValue} className={styles.selector}>
                <option value="2">2021-2022</option>
                <option value="1">2020-2021</option>
            </select>
        );
    }
}