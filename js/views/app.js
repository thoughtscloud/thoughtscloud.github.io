define([
	'jquery',
	'underscore',
	'backbone',
	'views/moods'
], function ($, _, Backbone, MoodView) {
	'use strict';

	var AppView = Backbone.View.extend({
		el: '#moodapp',
		events: {
			"click #add-mood" : "createMood",
			"click #sort-date" : "sortByDate",
		},

		initialize: function (options) {
			this.list = this.$('#moods-list');
			this.input = this.$("#new-mood");

			this.listenTo(options.collection, 'add', this.addOne);
			this.json = options.json;
		},

		addOne: function(mood) {
			var view = new MoodView({model: mood});
			this.list.prepend(view.render().el);
		},

		createMood: function(e) {
			if (!this.input.val()) { return; }

			var wordsUsed = wordsHandler(this.json, this.input.val());
			var weight = 0;

			if(!_.isEmpty(wordsUsed)){
				var sum = 0;
				_.each(wordsUsed, function(value) {
					sum += parseInt(value["weight"]);
				});

				var weight = sum / wordsUsed.length;
			}

			var dateNew = new Date();
			this.collection.create({
									text: this.input.val(),
									dateAdded: dateNew.getTime(),
									weight : weight,
									words : wordsUsed
									});

			console.log("Date: " + (dateNew.getMonth() + 1) + "/" + dateNew.getDate() + "/" + dateNew.getFullYear()
				+ " " + dateNew.getHours() + ":" + + dateNew.getMinutes() +
				"\nText: " +  this.input.val() +
				"\nWords used: " + JSON.stringify(wordsUsed) +
				"\nWeight Average: " + weight);

			this.input.val('');
		},
		sortByDate: function() {
			var list = this.list;

			list.children().each(function (i, li) {
				list.prepend(li)
			});

			this.list.parent().html("\<ul id='moods-list'>" + list.html() + "\</ul>");
			this.list = this.$('#moods-list');
		}
	});

	// Compares the user's text with the feelings dictionary
	// Returns a list of matched words and it's weight
	var wordsHandler = function (json, text) {
		var noCommas = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
		var res = noCommas.split(" ");
		var wordsUsed = [];

		for (var i = 0; i <= res.length; i++) {

			if (json[res[i]]) {
				wordsUsed.push({"word": res[i], "weight": json[res[i]]});
			}
		}
		return wordsUsed;
	}

	return AppView;
});