define([
	'underscore',
	'backbone'
], function (_, Backbone) {
	'use strict';

    // Model for a instance of a mood input
    // A mood receives the text input, the date of the input,
    // the generated weight and the list of words used to compute the mood.
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