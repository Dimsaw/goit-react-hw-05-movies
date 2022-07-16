import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation';
import s from './AppBar.module.css';

function AppBar() {
  return (
    <>
      <header className={s.header}>
        <Navigation />
      </header>
      <main className={s.main}>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <footer className={s.footer}>
        <h2> © 2022 GitHub, Inc. Footer navigation Terms Privacy</h2>
      </footer>
    </>
  );
}

export default AppBar;
