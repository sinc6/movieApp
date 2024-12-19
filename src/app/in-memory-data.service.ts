import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const movies = [
      {
        id: 1,
        name: 'Movie 1',
        description: 'Description of Movie 1',
        imageUrl: 'src/assets/1.jpeg',
      },
      {
        id: 2,
        name: 'Movie 2',
        description: 'Description of Movie 2',
        imageUrl: '2.jpg',
      },
      {
        id: 3,
        name: 'Movie 3',
        description: 'Description of Movie 3',
        imageUrl: '3.jpg',
      },
      {
        id: 4,
        name: 'Movie 4',
        description: 'Description of Movie 4',
        imageUrl: '4.jpg',
      },
      {
        id: 5,
        name: 'Movie 5',
        description: 'Description of Movie 5',
        imageUrl: '5.jpg',
      },
      {
        id: 6,
        name: 'Movie 6',
        description: 'Description of Movie 6',
        imageUrl: '6.jpg',
      },
      {
        id: 7,
        name: 'Movie 7',
        description: 'Description of Movie 7',
        imageUrl: '7.jpg',
      },
    ];
    return { movies }; // 'movies' endpoint olarak kullanılacak
  }
  constructor() {}
}
