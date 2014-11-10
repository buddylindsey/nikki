$(function(){
    var app = app || {};

    app.Note = Backbone.Model.extend({
        default: {
            title: "",
            scripture: "",
            body: ""
        }
    });

    app.NoteView = Backbone.Model.extend({
        tagName: 'li',
        template: $("#note-view"),
        initialize: function() {
            this.listenTo(this.model, 'change:title', this.render);
        },
        render: function() {
            var tmpl = _.template(this.template);
            this.$el.html(tmpl(this.model.toJSON()));
            return this;
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

    app.NotesList = Backbone.View.extend({
        tagName: 'div',
        initialize: function() {
            this.render();
        },
        render: function() {
            var notesView = this.collection.map(function(note) {
                return (new NoteView({model: note})).render().el;
            });
            this.$el.html(notesView);
            return this;
        }
    });

    new app.NotesList();

/*    app.NoteListView = Backbone.View.extend({*/
        //el: "#notes ul",
        //initialize: function() {
            //this.listenTo(app.notes, "add remove", this.render);
        //},
        //events: {
            //"click span.delete": "delete"
        //},
        //delete: function(el) {
            //console.log(el);
        //},
        //render: function() {
            //template_html = $("#notes-template").html();
            //template = _.template(template_html, {notes: app.notes});
            //this.$el.append(template);
            //return this
        //}
    //});

    /*new app.NoteListView();*/
});
