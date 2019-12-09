
exports.up = function(knex) {
  return knex.schema.createTable('senders', tbl => {
        tbl.increments();

        tbl.string('senderName', 320)
            .notNullable();
        tbl.string('senderEmail', 320)
            .unique()
            .notNullable();

        tbl.timestamps(true, true)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('senders')
};
