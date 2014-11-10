from django.views.generic import ListView

from notes.models import Note


class IndexView(ListView):
    template_name = 'home/index.jinja'
    context_object_name = 'notes'
    model = Note
