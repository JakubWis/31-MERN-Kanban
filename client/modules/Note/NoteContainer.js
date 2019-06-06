import { connect } from 'react-redux';
import Notes from './Notes';
import * as noteActions from './NoteActions';
import { deleteNoteRequest, editNote, updateNoteRequest, moveWithinLane } from './NoteActions';


const mapDispatchToProps = {
    editNote,
    updateNote: updateNoteRequest,
    deleteNote: deleteNoteRequest,
    moveWithinLane,
};

export default connect(null, mapDispatchToProps)(Notes);