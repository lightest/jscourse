/*
 * @desc: Provides an illusion of having multiple pages.
 *        All we have is a single index.html file with HTML markup
 *        for each page inside of it. preparePage function is simply
 *        hides the HTML of one page and shows another creating a feeling
 *        of switching between pages. So we're working with logical pages here if
 *        you want.
 */
function preparePage () {
    var routeMatch = Path.routes.current.match(/\w+/);
    var rootPath = '';
    if(routeMatch) {
        rootPath = routeMatch[0];
    }

    var pages = document.querySelectorAll('.page');

    for(var i = pages.length; --i >= 0;) {
        if(pages[i].id === rootPath) {
            pages[i].classList.remove('hidden');
        } else {
            pages[i].classList.add('hidden');
        }
    }
}

// In this application we're gonna use client side routing approach.
// It means that instead of actually querying the server for each page
// we will have only one physical page "index.html" and navigate over
// it's different parts using JavaScript. Even though the page is only one
// we can mark up as many as we want inside of it.
//
// Main advantage of such approach is that there will be only one query
// for HTML to the server. Even though the efficiency of such approach is arguable
// it actually depends on the case. In our app user will open the application only
// once and then will quickly hop between different sections without necessity to load
// HTML each time. Other than that since HTML doesn't changes it means also that DOM
// won't change, so no need to make browser to rebuild the whole thing every time.
function initRouter () {
    // In order to boost our learning of basic concepts we're using simple library here.
    // refer to the link for more info on API https://github.com/mtrpcic/pathjs
    // In short .map() remembers the path and allows to associate different handlers with it.
    // For instance '#/events' path is associated with eventsPage.onPageLoad function and
    // each of the paths are associated with preparePage function on entry.
    Path.map('#/events').to(eventsPage.onPageLoad).enter(preparePage);
    Path.map('#/presentations').to(presentationsPage.onPageLoad).enter(preparePage);
    Path.map('#/chat').to(chatPage.onPageLoad).enter(preparePage);

    Path.listen();
}

window.onload = function () {
    initRouter();
}