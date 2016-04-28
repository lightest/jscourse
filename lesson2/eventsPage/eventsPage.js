/*
 * @desc: thing below is called a module... well,
 *        simplified version of it expressed as a custom object.
 *        Organazing all your code in to such modules allows to structurize
 *        it by separating functionality to respective entities.
 *        Each function in module below will only do something with events page.
 *        Each EXTERNAL function that would like to do something with events page
 *        will also use the code defined in this module. It becomes very easy to track
 *        changes in the system when they all go through specific places.
 *        In other words if something isn't working on events page this is the place
 *        to start looking for the problem.
 */
var eventsPage = {
	onPageLoad: function () {
		console.log('events');
	}
};