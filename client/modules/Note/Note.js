import React from 'react';

// Import Style
import styles from './Note.css';

const Note = props => <li className={styles.Note}> { props.children } </li>;

export default Note;
