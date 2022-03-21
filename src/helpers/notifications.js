export default {
    playNotificationSound(soundConfig) {
        var sound;
        switch (soundConfig) {
          case "pop":
            sound = new Audio("sounds/pop-alert-notification.mp3");
            break;
          case "positive":
            sound = new Audio("sounds/positive-notification.wav");
            break;
          case "bell":
            sound = new Audio("sounds/small-bell-notification.wav");
            break;
          case "water":
            sound = new Audio("sounds/water-notification.mp3");
            break;
          case "metal":
            sound = new Audio("sounds/metal-gear-notification.mp3");
            break;
          case "none":
            return;
        }
        sound.play();
    }
}