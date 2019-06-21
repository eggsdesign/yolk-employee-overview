import React, { Component } from 'react'
import { getEmployees } from './model'
import EmployeeCard from './EmployeeCard'

export default class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			employees: [],
			filter: ""
		}

		this.filterTextChange = (e) => {
			let filterString = e.target.value
			this.setState({filter: filterString})
		}
	}

	componentDidMount () {
		// Fetch list of employees from Sanity
		getEmployees()
			.then(employees => {
				this.setState({employees: employees})
			})
	}

	render(){
		const {employees} = this.state
		
		const filterEmployee = (emp => {
			if (this.state.filter !== ''){
				const matchesFirstName = (match) => emp.firstName.toLowerCase().includes(match.toLowerCase())
				const matchesLastName = (match) => emp.lastName.toLowerCase().includes(match.toLowerCase())

				const matchesSkills = (match) => {
					if (emp.skills){
						const results = emp.skills.filter(skill => skill.title.toLowerCase().includes(match.toLowerCase()))
						return results.length > 0
						
					} else {
						return false
					}
				}

				return (
					matchesSkills(this.state.filter) ||
					matchesFirstName(this.state.filter) || 
					matchesLastName(this.state.filter)
				)
			} 
			
			return true
		})

		return(
			<div className="page">
				<h1>Employees</h1>

				<input type="text" onChange={this.filterTextChange} placeholder="Filter results"/>

				<div className="card-grid">
					{/* IF employees list has been successfully fetched THEN list them out using the EmployeeCard template */}
					{employees && employees.filter(filterEmployee).map(employee => {
						return <EmployeeCard key={employee._id} employee={employee} />
					})}
				</div>

			</div>
		)
	}
}