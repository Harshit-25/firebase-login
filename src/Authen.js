import React, { Component } from 'react';
var firebase=require('firebase');
var config = {
    apiKey: "AIzaSyD661ujo3r2AAuvPiGG1NgY1kYG5c2FUy8",
    authDomain: "fir-a1804.firebaseapp.com",
    databaseURL: "https://fir-a1804.firebaseio.com",
    projectId: "fir-a1804",
    storageBucket: "fir-a1804.appspot.com",
    messagingSenderId: "359128666688"
  };
  firebase.initializeApp(config);

class Authen extends Component {

   login(){
     const email=this.refs.email.value;
     const password=this.refs.password.value;
     const auth=firebase.auth();
     const promise=auth.signInWithEmailAndPassword(email,password);

     promise.then(user=>{
       var lout=document.getElementById('logout');
       lout.classList.remove('hide');
     });

     promise.catch(e=>{
       var err=e.message;
      console.log(err);
      this.setState({err});
     });

   }

   signup(){
     const email=this.refs.email.value;
     const password=this.refs.password.value;
     const auth=firebase.auth();
     const promise=auth.createUserWithEmailAndPassword(email,password);
     promise
     .then(user=>{
       var err="Welcome"+user.email;
       firebase.database().ref('users/'+user.uid).set({
         email:user.email
       });
       console.log(user);
       this.setState({err});
     });
     promise.catch(e=>{
       var err=e.message;
      console.log(err);
      this.setState({err});
     });
   }

   logout(){
    firebase.auth().signOut();
    var lout=document.getElementById('logout');
    lout.classList.add('hide');

   }


  constructor(props){
    super(props);

    this.state={};
    this.login=this.login.bind(this);
    this.signup=this.signup.bind(this);
    this.logout=this.logout.bind(this);
  }
  render() {
    return (
      <div>
      <input id="email" type="email" ref="email" placeholder="enter your email"/><br/>
      <input id="pass" type="password" ref="password" placeholder="enter your password"/><br/>
       <p>{this.state.err}</p>
       <button onClick={this.login}>Log In</button>
       <button onClick={this.signup}>Sign Up</button>
       <button  onClick={this.logout} id="logout" className="hide">Log Out</button>


      </div>
    );
  }
}
export default Authen;
