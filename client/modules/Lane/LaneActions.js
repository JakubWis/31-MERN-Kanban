import callApi from '../../util/apiCaller';
import { lanes } from '../../util/schema';
import { normalize } from 'normalizr';
import { createNotes } from '../Note/NoteActions';

// Export Constants
export const CREATE_LANE = 'CREATE_LANE';
export const UPDATE_LANE = 'UPDATE_LANE';
export const DELETE_LANE = 'DELETE_LANE';
export const EDIT_LANE = 'EDIT_LANE';
export const CREATE_LANES = 'CREATE_LANES';
export const MOVE_BETWEEN_LANES = 'MOVE_BETWEEN_LANES';
export const UPDATE_LANE_NOTES = 'UPDATE_LANE_NOTES';

// Export Actions

export function createLaneRequest(lane) {
  return (dispatch) => {
    return callApi('lanes', 'post', lane).then(res => {
      dispatch(createLane(res));
    })
  }
}

export function createLane(lane) {
    return {
      type: CREATE_LANE,
      lane,
    };
}

export function updateLaneRequest(lane) {
  console.log(lane);
  return (dispatch) => {
    return callApi('lanes/editName/' + lane.id, 'put', {name: lane.name}).then(res => {
      dispatch(updateLane(lane))
    })
  }
}

export function updateLane(lane) {
    return {
      type: UPDATE_LANE,
      lane,
    };
}

export function deleteLaneRequest (laneId) {
  return (dispatch) => {
    return callApi('lanes/' + laneId, 'delete').then(res  => {
      dispatch(deleteLane(laneId))
    })
  }
}
  
export function deleteLane(laneId) {
    return {
      type: DELETE_LANE,
      laneId
    };
}

export function editLane(laneId) {
    return {
      type: EDIT_LANE,
      id: laneId
    }
}

export function createLanes(lanesData) {
  return {
    type: CREATE_LANES,
    lanes: lanesData,
  }
}

export function fetchLanes() {
  return (dispatch) => {
    return callApi('lanes').then(res => {
      const normalized = normalize(res.lanes, lanes);
      const {lanes: normalizedLanes, notes} = normalized.entities;
      
      dispatch(createLanes(normalizedLanes));
      dispatch(createNotes(notes));
    });
  };
}

export function moveBetweenLanesRequest(targetLaneId, noteId, sourceLaneId) {
  return (dispatch) => {
    return callApi('note/move/' +noteId, 'put', {newLaneId: targetLaneId}).then(res => {
      dispatch(moveBetweenLanes(targetLaneId, noteId, sourceLaneId))
    })
  }
}

export function moveBetweenLanes(targetLaneId, noteId, sourceLaneId) {
  return {
    type: MOVE_BETWEEN_LANES,
    targetLaneId,
    noteId,
    sourceLaneId,
  };
}

export function updateLaneNotes(noteId, laneId) {
  return {
  type: UPDATE_LANE_NOTES,
  noteId,
  laneId
  }
}