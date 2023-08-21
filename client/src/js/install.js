const buttonInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  window.deferredPrompt = event;
});

buttonInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    return;
  }

  // Show the install prompt
  promptEvent.prompt();

  // Wait for the user to respond to the prompt
  const choiceResult = await promptEvent.userChoice;

  if (choiceResult.outcome === 'accepted') {
    console.log('User accepted the install prompt');
  } else {
    console.log('User dismissed the install prompt');
  }
});

window.addEventListener('appinstalled', (event) => {
  console.log('App was installed', event);

  // Hide the install button
  buttonInstall.classList.add('hidden');

  // Clear the deferredPrompt so it can be garbage collected
  window.deferredPrompt = null;
});
