/*global define*/
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

			this.sortByFlag = false;
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

			this.collection.create({
									text: this.input.val(),
									dateAdded: new Date().getTime(),
									weight : weight,
									words : wordsUsed
									});
			this.input.val('');
		},
		sortByDate: function() {
			var list = this.list;

			list.children().each(function (i, li) {
				list.prepend(li)
			});

			this.list.parent().html("\<div id='mood-wraper'>\<ul id='moods-list'>" + list.html() + "\</ul></div>");
			this.list = this.$('#moods-list');
		}
	});

	var wordsHandler = function (json, text) {
		var noCommas = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
		console.log(noCommas);
		var res = noCommas.split(" ");
		console.log(res);
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