exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate() // for Postgres: return knex.raw(TRUNCATE TABLE users CASCADE)
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'testuser', 
          password: 'testpass',
          phone_number: '1234567890'
        },
      ]);
    });
};