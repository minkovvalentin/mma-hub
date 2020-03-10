
exports.up = function (knex) {
	return knex.schema.createTable('fighters', (table) => {
		table.increments();
		table.string('first_name').notNullable().unique();
		table.string('second_name').notNullable();
		table.integer('wins').notNullable();
		table.integer('losses').notNullable();
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('fighters');
};
