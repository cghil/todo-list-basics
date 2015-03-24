var app = app || {};

app.Todo = Backbone.Model.extend({

	// default attributes ensure that each todo created has 'title' and completed keys
	defaults: {
		title: '',
		completed: false
	},

	// toggle the completed state of this todo item
	toggle: function(){
		this.save({
			completed: !this.get('completed') // this is change the true or false value in a clever way
		});
	}
});

