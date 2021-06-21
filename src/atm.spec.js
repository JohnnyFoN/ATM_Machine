import { getBillsIfPossible, getHighestApoen } from './atm';

describe ('getHighestApoen', () => {
    it('should return highest appoens possible', () => {
        const testData = [
            {
                amount: 24500,
                apoens: {
                    5000: 4,
                    2000: 4,
                    1000: 4,
                    500: 4,
                },
                expectedApoen: String(5000)
            },
            {
                amount: 24500,
                apoens: {
                    5000: 0,
                    2000: 12,
                    1000: 10,
                    500: 4,
                },
                expectedApoen: String(2000)
            },
            {
                amount: 24500,
                apoens: {
                    5000: 0,
                    2000: 0,
                    1000: 25,
                    500: 4,
                },
                expectedApoen: String(1000)
            },
            {
                amount: 24500,
                apoens: {
                    5000: 0,
                    2000: 0,
                    1000: 0,
                    500: 100,
                },
                expectedApoen: String(500)
            },
            {
                amount: 24500,
                apoens: {
                    5000: 0,
                    2000: 0,
                    1000: 0,
                    500: 0,
                },
                expectedApoen: undefined
            },
            {
                amount: 245,
                apoens: {
                    5000: 10,
                    2000: 10,
                    1000: 10,
                    500: 10,
                },
                expectedApoen: undefined
            }
        ]
        testData.forEach(({amount, apoens, expectedApoen})=>{
            const result = getHighestApoen(apoens, amount);
            expect(result).toBe(expectedApoen);
        });
    });
});

describe ('getBillsIfPossible', () => {
    it('should return proper apoens', () => {
        const testData = [
            {
                amount: 24500,
                apoens: {
                    5000: 4,
                    2000: 4,
                    1000: 4,
                    500: 4,
                },
                billsSoFar: [],
                expectedApoens: ["5000","5000","5000","5000","2000","2000","500"]
            },
            {
                amount: 6000,
                apoens: {
                    5000: 2,
                    2000: 3,
                    1000: 0,
                    500: 0,
                },
                billsSoFar: [],
                expectedApoens: ["2000","2000","2000"]
            },
            // {
            //     amount: 7000,
            //     apoens: {
            //         5000: 3,
            //         2000: 2,
            //         1000: 4,
            //         500: 4,
            //     },
            //     billsSoFar: [],
            //     expectedApoens: ["5000","2000"]
            // },
            {
                amount: 4500,
                apoens: {
                    5000: 3,
                    2000: 2,
                    1000: 4,
                    500: 4,
                },
                billsSoFar: [],
                expectedApoens: ["2000","2000","500"]
            },
            {
                amount: 1250,
                apoens: {
                    5000: 3,
                    2000: 2,
                    1000: 4,
                    500: 4,
                },
                billsSoFar: [],
                expectedApoens: []
            }
        ]

        testData.forEach(data => {
            const result = getBillsIfPossible(data.amount, data.billsSoFar, data.apoens);
            expect(result).toEqual(data.expectedApoens);
        })
    }); 
});