import React from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import Axios from 'axios'
import {Link} from 'react-router-dom'


const  Register =() => (
    <Formik
    initialValues = {
        {
            username:'',
            email:'',
            password:''
           
        }
    }
    onSubmit = {(values,{resetForm}) =>
        {
            Axios.post('/save',values)
            .then((res) =>
            {
                console.log(res)
                .resetForm()
            })
            .catch((err) =>
            {
                console.log(err)
            })
            
        }}

        validationSchema = {
            Yup.object().shape(
                {
                    username:Yup.string()
                    .required("required")
                    .min(5,"username should contain atleat five characters"),
                    email:Yup.string()
                    .email()
                    .required("requird"),
                    password:Yup.string()
                    .required("required")
                    .min(5,"password should contain atleast five characters...")
                   
                }

            )
        }
    >
       {
            props =>
            {
                const {values,errors,touched,handleChange,handleSubmit} = props

                return(
                    <div className = "register">
                         <h1 className = "heading">
                             Join into your learning community
                        </h1>
                        <form onSubmit = {handleSubmit}>
                            {/* <label htmlFor = "email">Email:</label> */}
                            <input
                            type = "text"
                            name = "username"
                            placeholder = "Enter Your username"
                            value = {values.username}
                            onChange = {handleChange}
                            className = {errors.username && errors.touched && "errors"}
                            /><br/>
                            {
                                    errors.username && touched.username && (
                                    <div className = "errmsg">
                                        <p>{errors.username}</p>

                                    </div>
                                )
                            }





                            <input
                            type = "text"
                            name = "email"
                            placeholder = "Enter Your email_id"
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
                            placeholder="Enter your password"
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
                            <button type = "submit"> Join</button>
                            <h4>Already have account? <Link style = {{textDecoration:"unset",color:"#2977c9"}} to = "/">Click here</Link></h4>
                        </form>

                    </div>
                )
                
            }
    
       }
    </Formik>

) 
   


export default Register
