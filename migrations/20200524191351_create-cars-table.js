
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments();
    tbl.text('Make', 128)
        .notNullable();
    tbl.text('Model', 128)
        .notNullable();
    tbl.integer('Mileage')
        .notNullable();
    tbl.string('VIN', 17)
        .unique()
        .notNullable();
    tbl.text('TransmissionType',128);
    tbl.text('Title', 24);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
