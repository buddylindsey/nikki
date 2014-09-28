from django.conf.urls import patterns, include, url
from django.contrib import admin

from home.views import IndexView

urlpatterns = patterns(
    '',
    url(r'^$', IndexView.as_view(), name='index'),

    url(r'^api/', include('api.urls')),

    url(r'^admin/', include(admin.site.urls)),
)
