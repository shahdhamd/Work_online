import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import '@fortawesome/fontawesome-free/css/all.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Categorys from './Pages/Categorys';
import Subcategory from './Pages/Subcategory';
import Cart from './Pages/Cart';
import SellerProfile from './Pages/SellerProfile';
import Profile from './Pages/Profile';
import Register from './Pages/Register';
import Login from './Pages/Login';
import ChangePassword from './Pages/ChangePassword';
import AddUserService from './Pages/AddUserService';
import ShowService from './Pages/ShowService';
import { jwtDecode } from 'jwt-decode';
import SendCode from './Pages/SendCode';
import Dashboard from './Pages/Admin/Dashboard';
import MainLayout from './Pages/MainLayout';
import UserList from './Pages/Admin/UserList';
import ServiceList from './Pages/Admin/ServiceList';
import AddService from './Pages/Admin/AddService';
import UpdateService from './Pages/Admin/UpdateService';
import SubserviceList from './Pages/Admin/SubserviceList';
import AddSubService from './Pages/Admin/AddSubService';
import DashboardLayout from './Pages/Admin/DashboardLayout';
import UpdateSubservice from './Pages/Admin/UpdateSubservice';
import axios from 'axios';
import SearchResult from './Pages/SearchResult';
import UserService from './Pages/Admin/UserService';
import CreditCard from './Pages/CreditCard';
import AddContact from './Pages/Addcontact';
import AddReport from './Pages/AddReport';
import Contactlist from './Pages/Admin/Contactlist';


function App() {
  let [loginData, setLoginData] = useState('')
  const navigate = useNavigate();

  function setUserData() {
    let token = localStorage.getItem('token')
    let decoded = jwtDecode(token)
    setLoginData(decoded);
    console.log(loginData)

  }
  function logout() {
    console.log('Logging out...');
    localStorage.removeItem('token');
    setLoginData(null);
    navigate('/login')
  }

  const [services, setService] = useState();
  let token = `rand__${localStorage.getItem('token')}`
  const getData = async () => {
    let { data } = await axios.get('http://localhost:3001/api/v1/services/find'
    // , {
    //   headers: {
    //     token: token
    //   }
    // }
  );
    console.log('app', data)
    setService(data.findAll);
    console.log('service', services)
  }
  useEffect(() => {
    if (localStorage.getItem('token')) {
      let decoded = jwtDecode(localStorage.getItem('token'));
      setLoginData(decoded);
      console.log(loginData)

    }
    getData();

  }, [])

  return (
    <>
        <Routes>
          {/* Routes with Navbar and Footer */}
          <Route path='/' element={<MainLayout loginData={loginData} logout={logout} services={services} />}>
            <Route index element={<Home />} />
            <Route path='/category/:id' element={<Categorys />} />
            <Route path='/subcategory/:id/:modelId' element={<Subcategory services={services} />} />
            <Route path='/cart' element={<Cart loginData={loginData} />} />
            <Route path='/user' element={<SellerProfile />} />
            <Route path='/profile' element={<Profile loginData={loginData} />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login setUserData={setUserData} />} />
            <Route path='/reset' element={<SendCode />} />
            <Route path='/change' element={<ChangePassword />} />
            <Route path='/new' element={<AddUserService services={services} />} />
            <Route path='/show/:serivceId/:modelId/:id' element={<ShowService loginData={loginData} services={services}/>} />
            <Route path='/home' element={<Home />} />
            <Route path="/search" element={<SearchResult services={services} />} />
            <Route path="/credit" element={<CreditCard loginData={loginData} />} />
            <Route path='/addContact/:id' element={< AddContact/>}/>
            <Route path='/AddReport' element={< AddReport/>}/>
          </Route>

          {/* Route without Navbar and Footer */}
          <Route path='/' element={<DashboardLayout loginData={loginData} />}>
            <Route path='dashboard' element={<Dashboard logout={logout} />} />
            <Route path='userr' element={<UserList />} />
            <Route path='service' element={<ServiceList />} />
            <Route path='add/service' element={<AddService />} />
            <Route path='update/:id' element={<UpdateService />} />
            <Route path='show/:id' element={<SubserviceList />} />
            <Route path='add/SubService/:id' element={<AddSubService />} />
            <Route path='update/:id/:modelId' element={<UpdateSubservice />} />
            <Route path='show/:serviceId/:id' element={<UserService />} />
            <Route path='contact' element={<Contactlist/>}/>

           

          </Route>
        </Routes>



    </>
  )
}

export default App
