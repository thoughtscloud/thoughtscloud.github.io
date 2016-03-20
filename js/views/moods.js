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
            // Data formated to be readable when rendered in the template
			var dateNew = new Date(this.model.attributes.dateAdded);
			this.model.attributes.dateAdded = (dateNew.getMonth() + 1) + "/" + dateNew.getDate()
												+ "/" + dateNew.getFullYear()
												+ " " + dateNew.getHours() + ":" + + dateNew.getMinutes();

            // This conditions checks the range in which the user's text fills in
            // based in the overall weight of positive/negative words used.
            // A proper background color is assigned to the element,
            // black if considered with the most negative range;
            // green if considered with the most positive range.
            var colorRange = '';
            var fontColor = '#333';
            if(this.model.attributes.weight <= -3){
                colorRange = 'Black';
                fontColor = 'White';
            }else if(this.model.attributes.weight > -3 && this.model.attributes.weight < -1.5){
                colorRange = 'DimGrey';
                fontColor = 'White';
            }else if(this.model.attributes.weight >= -1.5 && this.model.attributes.weight < -1){
                colorRange = 'DarkGray';
            }else if(this.model.attributes.weight >= -1 && this.model.attributes.weight < -0.5){
                colorRange = 'Gainsboro';
            }else if(this.model.attributes.weight >= 0 && this.model.attributes.weight < 0.5) {
                colorRange = 'White';
            }else if(this.model.attributes.weight >= 0.5 && this.model.attributes.weight < 0.75){
                colorRange = 'LightCyan';
            }else if(this.model.attributes.weight >= 0.75 && this.model.attributes.weight < 1){
                colorRange = 'PaleGoldenRod';
            }else if(this.model.attributes.weight >= 1 && this.model.attributes.weight < 1.25){
                colorRange = 'Pink';
            }else if(this.model.attributes.weight >= 1.25 && this.model.attributes.weight < 1.5) {
                colorRange = 'LemonChiffon';
            }else if(this.model.attributes.weight >= 1.5 && this.model.attributes.weight < 1.75){
                colorRange = 'Plum';
            }else if(this.model.attributes.weight >= 1.75){
                colorRange = 'LightGreen';
            }

            this.$el.css({'background-color' : colorRange, 'color' : fontColor});

			this.$el.html(this.template(this.model.toJSON()));

			return this;
		},

	});

	return MoodView;
});