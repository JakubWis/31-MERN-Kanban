import React from 'react';
import Lane from './LaneContainer';

import styles from './Lanes.css';

const Lanes = ({ lanes }) => {
    return (
        <div className={styles.Lanes}>
            {lanes.map( lane => <Lane key={lane.id} lane={lane}/> )}
        </div>
    );
};


export default Lanes;