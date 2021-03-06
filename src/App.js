import React from 'react'
import bootstrap from 'bootstrap/dist/css/bootstrap.css'
import UsersInfo from './UsersInfo'
import AdminDashboard from './Admin_Dashboard'
import {BrowserRouter, Route, Switch} from 'react-router-dom'


function App(props){
    return(
        <BrowserRouter>
        <div className="container">
            <h1>hello React</h1>
         <Switch>
             <Route path='/' component ={UsersInfo} exact ={true}/>
             <Route path='/AdminDashboard' component={AdminDashboard}/>
         </Switch>
        </div></BrowserRouter>
    )
}
export default App