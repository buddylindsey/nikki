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

    app.notes = new app.Notebook([new app.Note({title:"title", scripture:"Mathew 5", body:"Body"})]);

    app.NoteListView = Backbone.View.extend({
        el: "#notes",
        initialize: function() {
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
