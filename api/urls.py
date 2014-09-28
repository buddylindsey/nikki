from django.conf.urls import patterns, url
from rest_framework.urlpatterns import format_suffix_patterns
from .views import NoteList, NoteDetail

urlpatterns = patterns(
    '',
    url(r'^notes/$', NoteList.as_view()),
    url(r'^notes/(?P<pk>[0-9]+)/$', NoteDetail.as_view()),
)

urlpatterns = format_suffix_patterns(urlpatterns)
