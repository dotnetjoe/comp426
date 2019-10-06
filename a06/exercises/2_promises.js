import {heroData} from "./data";


/**
 * This serves the same purpose as the callback function before it. This time it is going
 * to do it using promises. It should use the promise `reject` functionality to return an
 * error if id of the hero is not valid (no hero with that Id in the data).
 *
 * The promise should resolve after 1.5s (1500ms).
 *
 * @param heroData
 * @param id
 * @returns {Promise<object>}
 */
export function getHeroByIdPromise(heroData, id) {
    let thisHero=null;

    heroData.forEach( a => {
        if(a.id == id){
            thisHero = a;
        }
    });

    return new Promise(((resolve, reject) => {
    // Resolve is used as a callback on a success
    // Reject is used as a callback on a failure
        setTimeout(() => {
            if (thisHero == null) {
            reject(`No hero.`);
        } else {
            resolve(thisHero);
            }
        }, 1500);
    }));
}



// Below is code to help you get the right solution.

const hero2 = getHeroByIdPromise(heroData, 2)
    .then(hero => {
        console.log(`Found the hero with id ${hero.id}`, hero);
    })
    .catch(error => {
        console.log(error);
    });
console.log(`logging hero2 and should be a promise ${hero2}`);


const heroError = getHeroByIdPromise(heroData, 20)
    .then(hero => {
        console.log(`Found the hero with id ${hero.id}`, hero);
    })
    .catch(error => {
        console.log(error);
    });





