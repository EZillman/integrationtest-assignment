/**
 * @jest-environment jsdom
 */

import * as movieApp from '../ts/movieApp';

beforeEach(() => {
    document.body.innerHTML = "";
});


describe('everything with init', () => {
    
    test('should call handleSubmit', () => {

        // Arrange
        document.body.innerHTML = `
        <form id="searchForm">
            <input type="text" id="searchText" placeholder="Skriv titel här" />
            <button type="submit" id="search">Sök</button>
        </form>
        `;

        let tiredSpy = jest.spyOn(movieApp, 'handleSubmit').mockReturnValue(new Promise<void>((resolve) => {
            resolve();
        }));

        let searchForm = document.querySelector('#searchForm') as HTMLFormElement;

        // Act
        movieApp.init();
        searchForm.submit();

        // Assert
        expect(tiredSpy).toHaveBeenCalled();
        tiredSpy.mockRestore();
    });
});


describe('everything with displayNoResult', () => {

    test('should display a p tag as a message', () => {

        // Arrange
        document.body.innerHTML = `<div id="movie-container"></div>`;
        
        let container = document.querySelector('#movie-container') as HTMLDivElement;

        // Act
        movieApp.displayNoResult(container);

        // Assert
        let message = document.querySelector('#movie-container > p')?.innerHTML;
        expect(message).toBe('Inga sökresultat att visa');
    });
});