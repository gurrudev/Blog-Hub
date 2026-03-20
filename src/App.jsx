import './App.css'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import BlogPost from './pages/BlogPost'
import UserProfile from './pages/UserProfile'
import NotFound404 from './pages/NotFound404'
import { WriteBlog } from './pages/WriteBlog'
import EditProfile from './pages/EditProfile'
import EditBlog from './pages/EditBlog'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>}/>
          <Route path="/"
            element={
              <>
                <Home/>
                <Footer />
              </>
            }
          />

          <Route path='/post/:id' element={<BlogPost/>}/>
          <Route path='/profile' element={<UserProfile/>}/>
          <Route path='/create-post' element={<WriteBlog/>}/>
          <Route path='/edit-profile' element={<EditProfile/>}/>
          <Route path='/edit-post/:id' element={<EditBlog/>}/>
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </Router>
    </>
  )
}

export default App