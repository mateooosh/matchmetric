if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/matchmetric/sw.js', { scope: '/matchmetric/' })})}