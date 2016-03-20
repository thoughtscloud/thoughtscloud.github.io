define([
	'jquery',
	'backbone',
	'collections/moods',
	'common'
], function ($, Backbone, moods, Common) {
	'use strict';

	var AppRouter = Backbone.Router.extend({
		routes: {
			'*filter': 'setFilter'
		},


		setFilter: function (param) {
			Common.TodoFilter = param || '';
			moods.trigger('filter');
		}
	});

	return AppRouter;
});