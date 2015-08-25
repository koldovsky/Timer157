'use strict';

angular.module('timerApp.version', [
  'timerApp.version.interpolate-filter',
  'timerApp.version.version-directive'
])

.value('version', '0.1');
