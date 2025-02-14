// Check if service workers are supported
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').then(
      function () {
        console.log('ServiceWorker registration successful');
      },
      function (err) {
        console.log('ServiceWorker registration failed: ', err);
      }
    );
  });
} 