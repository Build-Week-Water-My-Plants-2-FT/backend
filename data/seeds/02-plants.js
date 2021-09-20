
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('plants').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { nickname: 'Test Plant1', species: 'test species',  h2oFrequency: '3ml Every Day'},
        { nickname: 'Test Plant2', species: 'test species2',  h2oFrequency: '3ml Every Other Day'},
        { nickname: 'Test Plant3', species: 'test species3',  h2oFrequency: '3ml Every Hour'},
        { nickname: 'Test Plant4', species: 'test species4',  h2oFrequency: ' 3ml Every Minute'},
      ]);
    });
};