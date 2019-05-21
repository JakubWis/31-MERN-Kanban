import { Router } from 'express';
import * as NoteController from '../controllers/note.controller';

const router = new Router();

// Add a new Note
router.route('/notes').post(NoteController.addNote);
router.route('/notes').get(NoteController.getNotes);
router.route('/notes/:noteId').delete(NoteController.deleteNote);
router.route('/notes/edit/:noteId').put(NoteController.editNote);

export default router;
