import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Homepage from './pages/homepage';
import RootLayout from './layout/rootLayout';
import Services from './pages/services';
import OurTeams from './pages/our-teams';
import Contact from './pages/contact';


function App() {
 const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Homepage />} />
        <Route path="services" element={<Services />} />
        <Route path="team" element={<OurTeams />} />
        <Route path="contact" element={<Contact/>} />
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
