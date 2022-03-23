export default {
  createNotification() {

  },
  playNotificationSound(soundConfig) {
    var sound;
    switch (soundConfig) {
      case "pop":
        sound = new Audio("sounds/pop-alert.ogg");
        break;
      case "positive":
        sound = new Audio("sounds/positive.ogg");
        break;
      case "bell":
        sound = new Audio("sounds/loud-bell.ogg");
        break;
      case "soft":
        sound = new Audio("sounds/soft.ogg");
        break;
      case "tiny":
        sound = new Audio("sounds/tiny.ogg");
        break;
      case "piano":
        sound = new Audio("sounds/piano.ogg");
        break;
      case "soft-bell":
        sound = new Audio("sounds/soft-bell.ogg");
        break;
      case "metal":
        sound = new Audio("sounds/metal-gear.ogg");
        break;
      case "none":
        return;
    }
    sound.addEventListener("canplaythrough", () => {
      sound.play(); // the audio now can be played
    });

  }
}