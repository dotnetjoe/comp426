import mpg_data from "./data/mpg_data";
import {getStatistics} from "./medium_1";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/

const mpgSum = (accumulator, mpg) => accumulator + mpg;

const mpgAvg = cars => {
    return {
        city: cars.map(car => car.city_mpg).reduce(mpgSum) / cars.length,
        highway: cars.map(car => car.highway_mpg).reduce(mpgSum) / cars.length
    };
};


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: {
        city: mpg_data.map(car => car.city_mpg).reduce(mpgSum) / mpg_data.length,
        highway: mpg_data.map(car => car.highway_mpg).reduce(mpgSum) / mpg_data.length
    },
    allYearStats: getStatistics(mpg_data.map(car => car.year)),
    ratioHybrids: mpg_data.map(car => car.hybrid).reduce((accumulator, hybrid) => {
        if (hybrid) 
            return accumulator + 1;
        return accumulator;
    }) / mpg_data.length
};


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: [...new Set(mpg_data.map(car => car.make))].map(make => {
        return {
            make: make,
            hybrids: mpg_data.filter(car => car.make === make && car.hybrid).map(car => car.id)
        };
    }).filter(make => make.hybrids.length > 0).sort((a, b) => b.hybrids.length - a.hybrids.length),
    avgMpgByYearAndHybrid: [...new Set(mpg_data.map(car => car.year))].reduce((o, year) => {
        const filtered_year = mpg_data.filter(car => car.year === year);

        return {...o, [year]: {
            hybrid: mpgAvg(filtered_year.filter(car => car.hybrid)),
            notHybrid: mpgAvg(filtered_year.filter(car => !car.hybrid))
        }};
    }, {})
};
