import React from 'react';
import Note from './Note';
import Edit from '../../components/Edit';

const Notes = ({ notes, laneId, editNote, updateNote, deleteNote}) => {
    return (<ul className="notes">{notes.map(note => 
        <Note
            id={note.id}
            key={note.id}
        >
            <Edit
                editing={note.editing}
                value={note.task}
                onValueClick={() => editNote(note.id)}
                onUpdate={(task) => updateNote({
                    ...note,
                    task,
                    editing: false,
                }
                )}
                onDelete={() => deleteNote(note.id, laneId)}
            />
        </Note>
    )}</ul>);
};


export default Notes;