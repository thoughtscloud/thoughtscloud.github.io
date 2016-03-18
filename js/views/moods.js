/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/moods.html',
	'common'
], function ($, _, Backbone, moodsTemplate) {
	'use strict';

	var MoodView = Backbone.View.extend({
		tagName:  "li",
		template: _.template(moodsTemplate),

		initialize: function() {
			this.listenTo(this.model, "change", this.render);
		},

        remove: function() {
            this.model.off('change', this.render);
            this.$el.remove();
        },

		render: function() {

			var dateNew = new Date(this.model.attributes.dateAdded);
			this.model.attributes.dateAdded = (dateNew.getMonth() + 1) + "/" + dateNew.getDate()
												+ "/" + dateNew.getFullYear()
												+ " " + dateNew.getHours() + ":" + + dateNew.getMinutes();

			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

	});

	return MoodView;
});