
import React from "react";
import { useState } from "react";
import axios from "axios";
import { Formik,  } from 'formik';
import * as Yup from 'yup';
import Login from "./login";
const CreateAccountForm = () => {
 
      const[ErrorMessage,setErrorMessage]=useState('')
      const [signUpSuccess, setSignUpSuccess] = useState(false);
      const[login,setLogin]=useState(false);
    
    
      const createAccountInitialValues = {
        email: '',
        password: '',
        name: '',
     
      };
    
      const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
        firstname: Yup.string().required('First Name is required'),
      }).defined();
    
      
      const handleSubmit = async (values) => {
        try {
          const response = await axios.post('http://localhost:3001/user', values);
          console.log(response);
          if(response.status === 201){
            setErrorMessage('')
            setLogin(true)
            setSignUpSuccess(true);
            console.log("this is after the fetch")
            console.log(signUpSuccess)

          }

        } catch (error) {
          console.error(error);
          if (error.response && error.response.data && error.response.data.msg) {
            setErrorMessage(error.response.data.msg);
          } else if (error.response && error.response.status === 409) {
            setErrorMessage('User already exists with this email');
          } else {
            setErrorMessage('An error occurred while processing the request');
          }
        }
      };
      
      return (
        
        <div className="container w-auto">
          <div className="max-w-md mx-auto mt-10  p-6 rounded-lg shadow-md">
            <div className="flex justify-between mb-4">

              {login?(<h1 className="text-center ml-20 pb-5 pl-10 text-4xl">Login</h1>):<h1 className="text-center ml-20 pb-5 pl-10 text-3xl"> Registration</h1>}
              {ErrorMessage && <div className="text-red-700">{ErrorMessage}</div>}
            </div>
    
            {/* Conditional rendering based on signUpSuccess */}
            {signUpSuccess ? (
              <Login onSubmit={handleSubmit} />
            ) : (

      <Formik
      initialValues={createAccountInitialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <form className="max-w-sm" onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
              htmlFor="inline-email"
            >
              Email
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-email"
              name="email"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
              htmlFor="inline-password"
            >
              Password
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-password"
              name="password"
              type="password"
              placeholder="******************"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500">{formik.errors.password}</div>
            ) : null}
          </div>
  
          <div className="mb-4">
            <label
              className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4"
              htmlFor="inline-name"
            >
              Name
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500">{formik.errors.name}</div>
            ) : null}
          </div>
         
        
          
  
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Sign Up
              </button>
              
              
            </div>
          </div>
        </form>
      )}
    </Formik>
              
            )}
          </div>
        </div>
      )
      
         
    };
    export default CreateAccountForm