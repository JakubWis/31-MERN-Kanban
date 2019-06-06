import { connect } from 'react-redux';
import Lane from './Lane';
import * as laneActions from './LaneActions';
import { createLaneRequest } from './LaneActions';
import { deleteLaneRequest, updateLaneRequest } from './LaneActions';
import { createNoteRequest } from '../Note/NoteActions';
import { compose } from 'redux';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../Kanban/itemTypes';
import { moveBetweenLanesRequest } from './LaneActions';
import { moveWithinLane } from '../Note/NoteActions';

const mapStateToProps = (state, ownProps) => {  
  return ({laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId]) });
};
  
const mapDispatchToProps = {
  ...laneActions,
  createLane: createLaneRequest,
  deleteLane: deleteLaneRequest,
  updateLane: updateLaneRequest,
  addNote: createNoteRequest,
  moveBetweenLanes: moveBetweenLanesRequest,
};

const noteTarget = {
  drop(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const { id: noteId, laneId: sourceLaneId } = sourceProps;
 
    if (targetProps.lane.id !== sourceLaneId) {
      targetProps.moveBetweenLanes(
        targetProps.lane.id,
        noteId,
        sourceLaneId,
      );
    }

  },
 };
  
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DropTarget(ItemTypes.NOTE, noteTarget, (dragConnect) => ({
    connectDropTarget: dragConnect.dropTarget()
  }))
)(Lane);