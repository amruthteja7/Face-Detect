import React from 'react';
import './SearchBar.css';

const searchBar = (props) => {

	return(	
		<div>
			<h2>Hi!</h2>
        	<p><strong>This is a magic brain which detects faces in a picture, Give it a try!</strong></p>
			<div className = 'SearchBar'>
				<input 
					onChange = {props.search}
					className = 'Input' 
					type = 'text' 
					placeholder = 'Image link goes here' />
				<button onClick = {props.clicked} className = 'Button'>Detect</button>
			</div>
		</div>
		)
}

export default searchBar;