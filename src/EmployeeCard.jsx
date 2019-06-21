import React, { Component } from 'react'

export default class EmployeeCard extends Component {

	constructor(props) {
		super(props)
	}

	render(){
		const {avatarUrl, firstName, lastName, roles, skills} = this.props.employee

		return(
			<div className="employee-card">

				{/* <img src={avatarUrl} alt="Avatar"/> */}
				<h2>{firstName} {lastName}</h2>
				
				<h3>Skills</h3>
				<ul className="tags">
					{skills && skills.map(skill => {
						return <li className="tag">{skill.title}</li>
					}) || <p>No skills added yet</p>}
				</ul>

			</div>
		)
	}
}