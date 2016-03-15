/*global define */
define([
	'underscore',
	'backbone',
	'models/mood',
	'firebase',
	'backbonefire'
], function (_, Backbone, mood) {
	'use strict';


	var MoodsCollection = Backbone.Firebase.Collection.extend({
		// Reference to this collection's model.
		model: mood,

		// Save all of the todo items under the `"todos"` namespace.
		url: 'https://blistering-fire-6138.firebaseio.com/',

	});

	return new MoodsCollection();
});