var Workspace = Backbone.Router.extend({
	routes: {
		'*filter': 'setFilter'
	},

	setFilter: function(param){
		if (param) {
			param = param.trim()
		}
		app.TodoFilter = param || '';

		// trigger a colleciton filter event causing hiding / unhiding
		// of todo view items
		app.Todos.trigger('filter');
	}
});

app.TodoRouter = new Workspace();
Backbone.history.start();