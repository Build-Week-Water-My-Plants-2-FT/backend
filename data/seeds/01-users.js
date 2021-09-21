exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {
          username: 'testuser', 
          password: 'testpass',
          phone_number: '1234567890'
        },
      ]);
    });
};