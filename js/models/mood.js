/*global define*/
define([
	'underscore',
	'backbone'
], function (_, Backbone) {
	'use strict';

	var mood = Backbone.Model.extend({
		defaults: {
			text: '',
			dateAdded: new Date().getTime(),
            weight: 0,
            wordsList: []
		},


	});

	return mood;
});