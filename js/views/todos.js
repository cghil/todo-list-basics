// TodoView will be incharge of individual Todo records
// we want to view to change when an todo gets changes on some events

var app = app || {};

// Todo Item view
//  _______________

// The DOM element for a todo Item

app.TodoView = Backbone.View.extend({
	// ... is a list tag
	tagName: 'li',

	// Cache the template function for a single item
	template: _.template( $('#item-template').html() ),

	// The DOM events specific to an item

	events: {
		'click .toggle': 'toggleCompleted',
		'dblclick label': 'edit',
		'click .destroy': 'clear',
		'keypress .edit': 'updateOnEnter',
		'blur .edit': 'close'
	},

	// The todoview listens for changes to its model, re-rendering. Since there's a one to one
	//  relationship between a **Todo** and a **TodoView** in this app, we set a direct reference on 
	// the model for convenience

	initialize: function(){
		this.listenTo(this.model, 'change', this.render);
	},

	// Re-renders the titles of the todo item

	render: function(){
		this.$el.html(this.template(this.model.attributes));
    this.$input = this.$('.edit');
    return this;
	},

	// switch this view into 'editing' mode, displaying the input field
	edit: function() {
		this.$el.addClass('editing');
		this.$input.focus();
	},

	// close the 'editing' mode, saving changes to the todo
	close: function(){
		var value = this.$input.val().trim();

		if (value) {
			this.model.save({title: value});
		}

		this.$el.removeClass('editing');
	},

	updateOnEnter: function(e) {
		if (e.which === ENTER_KEY) {
			this.close();
		}
	}

});

// the initialize() constructor, we set up a listener that monitors a todo model's change event