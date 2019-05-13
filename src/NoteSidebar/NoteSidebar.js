import React, { Component } from 'react';


class NoteSidebar extends Component {
	render() {

		if (this.props.activeFolder) {
			return (
				<div className = "sidebar"> 
					<button onClick={() => window.history.back()}>Go Back</button>
					<p>{this.props.activeFolder.name}</p>
				</div>
				) 
			
		}
		return (
		<div className = "sidebar"> 
			<button onClick={() => window.history.back()}>Go Back</button>
		</div>
		) 
	} 

}

export default NoteSidebar
