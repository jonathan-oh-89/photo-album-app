import React from 'react'
import './App.css';
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AuthenticationForm from "./components/AuthenticationForm/AuthenticationForm";
import UserDashboard from "./pages/UserDashboard";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AppProvider } from "./context/appContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Gallery from './pages/Gallery';
import About from './pages/About';

function App() {
  return (
    <div className="App">
      <AppProvider>
        <BrowserRouter>
          <NavBar />
          <AuthenticationForm />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/photogallery' component={Gallery} />
            <Route exact path='/about' component={About} />
            <ProtectedRoute exact path='/userdashboard' component={UserDashboard} />
            <Route exact path='/NotFound' component={NotFound} />
            <Route><NotFound /></Route>
          </Switch>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;
