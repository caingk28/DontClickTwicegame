export const playSound = (soundName) => {
  const audio = new Audio(`${window.location.origin}/sounds/${soundName}.mp3`);
  audio.play()
    .then(() => console.log(`Playing ${soundName} sound`))
    .catch(error => {
      console.error('Error playing sound:', error);
      console.log('Audio src:', audio.src);
    });
};