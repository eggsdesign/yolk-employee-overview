const sanityClient = require('@sanity/client')
const client = sanityClient({
	projectId: 'r1vilzq1',
	dataset: 'production'
})

export const getEmployees = (id, parameters) => {
	return new Promise((resolve, reject) => {
		client
			.fetch( 
				'*[_type == $type]', 
				{type: 'person'} 
			)
			.then(result => resolve(result))
			.catch(error => reject(error))
	})
}