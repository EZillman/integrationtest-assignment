import { IMovie } from '../../models/Movie';

export let testArray: IMovie[] = [
    {Title: 'Bella', imdbID: '222', Type: 'Mother', Poster: 'Missing', Year: '1970'},
    {Title: 'Mortimer', imdbID: '444', Type: 'Father', Poster: 'Home', Year: '1968'},
    {Title: 'Cassandra', imdbID: '888', Type: 'Daughter', Poster: 'Away', Year: '1990'}
];

export async function getData(): Promise<IMovie[]> {
    return new Promise((resolve, reject) => {
        if (testArray.length > 0) {
            resolve(testArray);
        } else {
            reject('No movies found');
        }
    });
};