from rest_framework.generics import (
    ListCreateAPIView, RetrieveUpdateDestroyAPIView)

from notes.models import Note

from .serializers import NoteSerializer


class NoteList(ListCreateAPIView):
    model = Note
    serializer_class = NoteSerializer


class NoteDetail(RetrieveUpdateDestroyAPIView):
    model = Note
    serializer_class = NoteSerializer
