import { connect } from 'react-redux';
import Lane from './Lane';
import * as laneActions from './LaneActions';
import { createLaneRequest, fetchLanes } from './LaneActions';
import { deleteLaneRequest, updateLaneRequest, editLane } from './LaneActions';
import { createNoteRequest } from '../Note/NoteActions';

const mapStateToProps = (state, ownProps) => {
    return {
      laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId])
    };
  };
  
const mapDispatchToProps = {
  ...laneActions,
  createLane: createLaneRequest,
  editLane,
  deleteLane: deleteLaneRequest,
  updateLane: updateLaneRequest,
  addNote: createNoteRequest,
};
  
export default connect(mapStateToProps,mapDispatchToProps)(Lane);