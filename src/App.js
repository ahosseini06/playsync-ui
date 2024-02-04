import './App.css';
import { ChakraProvider} from '@chakra-ui/react'
import { React } from 'react';
import './js/scripts.js'
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import { UserProvider } from './UserContext';
import useLocalStorage from './hooks/useLocalStorage';







 function App() {

  const router = createBrowserRouter  ([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "",
      element: <Dashboard />,
    },
    {
      path: "/signup",
      element: <Register  />,
    },
    {
      path: "/dashboard",
      element: <Dashboard/>,
    }
  ])

  return (
    
    
      <ChakraProvider>
        <title>Playmaker</title>
      <div className="container" style={{ padding: 0, width: "100%", margin: 0, maxWidth: "100%" }}>
        <RouterProvider router={router} />
      </div>
      </ChakraProvider>
  );
}

export default App;
