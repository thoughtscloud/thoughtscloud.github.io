/*global define*/
define([
	'underscore',
	'backbone'
], function (_, Backbone) {
	'use strict';

	var mood = Backbone.Model.extend({
		// Default attributes for the mood
		// and ensure that each mood created has a date and text
		defaults: {
			text: '',
			dateAdded: new Date().getTime()
		},

		/*// Toggle the `completed` state of this todo item.
		toggle: function () {
			this.save({
				completed: !this.get('completed')
			});
		}*/
	});

	return mood;
});