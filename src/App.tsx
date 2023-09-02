import React from 'react';
import { createBrowserRouter, RouterProvider, } from 'react-router-dom';
import routes from './router';

import { CssBaseline } from '@mui/material';

function App() {
  const content = createBrowserRouter(routes);
  return (
    <>
      <CssBaseline />
      <RouterProvider router={content} />
    </>
  );
}

export default App;
