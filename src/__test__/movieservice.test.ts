/**
 * @jest-environment jsdom
 */


import { getData, testArray } from "../ts/services/__mocks__/movieservice";


jest.mock('axios', () => ({
    get: async (url: string) => {
        return new Promise((resolve, reject) => {
            if (url.endsWith('error')) {
                reject([]);
            }
            else {
                resolve ({data: {Search: testArray}});
            }
        });

    }
}));


describe('everything with getData', () => {

    test('should fetch data from testArray', async () => {

        // Arrange

        // Act 
        let result = await getData();
    
        // Assert
        expect(result.length).toBe(3);
        expect(result[0].Title).toBe('Bella');

    });

    test('should not be able to fetch data from testArray', async () => {
        try {
            await getData();
        } catch (error: any) {
            expect(error.length).toBe(0);
        }

    });
});