/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('task', function (table) {
    table.increments('id').primary();
    table.string('task_description', 64);
    table.string('task_status', 32).notNullable();
    table.date('date_of_task_generated').notNullable();
    table.date('date_of_deadline');
    table.string('business_or_private_life', 32);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTable('task');
};
