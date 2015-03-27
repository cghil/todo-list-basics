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

	statsTemplate: _.template($('#stats-template').html() ),

	// new
	// delegated events for creatin new items, and clearing completed ones
	events: {
		'keypress #new-todo': 'createOnEnter',
		'click #clear-completed': 'clearCompleted',
		'click #toggle-all': 'toggleAllComplete'
	},

	// events: the events hash now contains callbacks for our DOM events. It binds those events to the following methods
	// at initialization we bind the relevant events on the 'Todos'
	// loading any preexisting todos that might be saved in *localstorage*
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
		this.listenTo(app.Todos, 'change:completed', this.filterOne);
		this.listenTo(app.Todos, 'filter', this.filterAll);
		this.listenTo(app.Todos, 'all', this.render);

		app.Todos.fetch(); 
	},

	// Re-rendering the app just means refreshing the statistics --the rest
	// of the app doesn't change

	render: function(){
		var completed = app.Todos.completed().length; // completed: a function that finds all the completed and returns an array
		var remaining = app.Todos.remaining().length;

		if (app.Todos.length) {
			this.$main.show();
			this.$footer.show();

			this.$footer.html(this.statsTemplate({
				completed: completed,
				remaining: remaining
			}));

			this.$('#filters li a')
	      .removeClass('selected')
	      .filter('[href="#/' + ( app.TodoFilter || '' ) + '"]')
	      .addClass('selected');
		} else {
			this.$main.hide();
			this.$footer.hide();
		}
		this.allCheckbox.checked = !remaining;
	},
	// add a single todo item to the list by creating a view for it, and appending its element to the <'ul>'
	addOne: function(todo) {
		var view = new app.TodoView({ model: todo });
		$('#todo-list').append(view.render().el);
	},

	addAll: function(){
		this.$('#todo-list').html('');
		app.Todos.each(this.addOne, this)
	},

	filterOne: function(todo){
		todo.trigger('visible');
	},

	filterAll: function() {
		app.Todos.each(this.filterOne, this);
	},

	newAttributes: function() {
    return {
      title: this.$input.val().trim(),
      order: app.Todos.nextOrder(),
      completed: false
    };
   },

	// if you hit return in the main input field, create new Todo model,
	// persisting it to localStorage
	createOnEnter: function(event){
		if (event.which !== ENTER_KEY || !this.$input.val().trim()) {
			return;
		}
		app.Todos.create( this.newAttributes() );
		this.$input.val('')
	},
// clear all completed todo itesm, destroying their models
	clearCompleted: function(){
		_.invoke(app.Todos.completed(), 'destroy');
		return false;
	},

	toggleAllComplete: function(){
		var completed = this.allCheckbox.checked;

		app.Todos.each(function(todo) {
			todo.save({
				'completed': completed
			});
		});
	}

});

// things to note.

// the initialize method is called upon instantiation and several view-specific methods

// el refers to the matching <section id="todoapp"/> element in the index.html

// statsTemplate will be used later in our view

// the initialize function
// we first use it to cache the elements it will be using into local properties 
// bind two events on the Todos collection: add and reset












