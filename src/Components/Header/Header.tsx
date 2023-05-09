import * as React from 'react';
import headerStyle from './Header.module.css'

export default function Header () {
  return (
    <header className={headerStyle.header}>
      <h1>Your Task List</h1>
    </header>
  );
}
