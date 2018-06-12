import React, { Component } from 'react';

class signin extends Component {

	state = {
		email:'',
		password: ''
	}

	emailHandler = (event) => {
		this.setState({email: event.target.value});
	}


	passwordHandler = (event) => {
		this.setState({password: event.target.value});
	}

	submitHandler = () => {
		fetch('https://f-dserver.herokuapp.com/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password
			})
		})
		.then(response => response.json())
		.then(data => {
			if(data.email === this.state.email){
				this.props.signin('home');
			}
		})
		.catch(err => console.log(err));
	}

	render(){

		return(

				<article className="mw6 center bg-transparent br3 pa3 pa4-ns mv3 ba shadow-5 b--black-10">
					<main className="pa4 black-80">
					  <div className="measure ">
					    <fieldset id="sign_up" className ="ba b--transparent ph0 mh0">
					      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
					        <input 
					        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        	type="email" 
					        	onChange = {this.emailHandler} 
					        />
					      </div>
					      <div className="mv3">
					        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
					        <input 
					        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        	type="password"  
					        	onChange = {this.passwordHandler}
					        />
					      </div>

					    </fieldset>
					    <div className="">
					      <input 
					      	onClick = {this.submitHandler}
					      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
					      	type="submit" 
					      	value="Sign in"/>

					    </div>
					    <div className="lh-copy mt3">
					      <p onClick = {() => this.props.signin('register')} className="f4 fw6 link dim black db pointer ">Register</p>
					    </div>
					  </div>
					</main>
				</article>
			);
	}

}

export default signin;