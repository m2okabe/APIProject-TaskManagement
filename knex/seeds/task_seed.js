/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('task').del();
  await knex('task').insert([
    {
      id: 1,
      task_description: 'descriptionTest1',
      task_status: 'completed',
      date_of_task_generated: '2022-10-01',
      business_or_private_life: 'business',
    },
    {
      id: 2,
      task_description: 'descriptionTest2',
      task_status: 'working',
      date_of_task_generated: '2022-10-02',
      business_or_private_life: 'business',
    },
    {
      id: 3,
      task_description: 'descriptionTest3',
      task_status: 'waiting',
      date_of_task_generated: '2022-10-03',
      business_or_private_life: 'private',
    },
  ]);
};
