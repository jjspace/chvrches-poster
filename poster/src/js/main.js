(function main() {
  // basically wait until the DOM is loaded

  const sample = document.querySelector('#audio-sample');
  sample.volume = 0.3;

  sample.addEventListener('play', () => {
    document.querySelector('#circles').classList.add('active');

    document.querySelector('.audio-controls').classList.add('playing');
    document.querySelector('#mute').classList.add('hidden');
    document.querySelector('#sound').classList.remove('hidden');
  });

  sample.addEventListener('pause', (e) => {
    e.target.currentTime = 0;
    document.querySelector('#circles').classList.remove('active');
    document.querySelector('.audio-controls').classList.remove('playing');
    document.querySelector('#mute').classList.remove('hidden');
    document.querySelector('#sound').classList.add('hidden');
  });

  sample.addEventListener('volumechange', (e) => {
    // update volume slider
    const audio = e.target;
    document.querySelector('#vol-slider').style = `--vol-level: ${audio.volume};`;
  });

  function playAudio() {
    sample.play();
  }

  function stopAudio() {
    sample.pause();
  }

  function toggleAudio() {
    if (sample.paused) {
      sample.play();
    }
    else {
      sample.pause();
    }
  }

  function changeVol(audio, value) {
    let newVol = audio.volume + value;
    if (newVol > 1) {
      newVol = 1;
    }
    if (newVol < 0) {
      newVol = 0;
    }
    // Round sound to two decimal points
    audio.volume = Math.round(newVol * 100) / 100; // eslint-disable-line no-param-reassign
  }

  const muteBtn = document.querySelector('#mute');
  const soundBtn = document.querySelector('#sound');
  muteBtn.addEventListener('click', playAudio);
  soundBtn.addEventListener('click', stopAudio);
  const circles = document.querySelector('#circles');
  circles.addEventListener('click', toggleAudio);

  document.querySelector('#vol-up').addEventListener('click', () => {
    changeVol(sample, 0.1);
  });
  document.querySelector('#vol-down').addEventListener('click', () => {
    changeVol(sample, -0.1);
  });
}());
