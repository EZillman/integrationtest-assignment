import { IMovie } from '../../models/Movie';

export let testArray: IMovie[] = [
    {Title: 'Bella', imdbID: '222', Type: 'First', Poster: 'None', Year: '1970'},
    {Title: 'Ella', imdbID: '444', Type: 'Second', Poster: 'Gone', Year: '1968'},
    {Title: 'Stella', imdbID: '888', Type: 'Third', Poster: 'Gnome', Year: '1990'}
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