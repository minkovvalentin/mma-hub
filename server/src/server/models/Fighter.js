const { Model } = require('objection');

class Fighter extends Model {
	// Table name is the only required property.
	static get tableName() {
		return 'fighters'
	}

	// Optional JSON schema. This is not the database schema! Nothing is generated
	// based on this. This is only used for validation. Whenever a model instance
	// is created it is checked against this schema. http://json-schema.org/.
	static get jsonSchema() {
		return {
			type: 'object',
			required: ['first_name', 'second_name', 'wins', 'losses'],

			properties: {
				id: { type: 'integer' },
				first_name: { type: 'string', minLength: 2, maxLength: 255 },
				second_name: { type: 'string', minLength: 2, maxLength: 255 },
				wins: { type: 'integer', minLength: 0, maxLength: 255 },
				losses: { type: 'integer', minLength: 0, maxLength: 255 }
			}
		}
	}
}

module.exports = Fighter
