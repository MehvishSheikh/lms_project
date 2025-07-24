
// import React, { Component } from 'react'
// import axios from 'axios'
// import { withRouter } from './withRouter'

// export class EditUser extends Component {
//     constructor(props) {
//         super(props)
//         this.inputRef = React.createRef()
      
//         this.state = {
//           _id: '',
//            id: '',
//            first_name: '',
//            last_name: '',
//            email: '',      
//            age: ''
//         }
//       }  
    
    
//      async componentDidMount() {       
//         try {
//           let search =  this.props.match.params.id,
//           fetchid = search.substring(1, search.length);                      
          
//           const res = await fetch ( `http://localhost:8000/customers/${fetchid}`);
//           const json = await res.json();
//           console.log(json);
//           const { _id, id, first_name, last_name, email, age } = json;                      
//           this.setState({ _id, id, first_name, last_name, email, age });
                
//           this.inputRef.current.focus()        
//         } catch (err) {
//           this.setState({ response: "Customer not found!" })
//         }
        
//       };
    
//     changeHandler = e => {
//         this.setState({ [e.target.name]: e.target.value})
//     }
        
//     submitHandler = async e =>{
//       e.preventDefault();
//       try{
//         const res = await axios.put(`http://localhost:8000/customers/${this.state._id}`, this.state)
//         console.log(res); 
//         this.props.navigate('/customers')
//       } catch (error) {
//           console.log(error);
//       }
      
//     }
    
//       render() {
//         return (
//           <form onSubmit={this.submitHandler}>
//               <div>
//                   <label>ID</label>
//                   <input
//                     type="text"
//                     name="id"
//                     onChange={this.changeHandler}
//                     value={this.state.id}
//                     ref = {this.inputRef}
//                   >
//                   </input>
//               </div>
//               <div>
//                   <label>First Name</label>
//                   <input
//                     type="text"
//                     name="first_name"
//                     onChange={this.changeHandler}
//                     value={this.state.first_name}
//                     ref = {this.inputRef}
//                   >
//                   </input>
//               </div>
//               <div>
//                   <label>Last Name</label>
//                   <input
//                     type="text"
//                     name="last_name"
//                     onChange={this.changeHandler}
//                     value={this.state.last_name}
//                     ref = {this.inputRef}
//                   >
//                   </input>
//               </div>
//               <div>
//                   <label>Email</label>
//                   <input
//                     type="text"
//                     name="gender"
//                     onChange={this.changeHandler}
//                     value={this.state.email}
//                     ref = {this.inputRef}
//                   >
//                   </input>
//               </div>
//               <div>
//               <label>Age</label>
//               <input
//                 type="text"
//                 name="age"
//                 onChange={this.changeHandler}
//                 value={this.state.age}
//                 ref = {this.inputRef}
//               >
//               </input>
//           </div>
//               <button type="submit">Submit</button>
//           </form>
//         )
//       }
// }

// export default withRouter(EditUser)


import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from './withRouter';
import { API_URL } from '../Constants/Url';

export class EditUser extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();

        this.state = {
            _id: '',
            user_id: '', 
            first_name: '',
            last_name: '',
            email_user: '',
            phone_no: '',
            machines_assigned: '',
            machine_type: '',
            user_role: ''

        };
    }

    async componentDidMount() {
        try {
            let search = this.props.match.params.id,
                fetchid = search.substring(1, search.length);

            const res = await fetch(`${API_URL}/customers/${fetchid}`);
            const json = await res.json();
            console.log(json);
            const {_id, user_id, first_name, last_name, email_user, phone_no,machines_assigned,machine_type, user_role } = json;
            this.setState({_id, user_id, first_name, last_name, email_user, phone_no,machines_assigned,machine_type, user_role });

            this.inputRef.current.focus();
        } catch (err) {
            this.setState({ response: "Customer not found!" });
        }
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitHandler = async e => {
        e.preventDefault();
        try {
            const res = await axios.put(`${API_URL}/customers/${this.state._id}`, this.state);
            console.log(res);
            alert("User Edit Succesfull")
            this.props.navigate('/AdminDash');
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <section className="section mt-4"> {/* Added mt-4 for margin-top */}
            <h5 className="card-title text-center">Edit User</h5>
            
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-body">
                                {/* Multi Columns Form */}
                                <form className="row g-3" onSubmit={this.submitHandler}>

                                    <div className="col-md-6">
                                        <label>User ID</label>
                                        <input type="text" name="user_id" onChange={this.changeHandler} value={this.state.user_id} ref={this.inputRef} className="form-control"  style={{ borderRadius: '5px', border: '1px solid #ced4da', padding: '8px' }} />

                                    </div>
                                    <div className="col-md-6">

                                        <label>First Name</label>

                                        <input type="text" name="first_name" onChange={this.changeHandler} value={this.state.first_name} ref={this.inputRef} className="form-control" p style={{ borderRadius: '5px', border: '1px solid #ced4da', padding: '8px' }} />

                                    </div>
                                    <div className="col-md-6">

                                        <label>Last Name</label>

                                        <input type="text" name="last_name" onChange={this.changeHandler} value={this.state.last_name} ref={this.inputRef} className="form-control"  style={{ borderRadius: '5px', border: '1px solid #ced4da', padding: '8px' }} />

                                    </div>
                                    <div className="col-md-12">
                                        <label>Email Address</label>

                                        <input type="text"
                                            name="email_user"
                                            value={this.state.email_user}
                                            onChange={this.changeHandler}
                                            ref={this.inputRef}
                                            
                                            className="form-control"
                                            style={{ borderRadius: '5px', border: '1px solid #ced4da', padding: '8px' }} />
                                    </div>

                                    <div className="col-md-12">
                                        <label>Phone Number</label>

                                        <input
                                            type="number"
                                            name="phone_no"
                                            onChange={this.changeHandler}
                                            value={this.state.phone_no}
                                            ref={this.inputRef}

                                            className="form-control"
                                            style={{ borderRadius: '5px', border: '1px solid #ced4da', padding: '8px' }} />
                                    </div>

                                    <div className="col-md-12">
                                                <label>Assign Machines</label>

                                                <input
                                                    type="number"
                                                    name="machines_assigned"
                                                    onChange={this.changeHandler}
                                                    value={this.state.machines_assigned}
                                                    ref={this.inputRef}

                                                    className="form-control"
                                                    style={{ borderRadius: '5px', border: '1px solid #ced4da', padding: '8px' }} />
                                            </div>
                                            <div className="col-md-12">
                                                <label>Machine Type</label>

                                                <input
                                                    type="text"
                                                    name="machine_type"
                                                    onChange={this.changeHandler}
                                                    value={this.state.machine_type}
                                                    ref={this.inputRef}

                                                    className="form-control"
                                                    style={{ borderRadius: '5px', border: '1px solid #ced4da', padding: '8px' }} />
                                            </div>
                                    <div className="col-md-12">
                                        <label>User Role</label>

                                        <input
                                           type="text"
                                           name="user_role"
                                           onChange={this.changeHandler}
                                           value={this.state.user_role}
                                           ref={this.inputRef}

                                            className="form-control"
                                            style={{ borderRadius: '5px', border: '1px solid #ced4da', padding: '8px' }} />
                                    </div>

                                    <div className="col-12 text-center">
                                        <button type="submit" className="btn btn-primary" style={{ borderRadius: '5px', padding: '8px 16px' }}>
                                            Submit
                                        </button>
                                    </div>
                                </form>
                                {/* End Multi Columns Form */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        );
    }
}

export default withRouter(EditUser);

