import Admin from "./pages/Admin/Admin";
import SingleBlog from "./pages/SingleBlog/SingleBlog";
import CreateBlog from "./pages/CreateBlog/CreateBlog";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UpdateUser from "./pages/UpdateUser/UpdateUser";
import { useContext } from "react";
import { Context } from "./context/Context";
import Edit from "./pages/Edit/Edit";

function App() {
  const {user} = useContext(Context);
  // env variable should be prefixed with REACT_APP_
  // for example REACT_APP_ADMIN_ID
  // console.log(process.env.REACT_APP_ADMIN_ID);
  return (
      <Router>
        <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/blog/:blogId' element={<SingleBlog/>} />
        <Route exact path='/edit/:blogId' element={user ? <Edit/> : <Login/>} />
        <Route exact path='/admin' element={user ? <Admin/> : (<Home/>)} />
        {/* <Route exact path='/admin' element={user ? ( (user._id === process.env.REACT_APP_ADMIN_ID) ? <Admin/> : (<Home/>)) : (<Home/>)} /> */}
        <Route exact path='/create' element={user ? <CreateBlog/> : <Login/>} />
        <Route exact path='/login' element={user ? <Home/> : <Login/>} />
        <Route exact path='/signup' element={user ? <Home/> : <SignUp/>} />
        <Route exact path='/update' element={user ? <UpdateUser/> : <Login/>} />
      </Routes>
    </Router>
  );
}

export default App;
