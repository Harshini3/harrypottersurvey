import React, { Component } from 'react';
var firebase = require('firebase');

var config = {
  apiKey: "AIzaSyCHNmel1aQI93CQ_5ut9Kau40Uby7G1SH0",
  authDomain: "c-survey-4985d.firebaseapp.com",
  databaseURL: "https://c-survey-4985d.firebaseio.com",
  projectId: "c-survey-4985d",
  storageBucket: "c-survey-4985d.appspot.com",
  messagingSenderId: "523304708732"
};
firebase.initializeApp(config);


class Login extends Component {
    constructor(props){
      super(props);
    }

    handleInfoSubmit = (e) => {
        const Username = this.refs.name.value;
        const email = this.refs.email.value;

        if(Username !== '' && email !== '') {
            this.props.changeUsername(Username, email);
        } else {
            alert('fill in the form');
        }
        e.preventDefault();
    }

    

  render(){
    return(
      <div>
          <div className="login-tab">
              <h1 >Harry Potter Book Survey</h1>
              <div className="tab-content">
                  <form onSubmit={this.handleInfoSubmit}>
                      <label>Fullname </label>
                      <input className="nameInput" type="text" placeholder="FullName" autoFocus="true" ref="name"/><br />
                      <label>Email</label>
                      <input className="nameInput" type="email" placeholder="Email" ref="email"/><br />
                      <input className="submitButton" type="submit" value="Continue"/>
                  </form>
              </div>
            
          </div>

      </div>
    );
  }
}



export default Login;
