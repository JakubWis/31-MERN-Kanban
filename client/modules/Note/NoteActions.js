import callApi from '../../util/apiCaller';
import { updateLaneNotes } from '../Lane/LaneActions';
// Export Constants
export const CREATE_NOTE = 'CREATE_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';
export const CREATE_NOTES = 'CREATE_NOTES';
export const MOVE_WITHIN_LANE = 'MOVE_NOTES';

// Export Actions

export function createNoteRequest(note, laneId) {
  return (dispatch) => {
    return callApi('notes', 'post', { note, laneId }).then(noteResp => {
      dispatch(createNote(noteResp, laneId));
    });
  };
}

export function createNote(note, laneId) {
  return {
    type: CREATE_NOTE,
    laneId,
    note,
  };
 }

 export function updateNoteRequest(note) {
  return (dispatch) => {
    return callApi('notes/edit/' + note.id, 'put', {task: note.task}).then(res => {
      dispatch(updateNote(note))
    })
  }
}
  
export function updateNote(note) {
    return {
      type: UPDATE_NOTE,
      note,
    };
}

export function deleteNoteRequest(noteId, laneId) {
  return (dispatch) => {
    return callApi('notes/' +noteId, 'delete').then(res => {
      dispatch(updateLaneNotes(noteId, laneId))
      dispatch(deleteNote(noteId, laneId))
    })
  }
}
  
export function deleteNote(noteId, laneId) {
    return {
      type: DELETE_NOTE,
      noteId,
      laneId,
    };
}

export function editNote(noteId) {
  return {
    type: EDIT_NOTE,
    id: noteId,
  }
}

export function createNotes(noteData) {
  return {
    type: CREATE_NOTES,
    notes: noteData,
  }
}

export function moveWithinLane(laneId, targetId, sourceId) {
  return {
    type: MOVE_WITHIN_LANE,
    laneId,
    targetId,
    sourceId,
  };
}

