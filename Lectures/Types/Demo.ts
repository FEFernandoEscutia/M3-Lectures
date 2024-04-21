//*******************************************************************
//**Interfaces
//******************************************************************

interface ITrack {
    title: string;
  }
  
  interface IEditor {
    name: string;
    age: number;
    address: {
      street: string;
      city: string;
      zipCode: number;
    };
  }
  
  interface ISong extends ITrack {
    artist: string;
    duration: number;
    editor: IEditor;
  }
  
  interface IPodcast extends ITrack {
    title: string;
    host: string;
    episodes: number;
  }
  
  interface IAudiobook extends ITrack {
    title: string;
    author: string;
    duration: number;
  }
  
  // we are facing a problem in the next interface, we want to integrate the previous 3 interfaces (Song, Podcast, Audiobook)
  //! (1)**********************************
  //? interface IPlaylist {
  //?   name: string;
  //?   playlist: (ISong | IPodcast | IAudiobook)[];
  //? }
  //! (2)**********************************
  interface IPlaylist {
    name: string;
    playlist: ITrack[];
  }
  //*******************************************************************
  //**Examples
  //******************************************************************
  
  const mySong: ISong = {
    title: "Shape of You",
    artist: "Ed Sheeran",
    duration: 233, // Duration in seconds
    editor: {
      name: "Fernando",
      age: 31,
      address: {
        street: "unknown",
        city: "unknown",
        zipCode: 1234,
      },
    },
  };
  
  const myPodcast: IPodcast = {
    title: "The Joe Rogan Experience",
    host: "Joe Rogan",
    episodes: 1700,
  };
  
  const myAudiobook: IAudiobook = {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    duration: 360, // Duration in minutes
  };
  
  const myPlayList: IPlaylist = {
    name: "Fercho's Playlist",
    playlist: [myPodcast, myAudiobook, mySong],
  };
  
  //Another example
  
  const myArr: (string | number | boolean)[] = ["Hello", 25, true];
  