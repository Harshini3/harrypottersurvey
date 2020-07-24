import React, { Component } from 'react';
import Login from './Login';


var firebase = require('firebase');
var uuid = require('uuid');

  // var config = {
  //   apiKey: "AIzaSyCHNmel1aQI93CQ_5ut9Kau40Uby7G1SH0",
  //   authDomain: "c-survey-4985d.firebaseapp.com",
  //   databaseURL: "https://c-survey-4985d.firebaseio.com",
  //   projectId: "c-survey-4985d",
  //   storageBucket: "c-survey-4985d.appspot.com",
  //   messagingSenderId: "523304708732"
  // };

class Survey extends Component {
    constructor(props){
      super(props);

      this.state = {
          user : '',
          Username: '',
          email: '',
          uid: uuid.v1(),
          answers: {
              answer1: '',
              answer2: '',
              answer3: '',
              answer4: '',
              answer5: ''
          },
          isLoggedIn: false,
          isSubmitted: false
      };


      this.answerSelected = this.answerSelected.bind(this);
      this.handleSurveySubmit = this.handleSurveySubmit.bind(this);
    }

    handleSurveySubmit(e) {
        firebase.database().ref('Csurvey/'+ this.state.uid).set({
            Username: this.state.Username,
            email: this.state.email,
            Answers: this.state.answers
        });
        this.setState({isSubmitted: true});
        e.preventDefault();
    }

    answerSelected(e) {
        if(e.target.checked) {
            e.target.parentNode.classList.add('label-checked');
        }
        var radios = Array.from(document.querySelectorAll('input[type="radio"]'));
        radios.forEach(radio => {
            if(radio.checked) {
                radio.parentNode.classList.add('label-checked');
            } else {
                radio.parentNode.classList.remove('label-checked');
            }
        });
        var answers = this.state.answers;
        var value = e.target.value;
        var name = e.target.name;
        answers[name] = value;
        this.setState({answers});
        console.log(this.state);
    }

    changeUsername = (Username, email) => {
        this.setState({Username, email, isLoggedIn: true});
        console.log(Username, email);
    }

    logUser = (user, Username, email) => {
        this.setState({user, Username, email, isLoggedIn: true });
        console.log(user, Username, email);
    }

  render(){
      let currentDisplay = '';


      if(this.state.isLoggedIn === false) {
           currentDisplay = <Login logUser={this.logUser} changeUsername={this.changeUsername}/>
      } else if(this.state.isLoggedIn  === true && this.state.isSubmitted === false) {
          currentDisplay = <form onSubmit={this.handleSurveySubmit}>
             <div className="card">
                 <h3 className="survey-title">Survey on Harry Potter Book Series</h3>
                 <div className="survey-question">
                     <h3>Are you Fan of JK Rowling</h3>
                     <label className="check-container">
                         <input type="radio" name="answer1" value="Yes" onClick={this.answerSelected} /> Yes
                     </label>
                     <label className="check-container">
                         <input type="radio" name="answer1" value="No" onClick={this.answerSelected} /> No
                     </label>
                 </div>
                 <div className="survey-question">
                     <h3>Whats your Age range</h3>
                     <label className="check-container">
                         <input type="radio" name="answer2" value="< 18" onClick={this.answerSelected} /> <span>below 18</span>
                    </label>
                    <label className="check-container">
                         <input type="radio" name="answer2" value="> 18 to 25" onClick={this.answerSelected} /> 18 to 25
                    </label>
                    <label className="check-container">
                         <input type="radio" name="answer2" value="25 above" onClick={this.answerSelected} /> 25 above
                    </label>
                 </div>
                 <div className="survey-question">
                     <h3>Your Favorite Character</h3>
                     <label className="check-container">
                         <input type="radio" name="answer3" value="Harry Potter " onClick={this.answerSelected} /> Harry Potter 
                    </label>
                    <label className="check-container">
                         <input type="radio" name="answer3" value="Hermione Granger" onClick={this.answerSelected} /> Hermione Granger
                    </label>
                     <label className="check-container">
                         <input type="radio" name="answer3" value="Lord Voldemort" onClick={this.answerSelected} /> Lord Voldemort
                    </label>
                     <label className="check-container">
                         <input type="radio" name="answer3" value="Ron Weasley" onClick={this.answerSelected} /> Ron Weasley
                    </label>
                    <label className="check-container">
                         <input type="radio" name="answer3" value="Minerva McGonagall" onClick={this.answerSelected} />Minerva McGonagall
                    </label>
                 </div>
                 <div className="survey-question">
                     <h3>Did you like the ending?</h3>
                     <label className="check-container">
                         <input type="radio" name="answer4" value="lovedit" onClick={this.answerSelected} /> Loved It
                    </label>
                    <label className="check-container">
                         <input type="radio" name="answer4" value="no" onClick={this.answerSelected} /> Not really
                    </label>
                    <label className="check-container">
                         <input type="radio" name="answer4" value="d" onClick={this.answerSelected} /> No comments
                    </label>
                
                 </div>
                 <div className="survey-question">
                     <h3>Do you want another book?</h3>
                     <label className="check-container">
                         <input type="radio" name="answer5" value="Yes" onClick={this.answerSelected} /> Yes
                    </label>
                    <label className="check-container">
                         <input type="radio" name="answer5" value="No" onClick={this.answerSelected} /> No
                    </label>
                  
                 </div>
                 <input className="submitButton" type="submit"  value="submit"/>
             </div>
        </form>

     } else if (this.state.isSubmitted === true) {
        currentDisplay = <div>
            <h1 style={{color:'white',textAlign:'center',marginTop:'170px'}}>Thanks for taking The Harry Potter Book Survey, {this.state.Username}
            <br/>
            This will really help the Creator JK Rowling</h1>
        </div>
     }
/* eslint no-restricted-globals:0 */
    return(
      <div>
         {currentDisplay}
      </div>
    );
  }
}


export default Survey;
