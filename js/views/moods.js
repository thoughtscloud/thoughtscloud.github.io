/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/moods.html',
	'common'
], function ($, _, Backbone) {
	'use strict';

	var MoodView = Backbone.View.extend({
		tagName:  "li",
		template: _.template("<%= text %>"),

		initialize: function() {
			this.listenTo(this.model, "change", this.render);
		},
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

	});

	return MoodView;
});