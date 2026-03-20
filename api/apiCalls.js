import axios from "axios"



export const getBlogsData = async() =>{
    try {
        let get_blogs = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/blogs`)
        return get_blogs.data;
    } catch (err) {
        console.log(err);
    }
}

export const getUsersData = async () =>{
    try{
        let get_users = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/users`)
        return get_users.data;
    } catch (err) {
        console.log(err);
    }
}

export const loginUser = async(params) =>{
    try {
        let login = await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/users/login`,params)
        return login
    } catch (err) {
        console.log(err)
    }
}

