var router = {
    initRouter: function () {
        /*
         * @desc: to reference the properties of the object from the inside keyword "this" is used.
         *        "this" is a reference to the object relatively which a function was called.
         *        For example calling router.initRouter() will have this = router inside of the
         *        initRouter() function because we called it from router object.
         *        BUT if we call the very same function directly (saving it in variable for example)
         *        "this" will be referencing global object (window).
         */
        Path.map('#/events').to(eventsPage.onPageLoad).enter(this.preparePage);
        Path.map('#/presentations').to(presentationsPage.onPageLoad).enter(this.preparePage);
        Path.map('#/chat').to(chatPage.onPageLoad).enter(this.preparePage);

        Path.listen();
    },

    preparePage: function () {
        var routeMatch = Path.routes.current.match(/\w+/);
        var rootPath = '';
        if(routeMatch) {
            rootPath = routeMatch[0];
        }

        var pages = document.querySelectorAll('.page');

        for(var i = pages.length; --i>=0;) {
            if(pages[i].id === rootPath) {
                pages[i].classList.remove('hidden');
            } else {
                pages[i].classList.add('hidden');
            }
        }
    }
};