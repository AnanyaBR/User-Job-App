import React from 'react'
import axios from './config/axios'
import moment from 'moment'


class AdminDashboard extends React.Component{
    constructor(){
        super()
        this.state={
            users:[], //1: {status: "rejected", createdAt: "2020-04-04T14:58:55.430Z", _id: "5e1ac53b875ac9001744b89a",             name: "Sam", email: "sam@gmail.com", …}
            selectedJob:'Front-End Developer',
            jobTitle: ['Front-End Developer', 'Node.js Developer', 'MEAN Stack Developer', 'FULL Stack Developer'],
            profileStatus:''
        }
    }
    componentDidMount(){
        axios.get('/users/application-forms')
        .then((response)=>{
            //console.log(response.data)
            const users= response.data
            this.setState({users})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    changeTitle=(title)=>{
   this.setState({selectedJob: title})
    }
    // handleFrontClick=()=>{
    //     //console.log('front end', this.state.users)
        
    //     this.setState(prevState=>(
    //         {
    //             users:prevState.users.filter(user =>user.jobTitle ==='Front-End Developer')}
            
    //     ),()=>{
    //         this.setState({title:this.state.users[0].jobTitle})
    //     })
        
    // }
    // handleNodeClick=()=>{
    //     //console.log('node', this.state.users)
    //     this.setState(prevState=>(
    //         {
    //             users:prevState.users.filter(user=>user.jobTitle ==='Node.js Developer')
    //             //title:this.state.users.jobTitle
    //         }
    //     ),()=>{
    //         this.setState({title:this.state.users[0].jobTitle})
    //     })
    // }
    // handleMeanClick=()=>{
    //    // console.log('mean', this.state.users)
    //     this.setState(prevState=>(
    //         {
    //             users:prevState.users.filter(user=>user.jobTitle ==='MEAN Stack Developer'),

    //         }
    //     ),()=>{
    //         this.setState({title:this.state.users[0].jobTitle})
    //     })
    // }
    // handleFullClick=()=>{
    //     this.setState(prevState=>(
    //         {
    //             users:prevState.users.filter(user=>user.jobTitle ==='FULL Stack Developer')
    //         }
    //     ),()=>{
    //         this.setState({title:this.state.users[0].jobTitle})
    //     })
    //     //console.log('full', this.state.users)
    // }

    handleView=(id)=>{
        axios.get(`/users/application-form/${id}`)
        
        .then((response)=>{
            //console.log(response.data)
    const user = response.data
    alert(`${user.name} Profile \n Contact Number : ${user.phone} \n email : ${user.email} \n skills: ${user.skills} \n experience: ${user.experience}`)
        })

        .catch((err)=>{
            console.log(err)
        })

    }

    handleStatus=(id,status)=>{
        axios.put(`/users/application-form/update/${id}`, {status})
        .then((response)=>{
            const user = response.data
            alert(`candidate has been ${user.status}`)
            this.setState(prevState=>({
                users:prevState.users.map(use=>{
                    if(use._id === user._id){
                        return{...user}
                    }else{
                        return{...use}
                    }
                })
            }))

        })
        .catch((err)=>{
            console.log(err)
        })
    }

    

    render(){
        console.log('skill', this.state.users)
      // console.log(this.state.title)
        return(
            <div>
                <h1>Admin Dashboard</h1>
                {/* <button onClick={()=>{
                    this.changeTitle('Front-End Developer')
                }}
                 >FrontEnd Developer</button> <button onClick={()=>{
                     this.changeTitle('Node.js Developer')
                 }}>NodeJS Developer</button> <button onClick={()=>{
                    this.changeTitle('MEAN Stack Developer')
                }}>MEAN Stack Developer</button> <button onClick={()=>{
                    this.changeTitle('FULL Stack Developer')
                }}>Full Stack Developer</button> */}

                {this.state.jobTitle.map(title=>{
                return <button onClick={()=>{this.changeTitle(title)}}>{title}</button>
                })}
        <h1>{this.state.selectedJob}s</h1>
    <p>List of candidates applied for {this.state.selectedJob} job</p>
    <table border='1px solid black'>
        <thead>
            <tr>
                <th>Name</th>
                <th>Technical Skills</th>
                <th>Experience</th>
                <th>Applied Data</th>
                <th>View Details</th>
                <th>Update Application Status</th>
            </tr>
        </thead>
        <tbody>{this.state.users.filter(user=> user.jobTitle === this.state.selectedJob).map(user=>{
            return(
                <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.skills}</td>
            <td>{user.experience}</td>
            <td>{moment(user.createdAt).format('DD/MM/YYYY')}</td>
            <td><button onClick = {()=>{
                this.handleView(user._id)
            }}>View Details</button></td>
            <td>
                {/* {user.status} */}
                {user.status === 'applied' ? (
                <div>
                <button onClick={()=>{
                    this.handleStatus(user._id, 'shortlisted')
                }} >Shortlist</button> <button onClick ={()=>{
                    this.handleStatus(user._id,'rejected')
                }}>Reject</button>
                </div>
            ):(
                <button>{user.status}</button>
            )}
            </td>
        </tr>
            )
        })
            }
        </tbody>
    </table>
            </div>
        )
    }
}
export default AdminDashboard