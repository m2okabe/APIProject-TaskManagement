const knex = require('../knex');
const TASK_TABLE = 'task';

module.exports = {
  TASK_TABLE,

  /**
   * @param {number} id - The task's id.
   * @return {Promise<Object>} A promise that resolves to the task that matches the id.
   */
  getById(id) {
    // key: return object key
    // value: table column name
    return knex
      .select({
        id: 'id',
        taskDescription: 'task_description',
        taskStatus: 'task_status',
        dateOfTaskGenerated: 'date_of_task_generated',
        dateOfDeadline: 'date_of_deadline',
        businessOrPrivateLife: 'business_or_private_life',
      })
      .from(TASK_TABLE)
      .where({
        id: id,
      })
      .first();
  },

  /**
   * @param {Object} task - The new task data to add.
   * @return {Promise<number>} A promise that resolves to the id of created task.
   */
  insertTask(task) {
    return knex(TASK_TABLE).insert(task);
  },

  /**
   * @param {number} id - The unique id of the existing task.
   * @param {Object} task - The task data to change.
   * @return {Promise<number>} A promise that resolves to the id of the updated task.
   */
  updateTask(id, task) {
    return knex(TASK_TABLE).where('id', id).update(task);
  },
};
