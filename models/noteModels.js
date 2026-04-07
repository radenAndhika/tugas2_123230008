const Note = require("../schema/Note");

const noteAttributes = ["id", "judul", "isi", "tanggal_dibuat"];

const findAll = async () => {
  return await Note.findAll({
    attributes: noteAttributes,
    order: [["tanggal_dibuat", "DESC"]],
  });
};

const create = async (noteData) => {
  return await Note.create(noteData);
};

const findById = async (id) => {
  return await Note.findByPk(id, {
    attributes: noteAttributes,
  });
};

const updateById = async (id, noteData) => {
  await Note.update(noteData, {
    where: {
      id: id,
    },
  });

  return await findById(id);
};

const deleteById = async (id) => {
  return await Note.destroy({
    where: {
      id: id,
    },
  });
};

module.exports = {
  findAll,
  create,
  findById,
  updateById,
  deleteById,
};
