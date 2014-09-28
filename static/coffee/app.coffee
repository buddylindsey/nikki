$( () ->
  Note = Backbone.Model.extend
      default:
          title: ""
          scripture: ""
          body: ""

  Notebook = Backbone.Collection.extend
      model: Note
      url: "/api/notes/"

  notes = new Notebook()
  notes.fetch()

  NoteListView = Backbone.View.extend
      el: "#notes"
      initialize: () ->
          @render()
          return
      render: () ->
          template_html = $("#notes-template").html()
          template = _.template template_html,
              notes: notes
          debugger
          @.$el.html(template)
          return @

  new NoteListView()
  return
)
