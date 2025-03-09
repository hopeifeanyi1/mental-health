//worker-registeration.js
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js')
        .then(function(registration) {
          console.log('Service Worker registration successful with scope: ', registration.scope);
        })
        .catch(function(err) {
          console.log('Service Worker registration failed: ', err);
        });
    });
  }