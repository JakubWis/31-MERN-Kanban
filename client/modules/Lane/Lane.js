import React from 'react';
import NotesContainer from '../Note/NoteContainer';
import Edit from '../../components/Edit';

// Import Style
import styles from './Lane.css';

const Lane = (props) => {
    const { connectDropTarget, lane, laneNotes, updateLane, addNote, deleteLane, editLane } = props;
    const laneId = lane.id;

    return connectDropTarget(
      <div className={styles.Lane}>
        <div className={styles.LaneHeader}>
          <Edit 
            className={styles.LaneName}
            editing={lane.editing}
            value={lane.name}
            onValueClick={() => editLane(laneId)}
            onUpdate={name => updateLane({...lane, name, editing: false})}
          />
          <div className={styles.LaneAddNote}>
            <button onClick={() => addNote({task: 'New Note'}, laneId)}>Add Note</button>
          </div>
          <div className={styles.LaneDelete}>
            <button onClick={() => deleteLane(laneId)}>Remove lane</button>
          </div>
        </div>
        <NotesContainer
          notes={laneNotes}
          laneId={laneId}
        />
      </div>
    );
}

export default Lane;
