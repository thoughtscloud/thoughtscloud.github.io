'use strict';

require.config({
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		}
	},
	paths: {
		jquery: '../bower_components/jquery/jquery',
		underscore: '../bower_components/underscore/underscore',
		backbone: '../bower_components/backbone/backbone',
		text: '../bower_components/requirejs-text/text',
		firebase: '../bower_components/firebase/firebase',
		backbonefire: 'backbonefire'
	}
});

require([
	'backbone',
	'views/app',
	'routers/router',
	'collections/moods',
    'jquery'
], function (Backbone, AppView, Workspace, MoodsCollection, $) {
	new Workspace();
	Backbone.history.start();
    // Import the dictionary of feelings from the afinn.json
    $.getJSON('js/afinn.json', function(data){
        // Initialize the application view
        new AppView({ collection: MoodsCollection, json : data});
    });

});