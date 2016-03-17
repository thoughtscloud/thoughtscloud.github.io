/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'views/moods',
	'text!templates/moods.html',
	'common'
], function ($, _, Backbone, MoodView) {
	'use strict';

	// Our overall **AppView** is the top-level piece of UI.
	var AppView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '#moodapp',

		events: {
			"click #add-mood" : "createMood",
		},

		// At initialization we bind to the relevant events on the `this.collection`
		// collection, when items are added or changed. Kick things off by
		// loading any preexisting todos that might be saved in *localStorage*.
		initialize: function () {
			this.list = this.$('#moods-list');
			this.input = this.$("#new-mood"); // the textbox for new todos

			this.listenTo(this.collection, 'add', this.addOne);

		},

		addOne: function(mood) {
			var view = new MoodView({model: mood});
			this.list.append(view.render().el);
		},

		createMood: function(e) {
			if (!this.input.val()) { return; }
			// create a new location in firebase and save the model data
			// this will trigger the listenTo method above and a new todo view
			// will be created as well
			this.collection.create({text: this.input.val(), dateAdded: new Date().getTime()});
			this.input.val('');
		}
	});

	return AppView;
});