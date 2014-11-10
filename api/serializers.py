from rest_framework.serializers import ModelSerializer

from notes.models import Note


class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = ('id', 'user', 'title', 'scripture', 'body')

    def validate_scripture(self, attrs, source):
        pass
