// a Todolist collection is used to group our models
// The collection uses the LocalStorage adapter to override Backbone's default sync()
// html5 local storage

var app = app || {};

var TodoList = Backbone.Collection({
	model: app.Todo,
	// references the app.Todo which is a model

	// save all of the todo items under the 'todos-backbone' namespace.
	localStorage: new Backbone.LocalStorage('todos-backbone'),

	// Filter down the list of all todo items that are finished

	completed: function(){
		return this.filter(function(todo){ // we are going to iterate through this with a underscore function (.filter())
			return todo.get('completed');
			// this refers to the instance of TodoList
		});
	},
	// filter down the list to only todo items that are not finished
	remaining: function(){
		return this.without.apply(this, this.completed() );
		// *reminder* our instance of class TodoList is an array of instance models
		// this without is an underscore method
	},

	// We keep the Todos in sequential order, despite being saved by unordered
	// GUID in the database. This generates the next order number for new items
	nextOrder: function() {
		if (!this.length) {
			return 1;
		}
		return this.last().get('order') + 1
	}

	// Todos are soted by their original insertion order

	comparator: function( todo ){
		return todo.get('order');
	}

});
// Create our global collection of Todos

app.Todos = new Todolist();
