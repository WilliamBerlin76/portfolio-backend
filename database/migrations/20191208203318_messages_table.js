
exports.up = function(knex) {
  return knex.schema.createTable('messages', tbl => {
        tbl.increments();

        tbl.string('subject')
        tbl.string('message')
            .notNullable();
        
        tbl.integer('sender_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('senders')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')

        tbl.timestamps(true, true)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('messages')
};
