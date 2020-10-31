
import React,{ useContext ,useState} from 'react'
import UserContext from '../../context/userContext';
import Axios from 'axios'
import {useHistory} from 'react-router-dom'

function Myblog() {
    const { userData } = useContext(UserContext);
    const [ question ,setQuestion] = useState();
    const [file ,setFile] = useState();
    // const [filename,setfilename] = useState();
    const [uploadfile,setuploadfile] = useState({});
    const history = useHistory()

    // const display =  () =>
    // {
    //    console.log(userData.user.id)

    // }

   const submit = async(e) =>
    {
        e.preventDefault()
        try{
            const newQue = {question}
            await Axios.post('/saveQues',newQue)
            history.push('/active')
        }
        catch(err)
        {
            alert(err)
        }

    }

    const updateprofile = (e) =>
    {
        e.preventDefault()
     
        const data = new FormData();
        data.append('pic',file)
        data.append('id',userData.user.id)
        Axios.post('/uploadprofile',data)
        .then((res) =>
        {
            // console.log(res.data)
           const {path} = res.data 
            setuploadfile({path})
            // console.log(uploadfile.path)
            // display()
            
        })
        .catch((err) =>
        {
            console.log(err)
        })
    }

    return (
        <div>
            <div className = "blogContainer">
                <h1 style = {{fontWeight : "lighter"}}>Hello</h1>
            <div className = "">
            {
                <div>
                    {
                        uploadfile.path?
                        <div>
                            <img style = {{borderRadius:"50px",marginBottom:"10px"}} src = {uploadfile.path} alt = "" height = "200px"/>
                            </div>
                            :<img style = {{borderRadius:"50px",marginBottom:"10px"}} src = {userData.user.profilepic} alt = "" height = "200px"/>
                    }

                    <form onSubmit = {updateprofile} className = "blogform">

                        <label id = "label" htmlFor = "file">Edit Image</label>
                        <input id = "file" type = "file"
                        onChange = {(e)=>setFile(e.target.files[0]) }
                            />
                        <button>Apply</button> 

                    </form>
                   
                    
                <h1> {userData.user.username}</h1>
                <h4 style = {{fontWeight : "lighter"}}>{userData.user.college}</h4>
                    </div>
            }
            <div id = "form">
                <form onSubmit = {submit}>
                    <input type = "text" 
                    placeholder = "Ask Questions here..."
                    onChange = {(e) => setQuestion(e.target.value)}
                    />
                    <br/>
                    <button type = "submit">Ask </button>
                </form>
            </div>

            </div>
            </div>
            
        </div>
    )
}

export default Myblog
