const db = require('../../data/db-config')

function find() {
  return db('plants')
    .select(
      'id',
      'species',
      'h2o_frequency',
      'img_url'
    )
    .orderBy('id')
}

function findByID(id) {
  return db('plants')
    .select(
      'plants.id AS plant_id',
      'plants.nickname',
      'plants.species',
      'plants.h2o_frequency',
      'plants.img_url',
      'users.username AS user'
    )
    .where({'plants.id': id})
    .join('users', 'users.id', 'plants.user_id')
    .first()
}

function add(plant) {
  return db('plants')
    .insert(plant, 'id')
    .then(id => {
      return findByID(id[0])
    })
}

function update(id, changes) {
  return db('plants')
    .where({'id': id})
    .update(changes)
    .then(() =>{
      return findByID(id)
    })
}

function remove(id) {
  return db('plants')
    .where({'id': id})
    .delete()
}

module.exports = {
  find,
  findByID,
  add,
  update,
  remove
}
