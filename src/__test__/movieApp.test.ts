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

        // Act
        movieApp.init();

        // Assert
        (document.querySelector('searchForm') as HTMLFormElement)?.submit();
        expect(tiredSpy).toHaveBeenCalled();
        tiredSpy.mockRestore();
    });
});