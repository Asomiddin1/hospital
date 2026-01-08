import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Homepage from './pages/homepage';
import RootLayout from './layout/rootLayout';


function App() {
 const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Homepage />} />
      </Route>
    )
  );
  return (
    <div className="w-full max-w-[1920px] mx-auto max-h-[1080px]">
     <RouterProvider router={routes}/>
    </div>
  )
}

export default App
