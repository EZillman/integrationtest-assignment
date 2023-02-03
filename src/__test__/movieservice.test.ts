/**
 * @jest-environment jsdom
 */

//import axios from "axios";
import { testArray } from "../ts/services/__mocks__/movieservice";
import { getData } from '../ts/services/movieservice';
 

jest.mock('axios', () => ({
    get: async (url: string) => {
        return new Promise((resolve, reject) => {
            if (url.endsWith('error')) {
                reject({ data: []});
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
        let result = await getData('ella');
    
        // Assert
        expect(result.length).toBe(3);
        expect(result[0].Title).toBe('Bella');

    });

    test('should not be able to fetch data from testArray', async () => {
        try {
            await getData('error');
        } catch (error: any) {
            expect(error.length).toBe(0);
        }

    });
});