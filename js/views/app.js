// the element control pattern

// consists of two views: one controls a collection of items while the other deals with each individual item

// AppView will handle the creation of new todos and rendering of the initial todo list

// Instances of TodoView will be associated with each individual Todo record aka editing, updating, and destroying

var app = app || {};

// The Application
// ________________________

// Our overall **AppView** is the top-level piece of updating

app.AppView = Backbone.View.extend({
	// instead of generating a new element, bind to the existing skelton of the App already present 
	// within the HTML
	el: '#todoapp',

	// Our template for the line of statistics at the bottom of the app.
	// at initialization we bind the relevant events on the 'Todos'
	// loading any preexisting todos that might be saved in *localstorage*
	statsTemplate: _.template($('#stats-template').html() ),

	initialize: function(){
		this.allCheckbox = this.$('#toggle-all')[0];
		this.$input = this.$('#new-todo'); // $(view.el).find(selector)
		this.$footer = this.$('#footer');
		this.$main = this.$('#main');
		// we are listening for an add on the collection Todos... if something is add we will excute the function addOne()
		// we are listening for a reset on the collection todos if Todos is reset we will execute the function addAll()
		this.listenTo(app.Todos, 'add', this.addOne);
		this.listenTo(app.Todos, 'reset', this.addAll);

		// new shit
		this.listenTo(app.Todos, 'change:completed', this.filterOne)
		this.listenTo(app.Todos, 'filter', this.filterAll)
		this.listenTo(app.Todos, 'all', this.render);
	},

	// new
	// delegated events for creatin new items, and clearing completed ones
	// events: {
	// 	'keypress #new-todo': 'createOnEnter',
	// 	'click #clear-completed':
	// }

	// add a single todo item to the list by creating a view for it, and appending its element to the <'ul>'
	addOne: function(todo) {
		var view = new app.TodoView({ model: todo });
		$('#todo-list').append(view.render().el);
	},

	addAll: function(){
		this.$('#todo-list'),html('');
		app.Todos.each(this.addOne, this)
	}

})

// things to note.

// the initialize method is called upon instantiation and several view-specific methods

// el refers to the matching <section id="todoapp"/> element in the index.html

// statsTemplate will be used later in our view

// the initialize function
// we first use it to cache the elements it will be using into local properties 
// bind two events on the Todos collection: add and reset












