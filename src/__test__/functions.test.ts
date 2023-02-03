/**
 * @jest-environment jsdom
 */

import { movieSort } from "../ts/functions";
import { IMovie } from "../ts/models/Movie";

describe('everything with movieSort', () => {

    test('should sort by name', () => {

        // Arrange
        const movies: IMovie[] = [
            {Title: 'Nougat', imdbID: '222', Type: 'candy', Poster: 'None', Year: '1999'},
            {Title: 'Hazelnut', imdbID: '444', Type: 'nut', Poster: 'Gone', Year: '2000'},
            {Title: 'Nutella', imdbID: '888', Type: 'spread', Poster: 'Gnome', Year: '2001'}
        ]

        // Act
        const result = movieSort(movies, true);

        // Assert
        expect(result[0].Title).toBe('Hazelnut');
        expect(result[1].Title).toBe('Nougat');
        expect(result[2].Title).toBe('Nutella');

    });

    test('should sort by name descending', () => {
        
        // Arrange
        const movies: IMovie[] = [
            {Title: 'Nougat', imdbID: '222', Type: 'candy', Poster: 'None', Year: '1999'},
            {Title: 'Hazelnut', imdbID: '444', Type: 'nut', Poster: 'Gone', Year: '2000'},
            {Title: 'Nutella', imdbID: '888', Type: 'spread', Poster: 'Gnome', Year: '2001'}
        ]

        // Act
        const result = movieSort(movies, false);

        // Assert
        expect(result[0].Title).toBe('Nutella');
        expect(result[1].Title).toBe('Nougat');
        expect(result[2].Title).toBe('Hazelnut');

    });
});
