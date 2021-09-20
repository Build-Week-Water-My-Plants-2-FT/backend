exports.up = async (knex) => {
    await knex.schema
      .createTable('users', (users) => {
        users.increments('user_id')
        users.string('username', 200).notNullable()
        users.string('password', 200).notNullable()
        users.integer('phoneNumber', 11).notNullable()
        users.timestamps(false, true)
      })
      .createTable('plants', (plants) => {
          plants.increments('plant_id')
          plants.string('nickname', 280).notNullable()
          plants.string('species', 280).notNullable()
          plants.string('h2oFrequency', 200).notNullable()
          plants.bytea('image', 128)
      })
  }
  
  exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('users')
    await knex.schema.dropTableIfExists('plants')
  }