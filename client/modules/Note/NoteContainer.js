import { connect } from 'react-redux';
import Notes from './Notes';
import * as noteActions from './NoteActions';
import { deleteNoteRequest } from './NoteActions';


const mapDispatchToProps = {
    ...noteActions,
    deleteNote: deleteNoteRequest,
};

export default connect(null, mapDispatchToProps)(Notes);