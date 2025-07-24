//useless not to be used

import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from './withRouter'

export class Customerlist extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         customers: [],
         searchTerm: ""
        
      }
    }

    // componentDidMount(prevProps, prevState) { 
    //     axios.get('http://localhost:8000/customers')
    //         .then((res)=>{
    //             this.setState({customers: res.data})
    //         }).catch((err)=>{
    //             console.log(err)
    //         })

    //  }

     async componentDidMount() { 
        try{

            const res = await fetch('https://api-mongo-eta.vercel.app/customers')
            const json = await res.json();
            this.setState({customers: json})
        } catch (error) {
            console.log(error);
        }
         
      }


      deleteHandler = async user_id => {
        try{             
            const resp = await axios.delete('https://api-mongo-eta.vercel.app/customers/'+user_id)
            console.log(resp.data)
            this.setState({
                customers: this.state.customers.filter((resp)=>{
                    if(!resp._id.includes(user_id)){
                        return resp
                    }
                })
            })
        } catch (error) {
            console.log(error);
        }       
     }    

     editHandler = user_id => {       
        this.props.navigate('/edit-customer/:'+user_id)        
     }

     renderTableData() {
        return this.state.customers.map((customer, index) => {
            const { _id,user_id, first_name, last_name, email_user, phone_no,machines_assigned,machine_type, user_role } = customer; // destructuring object
            
            if (this.state.searchTerm === "" || first_name.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                return (
                    <tr key={user_id}> {/* Changed key to user_id */}
                        <td>{first_name}</td>
                        <td>{last_name}</td>
                        <td>{email_user}</td>
                        <td>{phone_no}</td>
                        <td>{machines_assigned}</td>
                        <td>{machine_type}</td>
                        <td>{user_role}</td>
                        
                        <td><button onClick={() => this.editHandler(_id)}>Edit</button></td> {/* Changed _id to user_id */}
                        <td><button onClick={() => this.deleteHandler(_id)}>Delete</button></td> {/* Changed _id to user_id */}
                    </tr>
                );
            }
            return null; // added to handle missing return statement
        });
    }
    
    //  renderTableData() {
    //      return this.state.customers.map((customer, index) => {
    //          const { _id, user_id, first_name, last_name, email, age } = customer //destructuring array
            
    //          if(this.state.searchTerm === "" ||
    //          first_name.toLowerCase().includes(
    //             this.state.searchTerm.toLowerCase())){
    //                 return (
                        
    //                     <tr key={_id}>
    //                         <td>{user_id}</td>
    //                         <td>{first_name}</td>
    //                         <td>{last_name}</td>
    //                         <td>{email}</td>
    //                         <td>{age}</td>
    //                         <td><button onClick={() => this.editHandler(_id)}>Edit</button></td>
    //                         <td><button onClick={() => this.deleteHandler(_id)}>Delete</button></td>
    //                     </tr>
    //                 )
    //             }
    //      })
    //  }


     searchText(searchTerm) {
         this.setState({
             searchTerm : searchTerm
         })
     }

  render() {
    return (
      <div>
          <input type="text" placeholder='Search...'
          onChange={(event) => this.searchText(event.target.value)}/>
          <br></br>
          <br></br>
          <table id='customers' border={1} align='center'>
              <tbody >
                  {this.renderTableData()}
              </tbody>
          </table>
      </div>
    )
  }
}

export default withRouter(Customerlist)