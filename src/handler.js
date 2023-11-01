const { nanoid } = require("nanoid"); // import library nanoid
const notes = require('./notes') //import array notes dari file notes.js

const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload; //properti request.payload digunakan untuk menyimpan data JSON dari app notes (title, tags dan body)

    const id = nanoid(16); //method nanoid disini dipakai untuk memberi properti id pada object app notes
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        title, tags, body, id, createdAt, updatedAt,
    };

    notes.push(newNote); // kode untuk masukan nilai-nilai properti dari object catatan ke array notes

    const isSuccess = notes.filter((note) => note.id === id).length > 0; // kode untuk tentukan newNote sudah masuk ke array notes.

    if (isSuccess) {
        const response = h.response({
          status: 'success',
          message: 'Catatan berhasil ditambahkan',
          data: {
            noteId: id,
          },
        });
        response.code(201);
        return response;
      }
      const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
      });
      response.code(500);
      return response;

};

const getAllNotesHandler = () => ({  // fungsi handler untuk menampilkan catatan di notes app
    status: 'success',
    data: {
      notes,
    },
  });

  const getNoteByIdHandler = (request, h) => {  // fungsi handler untuk menampilkan catatan yang spesifik
    const { id } = request.params;

    const note = notes.filter((n) => n.id === id)[0];

    if (note !== undefined) {
        return {
          status: 'success',
          data: {
            note,
          },
        };
      }
      const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
      });
      response.code(404);
      return response;
  };

  const editNoteByIdHandler = (request, h) => {
     const { id } = request.params; // catatan yang diubah berdasarkan id

     const { title, tags, body } = request.payload; // mengambil data notes terbaru yang dikirim client melalui body request
     const updatedAt = new Date().toISOString(); // perbarui nilai dari properti di updateAt
 
     const index = notes.findIndex((note) => note.id === id);

     if (index !== -1) {
        notes[index] = {
          ...notes[index],
          title,
          tags,
          body,
          updatedAt,
        };
        const response = h.response({
          status: 'success',
          message: 'Catatan berhasil diperbarui',
        });
        response.code(200);
        return response;
      }
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui catatan. Id tidak ditemukan',
      });
      response.code(404);
      return response;
    };

    const deleteNoteByIdHandler = (request, h) => {  // fungsi handler untuk menghapus catatan
      const { id } = request.params;

      const index = notes.findIndex((note) => note.id === id); // dapatkan index dari object catatan sesuai dengan id yang di dapat
    
      if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
          status: 'success',
          message: 'Catatan berhasil dihapus',
        });
        response.code(200);
        return response;
      }

      const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus. Id tidak ditemukan',
      });
      response.code(404);
      return response;
    };

module.exports = { // export function handler menggunakan object literal agar bisa export lebih dari satu nilai
    addNoteHandler, 
    getAllNotesHandler, 
    getNoteByIdHandler,
    editNoteByIdHandler, 
    deleteNoteByIdHandler,
}; 