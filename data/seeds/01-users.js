const { hash } = require("../../api/secure");


exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'Test User', phoneNumber: 11223344556,  password: hash('testpass') },
        { username: 'Test User2', phoneNumber: 22334455667, password: hash('testpass2') },
        { username: 'Test User3', phoneNumber: 33445566778, password: hash('testpass3') },
        { username: 'Test User4', phoneNumber: 44556677889, password: hash('testpass4') }
      ]);
    });
};