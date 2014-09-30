$(function(){
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

    app.notes = new app.Notebook();

    app.NoteFormView = Backbone.View.extend({
        el: $("#add-note"),
        events: {
            "submit": "submit"
        },
        submit: function(e) {
            e.preventDefault();
            note = {
                user: this.$('input[name=user]').val(),
                title: this.$('input[name=title]').val(),
                scripture: this.$('input[name=scripture]').val(),
                body: this.$('input[name=body]').val()
            }
            app.notes.create(note);
            this.$el[0].reset();
        }
    });

    new app.NoteFormView()

    app.NoteListView = Backbone.View.extend({
        el: "#notes",
        initialize: function() {
            this.listenTo(app.notes, "add remove", this.render);
            this.render();
        },
        render: function() {
            template_html = $("#notes-template").html();
            template = _.template(template_html, {notes: app.notes});
            this.$el.html(template);
            return this
        }
    });

    new app.NoteListView();
});
