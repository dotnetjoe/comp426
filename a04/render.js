/**
 * Course: COMP 426
 * Assignment: a04
 * Author: <type your name here>
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */



/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function(hero) {
    // TODO: Generate HTML elements to represent the hero
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<div>${hero.name}</div>`;
    return `<div class="column is-2">
                <div class="card" style="height: 100%;background-color: ${hero.backgroundColor}">
                    <div class="card-image">
                        <figure class="image is-117x117">
                        <img src="${hero.img}" alt="${hero.name}">
                        </figure>
                    </div>
                    <div class="card-content">
                        <p class="title is-5" style="color: ${hero.color}">${hero.name}</p>
                        <p class="subtitle is-6" style="color: ${hero.color}">${hero.first + ' ' + hero.last}</p>
                        <div class="content is-size-7" style="color: ${hero.color}; max-height: 200px; overflow-y: scroll">
                            <span>${hero.firstSeen.getMonth() + '/19' + hero.firstSeen.getYear()}</span>
                            <p>${hero.description}</p>
                        </div>
                        <button class="button is-link is-small editbtn">Edit</button>
                    </div>
                </div>
            </div>`
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    // TODO: Generate HTML elements to represent the hero edit form
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<form>${hero.name}</form>`;
    return `<div class="modal is-active">
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Edit ${hero.name}</p>
                        <button class="delete" aria-label="close"></button>
                    </header>
                    <section class="modal-card-body">
                        <form>
                            <div class="field">
                                <label class="label">Hero Name</label>
                                <div class="control">
                                    <input class="input" type="text" value="${hero.name}">
                                </div>
                                <p class="help">Change the name of the hero.</p>
                            </div>
                            <div class="field">
                                <label class="label">First Name</label>
                                <div class="control">
                                    <input class="input" type="text" value="${hero.first}">
                                </div>
                                <p class="help">Change the first name of the hero.</p>
                            </div>
                            <div class="field">
                                <label class="label">Last Name</label>
                                <div class="control">
                                    <input class="input" type="text" value="${hero.last}">
                                </div>
                                <p class="help">Change the last name of the hero.</p>
                            </div>
                            <div class="field">
                                <label class="label">Description</label>
                                <div class="control">
                                    <textarea class="textarea">${hero.description}</textarea>
                                </div>
                                <p class="help">Change the hero's description.</p>
                            </div>
                            <div class="field">
                                <label class="label">First Seen</label>
                                <div class="control">
                                    <input class="input" type="date" min="1900-01-01" max="2020-01-01"
                                        value="19${hero.firstSeen.getYear()}-0${hero.firstSeen.getMonth()}-01">
                                </div>
                                <p class="help">Change when the hero first appeared.</p>
                            </div>
                            <footer class="modal-card-foot">
                                <button class="button is-success" type="submit">Save</button>
                                <button class="button">Cancel</button>
                            </footer>
                        </form>
                    </section>
                </div>
            </div>`
};



/**
 * Given an array of hero objects, this function converts the data into HTML and
 *     loads it into the DOM.
 * @param heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()
    let heroArr = [];
    for (let i = 0;i < heroes.length; i++) {
        heroArr[i] = renderHeroCard(heroArr[i]);
    }

    // TODO: Append the hero cards to the $root element
    $root.append(heroArr);

    // Pick a hero from the list at random
    const randomHero = heroes[Math.floor(Math.random() * heroes.length)];

    // TODO: Generate the hero edit form using renderHeroEditForm()
    const editForm = renderHeroEditForm(randomHero);

    // TODO: Append the hero edit form to the $root element
    $root.append(editForm);
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});
