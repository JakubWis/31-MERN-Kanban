import Note from '../models/note';
import Lane from '../models/lane';
import uuid from 'uuid';

export function addNote(req, res) {
  const { note, laneId } = req.body;

  if (!note || !note.task || !laneId) {
    res.status(400).end();
  }

  const newNote = new Note({
    task: note.task,
  });

  newNote.id = uuid();
  newNote.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    Lane.findOne({ id: laneId })
      .then(lane => {
        console.log(saved);
        lane.notes.push(newNote);
        return lane.save();
      })
      .then(() => {
        res.json(saved);
      });
  });
}

export function getNotes(req, res) {
  Note.find().exec((err, notes) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ notes });
  });
}

export function getNote(req, res) {
  Note.find({id: req.params.noteId}).exec((err, note) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ note });
  });
}

export function deleteNote(req, res) {
  Note.findOneAndRemove({ id: req.params.noteId}, (err, note) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).end();
  });
}

export function editNote(req, res) {
  const { task } = req.body
  if(!task){
    res.status(400).end();
  }
  Note.findOneAndUpdate({ id: req.params.noteId }, { task: task }, (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
  res.status(200).end();
}

export async function moveNoteToLane(req, res) {
  try {
    const { newLaneId } = req.body
    let movingNote;

    //inject moving note to variable
    movingNote = await Note.findOne({ id: req.params.noteId })
    console.log( 'movingnote = ' , movingNote )
    
    //deleting note
    await Note.findOneAndRemove({ id: req.params.noteId })

    //adding note

    const newNote = new Note({
      task: movingNote.task,
    })
    newNote.id = movingNote.id;
    let savedNote = await newNote.save()
    console.log( 'savedNote = ' ,savedNote )
    let lane = await Lane.findOne({ id: newLaneId })
      console.log( 'lane notes before =', lane.notes  )
      lane.notes.push(savedNote);
      console.log( 'lane notes after =', lane.notes  )
      lane.save();
    
    res.status(200).end();
  }catch(err)
  {res.status(404).send(err)}
}
