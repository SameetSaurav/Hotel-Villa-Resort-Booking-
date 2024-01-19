import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import IndexPage from './Components/IndexPage'
import LoginPage from './Components/LoginPage'
import Layout from './Layout'
import RegisterPage from './Components/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './userContext'
import AccountPage from './Components/AccountPage'
import ProfilePage from './Components/AccountPage'
import PlacesPage from './Components/PlacesPage'
import PlacesFormPage from './Components/PlacesFormPage'
import PlacePage from './Components/PlacePage'
import BookingsPage from './Components/BookingsPage'
import BookingPage from './Components/BookingPage'

axios.defaults.baseURL = "http://localhost:4000"
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/register" element={<RegisterPage />} /> 
          <Route path="/account" element={<ProfilePage />} /> 
          <Route path="/account/places" element={<PlacesPage />} /> 
          <Route path="/account/places/new" element={<PlacesFormPage />} /> 
          <Route path="/account/places/:id" element={<PlacesFormPage />} /> 
          <Route path="/place/:id" element={<PlacePage />} /> 
          <Route path="/account/bookings/:id" element={<BookingPage />} /> 
          <Route path="/account/bookings" element={<BookingsPage />} /> 
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
