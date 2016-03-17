/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'views/moods',
	'text!templates/moods.html',
	'text!afinn.json'
], function ($, _, Backbone, MoodView, afinn) {
	'use strict';







	var wordsModel = Backbone.Model.extend({
		defaults: {
			word: '',
			weight: ''
		}
	});

	var wordsCollection = Backbone.Collection.extend({
		model: wordsModel,
		url: 'js/afinn.json'
	});





	var wordsHandler = function (text) {


		var word = new wordsCollection();
		word.fetch({
			reset: true
		});

		word.bind('reset', function () {
			console.log("something: " + word.word["bad"]);
		});

		/*var word = JSON.parse(afinn);*/

		/*console.log(text);*/


		/*var res = text.split(" ");
		var wordsUsed = {"word": '', "weight": 0};
		/!*var textWeight = 0;*!/


		for (var i = 0; i <= res.length; i++) {

			console.log("word " + word[res[i]]);
			if (word[res[i]]) {
				wordsUsed.add({"word": i, "weight": res[i]});
			}
		}*/
/*
		for (var i = 0; i <= res.length; i++) {
			console.log("words " + wordsUsed[i].toString());
		}

		return wordsUsed;*/
	}





	var AppView = Backbone.View.extend({

		el: '#moodapp',

		events: {
			"click #add-mood" : "createMood",
		},

		initialize: function () {
			this.list = this.$('#moods-list');
			this.input = this.$("#new-mood");

			this.listenTo(this.collection, 'add', this.addOne);


		},



		addOne: function(mood) {
			var view = new MoodView({model: mood});
			this.list.append(view.render().el);
		},

		createMood: function(e) {
			if (!this.input.val()) { return; }



			wordsHandler(this.input.val());



			this.collection.create({
									text: this.input.val(),
									dateAdded: new Date().getTime(),
									weight : 0,
									words : [
										     {"word" : 'bad', "weight" : -1},
											 {"word" : 'cool', "weight" : 1}
											]
									});
			this.input.val('');
		}
	});

	return AppView;
});