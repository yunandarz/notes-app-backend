const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler } = require("./handler");

const routes = [
    {
      method: 'POST', // properti untuk menambahkan catatan
      path: '/notes',  
      handler: addNoteHandler, 
    },
    {
        method: 'GET', // properti untuk menampilkan catatan
        path: '/notes',
        handler: getAllNotesHandler  
    },
    {
        method: 'GET', // properti untuk menampilkan catatan secara spesifik
        path: '/notes/{id}',
        handler: getNoteByIdHandler,
    },
    {
        method: 'PUT', // properti untuk mengubah catatan
        path: '/notes/{id}',
        handler: editNoteByIdHandler,
    },
    {
        method: 'DELETE', // properti untuk menghapus catatan
        path: '/notes/{id}',
        handler: deleteNoteByIdHandler,
    },
  ];
   
  module.exports = routes;