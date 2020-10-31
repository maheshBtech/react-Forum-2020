import React from 'react'
import {Formik} from 'formik'
import * as  Yup from 'yup'
import Axios from 'axios'
import Header from './header'
import {Link, Redirect} from 'react-router-dom'

// import {Switch,Route,BrowserRouter as Router} from 'react-router-dom'
// import Register from './Register'



const  Login =() => (
    
    <Formik
   
    initialValues = { 
        {
            email:'',
            password:''
            
        }
    }
    onSubmit = {(values,{resetForm}) =>
        {
            Axios.post('/login',values)
            .then(() =>
            { 
                resetForm() ;
                return (
                    <Redirect to = {{ pathname:"/register"}}/>
                )        
            })
            .catch((err) =>
            {
                console.log(err)
            })
            
        }}



        validationSchema = {
            Yup.object().shape(
                {
                    email:Yup.string()
                    .email()
                    .required("requird"),
                    password:Yup.string()
                    .required("required")
                }
            )
        }   
    >
       {
            props =>
            {
                const {values,errors,touched,handleChange,handleSubmit} = props
               

                return(
                    <div>

                          <Header/>

                         <h1 className = "heading">
                             Welcome to your <br/> learning community
                        </h1>

                        <form className = "login" onSubmit = {handleSubmit}>
                        {/* <label htmlFor = "email">Email:</label> */}
                            <input
                            type = "text"
                            name = "email"
                            placeholder = "Enter your email_id"
                            value = {values.email}
                            onChange = {handleChange}
                            className = {errors.email && errors.touched && "errors"}
                            /><br/>
                            {
                                errors.email && touched.email && (
                                    <div className = "errmsg">
                                        <p>{errors.email}</p>

                                    </div>
                                )
                            }
                                {/* <label htmlFor = "password">Password:</label> */}
                             <input
                            type = "password"
                            name = "password"
                            placeholder = "Enter your password"
                            value = {values.password}
                            onChange = {handleChange}
                            className = {errors.password && errors.touched && "errors"}
                            /><br/>
                            {
                                errors.password && touched.password && (
                                    <div className = "errmsg">
                                        <p>{errors.password}</p>

                                    </div>
                                )
                            }
                            
                            <button type = "submit"> Sign in</button>
                            <h4>Don't have account? <Link style = {{textDecoration:"unset",color:"#2977c9"}} to = "/register">Click here</Link></h4>
                        </form>
                      

                    </div>
                )
                
            }
    
       }
    </Formik>

) 
   


export default Login

// import React, { Component } from 'react'
// import { useHistory } from 'react-router-dom'
// import Header from './header'

// export class Login extends Component {
//     constructor(props) {
//         super(props)
    
//         this.state = {
//              email:"",
//              password:""
//         }
//     }
//     handleChange = e =>
//     {
//         this.setState({
//             [e.target.name] : e.target.value

//         })
//     }

//     handleSubmit = () =>
//     {


//     }

    
    

//     render() {
//         const { email,password} = this.state
//         return (
            
//                     <div>

//                           <Header/>

//                          <h1 className = "heading">
//                              Welcome to your <br/> learning community
//                         </h1>

//                         <form className = "login" onSubmit = {this.handleSubmit}>
                       
//                             <input
//                             type = "text"
//                             name = "email"
//                             placeholder = "Enter your email_id"
//                             value = {email}
//                             onChange = {this.handleChange}
                           
//                             /><br/>
                           
                                
//                              <input
//                             type = "password"
//                             name = "password"
//                             placeholder = "Enter your password"
//                             value = {password}
//                             onChange = {handleChange}
                           
//                             /><br/>
                           
                            
//                             <button type = "submit"> Sign in</button>
//                             <h4>Don't have account? <Link style = {{textDecoration:"unset",color:"#2977c9"}} to = "/register">Click here</Link></h4>
//                         </form>

//                     </div>
//                 )
//     }
// }

// export default Login

