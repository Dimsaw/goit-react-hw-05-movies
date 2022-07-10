// import { Suspense } from 'react';
// import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation';
import s from './AppBar.module.css';

function AppBar() {
  return (
    <>
      <header className={s.header}>
        <Navigation />
      </header>
      {/* <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main> */}
    </>
  );
}

export default AppBar;
