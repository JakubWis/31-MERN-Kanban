import Lane from '../models/lane';
import Note from '../models/note';
import uuid from 'uuid';


export function getSomething(req, res) {
  return res.status(200).end();
}

export function addLane(req, res) {
  if (!req.body.name) {
    res.status(403).end();
  }

  const newLane = new Lane(req.body);

  newLane.notes = [];

  newLane.id = uuid();
  newLane.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(saved);
  });
}

export function getLanes(req, res) {
  Lane.find().exec((err, lanes) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ lanes });
  });
}

export function deleteLane(req, res) {
  Lane.findOne({ id: req.params.laneId }).exec((err, lane) => {
    if (err) {
      res.status(500).send(err);
    }
    lane.notes.forEach((notes) => {
       Note.findOneAndRemove( { id: notes.id } )
       .then(function() {
        console.log('Lane successfully deleted');
        });
      });
    lane.remove(() => {
      res.status(200).end();
    });
  });
}

export function editLaneName(req, res) {
  const { name } = req.body
  if(!name){
    res.status(400).end();
  }
  Lane.findOneAndUpdate({ id: req.params.laneId }, { name: name }, (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
  res.status(200).end();
}

