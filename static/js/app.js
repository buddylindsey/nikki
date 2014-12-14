var app = app || {};

app.Note = Backbone.Model.extend({
    default: {
        title: "",
        scripture: "",
        body: ""
    }
});

app.Notebook = Backbone.Collection.extend({
    model: app.Note,
    url: "/api/notes/"
});

app.NoteView = Backbone.View.extend({
    tagName: "div",
    className: "note",
    template: _.template($('#note-view').html()),
    events: {
        "click .delete": "deleteNote"
    },
    render: function () {
        this.$el.html(this.template(this.model.attributes));
        return this;
    },
    deleteNote: function () {
        this.model.destroy();
        this.remove();
    }
});

app.NotesListView = Backbone.View.extend({
    el: "#note-content",
    events: {
        'click #add': 'addNote'
    },
    initialize: function () {
        this.collection = new app.Notebook();
        this.collection.fetch({reset: true});
        this.render();

        this.listenTo(this.collection, 'reset', this.render);
        this.listenTo(this.collection, 'add', this.renderNote)
    },
    render: function () {
        this.collection.each(function (item) {
            this.renderNote(item);
        }, this);
    },
    renderNote: function (item) {
        var noteView = new app.NoteView({model: item});
        $("#notes").append(noteView.render().el);
    },
    addNote: function (e) {
        e.preventDefault();

        var formData = {};

        $('#add-note div').children('input').each( function( i, el ) {
              element_value = $(el).val();
              if(element_value != '') {
                  formData[el.id] = element_value;
              }
        });
        formData['body'] = $('#add-note div #body').val()
        this.collection.create(new app.Note(formData));
    }
});

$(function () {
    new app.NotesListView();
});
