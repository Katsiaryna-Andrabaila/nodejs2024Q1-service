import { Injectable } from '@nestjs/common';
import { Album, Artist, DB, Favorites, Track } from './entities/db.entity';
import { randomUUID } from 'crypto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';

@Injectable()
export class DbService {
  db: DB = {
    users: [],
    artists: [],
    tracks: [],
    albums: [],
    favs: { artists: [], albums: [], tracks: [] },
  };

  getUsers() {
    const users = this.db.users;
    return users.map((el) => ({
      id: el.id,
      login: el.login,
      version: el.version,
      createdAt: el.createdAt,
      updatedAt: el.updatedAt,
    }));
  }

  getUserById(id: string) {
    const user = this.db.users.find((el) => el.id === id);

    return user
      ? {
          id: user.id,
          login: user.login,
          version: user.version,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        }
      : null;
  }

  addUser(entity: CreateUserDto) {
    const newUser = {
      id: randomUUID(),
      password: entity.password,
      login: entity.login,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.db.users.push(newUser);

    const user = this.db.users[this.db.users.length - 1];

    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  updateUser(id: string, body: UpdateUserDto) {
    const { oldPassword, newPassword } = body;
    const user = this.db.users.find((el) => el.id === id);

    if (user && oldPassword === user.password) {
      user.password = newPassword;

      return {
        id: user.id,
        login: user.login,
        version: ++user.version,
        createdAt: user.createdAt,
        updatedAt: Date.now(),
      };
    } else if (user && oldPassword !== user.password) {
      return 'wrong';
    } else {
      return null;
    }
  }

  deleteUser(id: string) {
    const user = this.db.users.find((el) => el.id === id);
    if (user) {
      const userIndex = this.db.users.indexOf(user);
      this.db.users.splice(userIndex, 1);
      return 'ok';
    } else {
      return null;
    }
  }

  getArtists() {
    return this.db.artists;
  }

  getArtistById(id: string) {
    return this.db.artists.find((el) => el.id === id);
  }

  addArtist(entity: Omit<Artist, 'id'>) {
    const newArtist = {
      id: randomUUID(),
      ...entity,
    };
    this.db.artists.push(newArtist);

    return this.db.artists[this.db.artists.length - 1];
  }

  updateArtist(id: string, body: Omit<Artist, 'id'>) {
    let artist = this.db.artists.find((el) => el.id === id);

    if (artist) {
      artist = { ...body, id };

      return artist;
    } else {
      return null;
    }
  }

  deleteArtist(id: string) {
    const artist = this.db.artists.find((el) => el.id === id);

    if (artist) {
      const artistIndex = this.db.artists.indexOf(
        this.db.artists.find((el) => el.id === id),
      );

      const favsIndex = this.db.favs.artists.indexOf(id);
      if (this.db.favs.artists.includes(id)) {
        this.db.favs.artists.splice(favsIndex, 1);
      }

      this.db.tracks.forEach((el) => {
        if (el.artistId === id) {
          el.artistId = null;
        }
      });

      this.db.albums.forEach((el) => {
        if (el.artistId === id) {
          el.artistId = null;
        }
      });

      this.db.artists.splice(artistIndex, 1);

      return 'ok';
    } else {
      return null;
    }
  }

  getTracks() {
    return this.db.tracks;
  }

  getTrackById(id: string) {
    return this.db.tracks.find((el) => el.id === id);
  }

  addTrack(entity: Omit<Track, 'id'>) {
    const newTrack = {
      id: randomUUID(),
      ...entity,
    };
    this.db.tracks.push(newTrack);

    return this.db.tracks[this.db.tracks.length - 1];
  }

  updateTrack(id: string, body: Omit<Track, 'id'>) {
    let track = this.db.tracks.find((el) => el.id === id);

    if (track) {
      track = { ...body, id };

      return track;
    } else {
      return null;
    }
  }

  deleteTrack(id: string) {
    const track = this.db.tracks.find((el) => el.id === id);

    if (track) {
      const trackIndex = this.db.tracks.indexOf(
        this.db.tracks.find((el) => el.id === id),
      );
      this.db.tracks.splice(trackIndex, 1);

      if (this.db.favs.tracks.includes(id)) {
        this.db.favs.tracks.splice(this.db.favs.tracks.indexOf(id), 1);
      }
      return 'ok';
    } else {
      return null;
    }
  }

  getAlbums() {
    return this.db.albums;
  }

  getAlbumById(id: string) {
    return this.db.albums.find((el) => el.id === id);
  }

  addAlbum(entity: Omit<Album, 'id'>) {
    const newAlbum = {
      id: randomUUID(),
      ...entity,
    };
    this.db.albums.push(newAlbum);

    return this.db.albums[this.db.albums.length - 1];
  }

  updateAlbum(id: string, body: Omit<Album, 'id'>) {
    let album = this.db.albums.find((el) => el.id === id);

    if (album) {
      album = { ...body, id };

      return album;
    } else {
      return null;
    }
  }

  deleteAlbum(id: string) {
    const album = this.db.albums.find((el) => el.id === id);

    if (album) {
      const albumIndex = this.db.albums.indexOf(
        this.db.albums.find((el) => el.id === id),
      );
      this.db.albums.splice(albumIndex, 1);

      const tracks = this.db.tracks.filter((el) => el.albumId === id);
      tracks.forEach((el) => {
        el.albumId = null;
      });

      if (this.db.favs.albums.includes(id)) {
        this.db.favs.albums.splice(this.db.favs.albums.indexOf(id), 1);
      }

      return 'ok';
    } else {
      return null;
    }
  }

  getFavs() {
    const artists = this.db.artists.filter((el) =>
      this.db.favs.artists.includes(el.id),
    );

    const albums = this.db.albums.filter((el) =>
      this.db.favs.albums.includes(el.id),
    );

    const tracks = this.db.tracks.filter((el) =>
      this.db.favs.tracks.includes(el.id),
    );

    return { artists, albums, tracks };
  }

  addFav(key: keyof Favorites, entity: string) {
    const targetElement = this.db[key].some(
      (el: Track | Artist | Album) => el.id === entity,
    );

    if (targetElement) {
      this.db.favs[key].push(entity);
      return 'Entity was successfully added';
    } else {
      return null;
    }
  }

  deleteFav(key: keyof Favorites, id: string) {
    const targetElement = this.db[key].some(
      (el: Track | Artist | Album) => el.id === id,
    );

    if (targetElement) {
      const keyArray = this.db.favs[key];
      keyArray.splice(keyArray.indexOf(id), 1);
      return 'Entity was not found';
    } else {
      return null;
    }
  }
}
