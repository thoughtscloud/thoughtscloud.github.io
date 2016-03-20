define([
	'underscore',
	'backbone',
	'models/mood',
	'firebase',
	'backbonefire'
], function (_, Backbone, mood) {
	'use strict';

	// This collection adds moods into the Firebase database
	var MoodsCollection = Backbone.Firebase.Collection.extend({
		model: mood,
		url: 'https://thoughtscloud.firebaseio.com'
	});
	return new MoodsCollection();
});