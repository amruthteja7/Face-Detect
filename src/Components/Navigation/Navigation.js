import React from 'react';
import './Navigation.css';
import Icon from './Icon.png';

const navigation = (props) => {

	return(
		<nav className = 'Navigation'>
			<div className = 'Image'>
				<img className = 'Icon' src = {Icon} alt = 'Face_Icon'/>
				<figcaption className = 'Caption'>Face Detect</figcaption>
			</div>
			<p onClick = {() => props.signout('signin')} className = 'Signout'>Sign Out</p>
		</nav>
		)
}

export default navigation;