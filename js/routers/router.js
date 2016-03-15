/*global define*/
define([
	'jquery',
	'backbone',
	'collections/todos',
	'collections/moods',
	'common'
], function ($, Backbone, Todos, moods, Common) {
	'use strict';

	var AppRouter = Backbone.Router.extend({
		routes: {
			'*filter': 'setFilter',
			'moods' : 'getMoods'
		},


		setFilter: function (param) {
			// Set the current filter to be used
			Common.TodoFilter = param || '';

			// Trigger a collection filter event, causing hiding/unhiding
			// of the Todo view items
			moods.trigger('filter');
		}
	});

	return AppRouter;
});