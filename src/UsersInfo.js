import React from 'react'
import axios from './config/axios'
//import { Redirect } from 'react-router-dom'


class UsersInfo extends React.Component{
    constructor(){
        super()
        this.state = {
            // users : [],
            fullName:'',
            email:'',
            contactNumber:'',
            job:'',
            exp:'',
            techSkills:'',
            adminDash: false
        }
    }
    handleChange = (e)=>{
        //console.log(e.target.name, e.target.value)
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const userData = {
            name: this.state.fullName,
            email:this.state.email,
            phone:this.state.contactNumber,
            skills: this.state.techSkills,
            jobTitle: this.state.job,
            experience: this.state.exp
            
            
        }
       
       // if(userData.job){
           axios.post('/users/application-form', userData)
          //axios.get('http://dct-application-form.herokuapp.com/users/application-forms')
            .then((response)=>{
                // console.log('resolve',response.data)
                // const users = response.data
                // this.setState({users})
                if(response.data.hasOwnProperty('error')){
                    alert(response.data.message)
                }else{
                    alert('Your application has been submitted')
                    this.setState({
                        fullName:'',
            email:'',
            contactNumber:'',
            job:'',
            exp:'',
            techSkills:''
                    })
                }
            })
            .catch((err)=>{
                console.log('reject',err)
            })
      }
    //     if(this.state.users.length>=1){
    //         return (
    //             this.setState({
    //                 adminDash:true
    //             })
    //         )
    //     }
    // }


    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                    <h1>Apply for Job</h1>
                    <form onSubmit={this.handleSubmit}>
            <div className="form-group">
            <label htmlFor='name'>Full name </label>
            <input type='text' id='name' name='fullName' value={this.state.fullName} onChange={this.handleChange} className="form-control"/>
            </div>
            
            <div className="form-group">
            <label htmlFor='email'>Email address </label>
            <input type="text" id='email' name = 'email'value={this.state.email} placeholder='example@gmail.com' onChange={this.handleChange} className="form-control"/>
            </div>
            
            <div className="form-group">
            <label htmlFor='number'>Contact Number </label>
            <input type='text' id='number' name ='contactNumber' value={this.state.contactNumber} placeholder='+91 9876543210' onChange={this.handleChange} className="form-control"/>
            </div>

            <div className="form-group">
            <label htmlFor='skill'>Applying for Job </label>
            <select id='skill' value={this.state.job} onChange={this.handleChange} name='job' className="form-control">
            <option value=''>Select</option>
            <option value='Front-End Developer'>FrontEnd Developer</option>
            <option value='Node.js Developer'>NodeJS Developer</option>
            <option value='MEAN Stack Developer'>MEAN Stack Developer</option>
            <option value='Full Stack Developer'>Full Stack Developer</option>
            </select>
            </div>
            
            <div className="form-group">
            <label htmlFor='exp'>Experience </label>
            <input type='text' id='exp' name='exp' value={this.state.exp} placeholder='Experience (2 years, 3 months)' onChange={this.handleChange} className="form-control"/>
            </div>

            <div className="form-group">
            <label htmlFor='technicalSkills'>Technical Skills </label>
            <textarea id ='technicalSkills' name='techSkills'rows='5' cols='40'  resize = 'none' value={this.state.techSkills} placeholder='Technical Skills' onChange={this.handleChange} className="form-control"/>
            </div>
            
            <input type='submit' value='send application' className="btn btn-primary"/>
            </form>
                    </div>
                </div>
                {/* {this.state.adminDash && <Redirect to={`/AdminDashboard`} />} */}
            
            </div>
        )
    }
}
export default UsersInfo