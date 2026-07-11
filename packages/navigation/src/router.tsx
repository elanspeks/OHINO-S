import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { getRoutes } from './routeRegistry';
import { getRegisteredModules } from '@ohino/modules-system';

export function AppShell() {
  const registered = getRegisteredModules();
  const routes = getRoutes();

  return (
    <div style={{display:'flex', minHeight:'100vh'}}>
      <nav style={{width:240, borderRight:'1px solid #eee', padding:16}}>
        <h3>OHINO-S</h3>
        <ul style={{listStyle:'none', padding:0}}>
          <li><Link to="/">Home</Link></li>
          {registered.map((m:any) => (
            <li key={m.slug} style={{marginTop:8}}>
              <Link to={`/modules/${m.slug}`}>{m.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <main style={{flex:1, padding:16}}>
        <Routes>
          <Route path="/" element={<div><h2>Welcome to OHINO-S</h2><p>Select a module from the left to begin.</p></div>} />
          {routes.map(r => {
            const C = r.component;
            return <Route key={r.path} path={r.path} element={<C />} />;
          })}
        </Routes>
      </main>
    </div>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
