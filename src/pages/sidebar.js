import React from "react";
import styles from '../styles/Home.module.css';

export const Sidebar = ({isOpen, close}) => {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <h2>Options</h2>
      <ul>
        <li>Upload Video</li>
        <li>Edit Video</li>
        <li>Log Out</li>
      </ul>
      <div className={`${styles.bottomButton}`}>
        <button onClick={() => close(false)}>Close</button>
      </div>
    </div>
  )
}