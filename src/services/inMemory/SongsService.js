const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class SongsService {
  constructor() {
    this._songs = [];
  }

  addSong(
    {
      title, year, performer, genre, duration,
    },
  ) {
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const yearConvert = parseInt(year, 10);
    const durationConvert = parseInt(duration, 10);

    const newSong = {
      id,
      title,
      yearConvert,
      performer,
      genre,
      durationConvert,
      insertedAt,
      updatedAt,
    };

    this._songs.push(newSong);

    const isSuccess = this._songs.filter((song) => song.id === id).length > 0;

    if (!isSuccess) {
      throw new InvariantError('Lagu gagal ditambahkan');
    }

    return id;
  }

  getSongs() {
    const song = this._songs.map((s) => ({
      id: s.id,
      title: s.title,
      performer: s.performer,
    }));
    return song;
  }

  getSongById(id) {
    const song = this._songs.filter((music) => music.id === id)[0];
    if (!song) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }

    return song;
  }

  editSongById(id, {
    title, year, performer, genre, duration,
  }) {
    const index = this._songs.findIndex((song) => song.id === id);

    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui Lagu. Id tidak ditemukan');
    }

    const updatedAt = new Date().toISOString();
    const yearConvert = parseInt(year, 10);
    const durationConvert = parseInt(duration, 10);

    this._songs[index] = {
      ...this._songs[index],
      title,
      yearConvert,
      performer,
      genre,
      durationConvert,
      updatedAt,
    };
  }

  deleteSongById(id) {
    const index = this._songs.findIndex((song) => song.id === id);

    if (index === -1) {
      throw new NotFoundError('Lagu gagal dihapus. Id tidak ditemukan');
    }

    this._songs.splice(index, 1);
  }
}

module.exports = SongsService;
