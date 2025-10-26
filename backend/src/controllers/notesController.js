import Note from '../models/note.js';

// Get all notes
export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json({ notes });
  } catch (error) {
    console.error('Error in getAllNotes:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Get note by ID
export async function getNoteByID(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json({ note });
  } catch (error) {
    console.error('Error in getNoteByID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Create note
export async function createNote(req, res) {
  console.log('createNote called with body:', req.body);
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json({ message: 'Note created successfully', note: newNote });
  } catch (error) {
    console.error('Error in createNote:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Update note
export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updatedNote) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json({ message: 'Note updated successfully', note: updatedNote });
  } catch (error) {
    console.error('Error in updateNote:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Delete note
export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json({ message: 'Note deleted successfully', note: deletedNote });
  } catch (error) {
    console.error('Error in deleteNote:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
