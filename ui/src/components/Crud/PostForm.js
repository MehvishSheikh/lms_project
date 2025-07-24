//useless not to be used


// import React, { Component } from 'react'
// import axios from 'axios'
// import { withRouter } from './withRouter'

// export class PostForm extends Component {
//   constructor(props) {
//     super(props)
//     this.inputRef = React.createRef()

//     this.state = {
//        id: '',
//        first_name: '',
//        last_name: '',
//        email: ''  ,    
//        age: ''
//     }
//   }

// componentDidMount() { 
//   this.inputRef.current.focus()  
//  }

// changeHandler = e => {
//     this.setState({ [e.target.name]: e.target.value})
// }

// submitHandler = async e =>{
//   e.preventDefault();
//   try{
//     const res = await axios.post('http://localhost:8000/customers', this.state)
//     console.log(res); 
//   } catch (error) {
//       console.log(error);
//   }
//   this.props.navigate('/customers') 
// }

//   render() {
//     return (
//       <form onSubmit={this.submitHandler}>
//           <div>
//               <label>ID</label>
//               <input
//                 type="text"
//                 name="id"
//                 onChange={this.changeHandler}
//                 value={this.state.id}
//                 ref = {this.inputRef}
//               >
//               </input>
//           </div>
//           <div>
//               <label>First Name</label>
//               <input
//                 type="text"
//                 name="first_name"
//                 onChange={this.changeHandler}
//                 value={this.state.first_name}
//                 ref = {this.inputRef}
//               >
//               </input>
//           </div>
//           <div>
//               <label>Last Name</label>
//               <input
//                 type="text"
//                 name="last_name"
//                 onChange={this.changeHandler}
//                 value={this.state.last_name}
//                 ref = {this.inputRef}
//               >
//               </input>
//           </div>
//           <div>
//               <label>Email</label>
//               <input
//                 type="text"
//                 name="email"
//                 onChange={this.changeHandler}
//                 value={this.state.email}
//                 ref = {this.inputRef}
//               >
//               </input>
//           </div>
//           <div>
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
//           <button type="submit">Submit</button>
//       </form>
//     )
//   }
// }

// export default withRouter(PostForm);


import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from './withRouter';

export class PostForm extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();

    this.state = {
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

  componentDidMount() {
    this.inputRef.current.focus();
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitHandler = async e => {
      e.preventDefault();
      try {
          const res = await axios.post('https://api-mongo-eta.vercel.app/customers', this.state);
          console.log(res);
          this.props.navigate('/customers');
      } catch (error) {
          console.log(error);
      }
  }

  // submitHandler = async e => {
  //   e.preventDefault();
  //   try {
  //     const { user_id, first_name, last_name, email_user, phone_no, user_role } = this.state;
  //     const payload = { user_id, first_name, last_name, email_user, phone_no, user_role };

  //     const res = await axios.post('http://localhost:8000/customers', payload);
  //     console.log(res);
  //     this.props.navigate('/customers');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <div>
          <label>User ID</label>
          <input
            type="text"
            name="user_id"
            onChange={this.changeHandler}
            value={this.state.user_id}
            ref={this.inputRef}
          />
        </div>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            onChange={this.changeHandler}
            value={this.state.first_name}
            ref={this.inputRef}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            onChange={this.changeHandler}
            value={this.state.last_name}
            ref={this.inputRef}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            name="email_user"
            value={this.state.email_user}
            onChange={this.changeHandler}
            placeholder="Email Address"
            ref={this.inputRef}
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="number"
            name="phone_no"
            onChange={this.changeHandler}
            value={this.state.phone_no}
            ref={this.inputRef}
          />
        </div>
        <div>
          <label>Assign Machines</label>
          <input
            type="number"
            name="machines_assigned"
            onChange={this.changeHandler}
            value={this.state.machines_assigned}
            ref={this.inputRef}
          />
        </div>

        <div>
          <label>Machine Type</label>
          <input
            type="text"
            name="machine_type"
            onChange={this.changeHandler}
            value={this.state.machine_type}
            ref={this.inputRef}
          />
        </div>

        
        <div>
          <label>User Role</label>
          <input
            type="text"
            name="user_role"
            onChange={this.changeHandler}
            value={this.state.user_role}
            ref={this.inputRef}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default withRouter(PostForm);

