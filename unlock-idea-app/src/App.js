import React,{useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import LoginForm from './Components/Login/LoginForm';
import DashBoard from './Components/DashBoard/DashBoard';
import Menu from './Components/Menu/Menu';
import AvailableProducts from './Components/AvailableProducts/AvailableProducts';
import ConnectPeople from './Components/ConnectArea/ConnectPeople';
import Products from './Components/Products/Products';
import HelpLine from './Components/HelpLine/HelpLine';
import About from './Components/About/About';
import NotPageFound from './Components/NotPageFound/NotPageFound';
import SelectedRole from './Components/SelectedRole/SelectedRole';
import IdeaShare from './Components/IdeaShare/IdeaShare';
import { APIURL } from './Components/URL/url';
import axios from 'axios';
import { useSelectedRoleData } from './Components/Context/SelectedRoleContext';
import FollowPage from './Components/FollowersPage/FollowPage';
function App() {
  const ApiUrl = APIURL;
  const {allUserProfiles,setAllUserProfiles} = useSelectedRoleData();
  const userLoginEmail = localStorage.getItem("userLoginName");

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${ApiUrl}/getAllProfiles`,{
              params: { userLoginName: userLoginEmail},
        });
            
            if (Array.isArray(response.data)) {
                setAllUserProfiles(response.data); 
            } else {
                setAllUserProfiles([]); 
            }
        } catch (error) {
            console.error("Error fetching user profiles:", error);
            setAllUserProfiles([]); 
        }
    };

    fetchData();
}, [ApiUrl,userLoginEmail]); 

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path='/NotPageFound' element={<NotPageFound />} />

          <Route path="/home" element={<Navigate to="/home/dashboard" replace />} />

          <Route path="/home" element={<Home />} >
            <Route path="dashboard" element={<DashBoard />} >
              <Route path=":role" element={<SelectedRole />} />
            </Route>
            <Route path="menu" element={<Menu />} />
            <Route path="AvailableProducts" element={<AvailableProducts />} />
            <Route path='Connect' element={<ConnectPeople />} />
            <Route path='Followers' element={<FollowPage />} />
            <Route path='IdeaShare' element={<IdeaShare />} />
            <Route path='Products' element={<Products />} />
            <Route path='HelpLine' element={<HelpLine />} />
            <Route path='About' element={<About />} />
          </Route>
          <Route path=":role" element={<SelectedRole />} />

          <Route path="*" element={<Navigate to="/NotPageFound" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
