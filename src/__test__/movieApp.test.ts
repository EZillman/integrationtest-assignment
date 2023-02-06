/**
 * @jest-environment jsdom
 */

import { IMovie } from '../ts/models/Movie';
import * as movieApp from '../ts/movieApp';
import { testArray } from '../ts/services/__mocks__/movieservice';
import { getData } from '../ts/services/movieservice';

beforeEach(() => {
    document.body.innerHTML = '';
});

jest.mock('../ts/services/movieservice');


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


describe('everything with handleSubmit', () => {

    test('Should get data and call createHtml', async () => {

        // Arrange
        document.body.innerHTML = `
        <form id="searchForm">
            <input type="text" id="searchText" placeholder="Skriv titel här" />
            <button type="submit" id="search">Sök</button>
        </form>

        <div id="movie-container"></div>
        `;

        let movies: IMovie[] = [];
        let searchText = (document.querySelector('#searchText') as HTMLInputElement).value = 'test';
        let container: HTMLDivElement = document.querySelector('#movie-container') as HTMLDivElement;
        let ragdollSpy = jest.spyOn(movieApp, 'createHtml').mockReturnValue();
        

        // Act
        await movieApp.handleSubmit();
        movies = await getData(searchText);

        let resultContainer = document.getElementsByClassName('movies');

        // Assert
        expect(movies.length).toBe(3);
        expect(ragdollSpy).toHaveBeenCalled();
        expect(ragdollSpy).toBeCalledWith(movies, container);
        expect(resultContainer).toBeTruthy();
        ragdollSpy.mockRestore();

    });


    test('Should call displayNoResult ', async () => {

        // Arrange
        document.body.innerHTML = `
        <form id="searchForm">
            <input type="text" id="searchText" placeholder="Skriv titel här" />
            <button type="submit" id="search">Sök</button>
        </form>

        <div id="movie-container"></div>
        `;

        let movies: IMovie[] = [];
        let searchText = (document.querySelector('#searchText') as HTMLInputElement).value = '';
        //let bengalSpy = jest.spyOn(movieApp, 'displayNoResult').mockReturnValue();

        // Act
        await movieApp.handleSubmit();

        // Assert
        expect(movies.length).toBe(0);
        //expect(bengalSpy).toHaveBeenCalled();
        //bengalSpy.mockRestore();

    });
}); 



describe('everything with createHtml', () => {

    test('should create html', () => {

        // Arrange
        document.body.innerHTML = `<div id="movie-container"></div>`;

        let container = document.querySelector('#movie-container') as HTMLDivElement;

        // Act
        movieApp.createHtml(testArray, container);

        // Assert
        let titleOfFirst = container.firstChild?.firstChild?.textContent;
        let check = document.getElementsByClassName('movie');
        expect(container.innerHTML).toContain('h3');
        expect(container.innerHTML).toContain('img');
        expect(titleOfFirst).toContain('Bella');
        expect(check).toBeTruthy();

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