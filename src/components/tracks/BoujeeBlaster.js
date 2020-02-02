import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import p5 from 'p5';
import 'p5/lib/addons/p5.sound';

const sketch = (p) => {
  let audio; // allocate space for audio
  let fft; // allocate space for frequency analysis

  /**
   * CALCULATION CACHEING
   */
  // Set phase length to window diagonal, so rotating line won't fall short
  const phaseLength = p.dist(0, 0, p.windowHeight, p.windowWidth);
  const vCenter = p.windowHeight / 2; // Vertical center of line in space
  const hCenter = phaseLength / 2; // Horizontal center on line
  // Util for center transform
  const screenCenter = [ p.windowWidth / 2, p.windowHeight / 2 ];
  // consts for offsetting each spectrum band
  const bands = [
    phaseLength * 0.2,
    phaseLength * 0.4,
    phaseLength * 0.6,
    phaseLength * 0.8,
    phaseLength,
  ];

  /**
   * VISUALIZATION PARAMS
   */
  const speedFactor = 0.5; // Larger values appear to move faster
  const bandWidth = 50; // Width of each drawn shape

  // maps amplitude values to fit in vertical screen space
  const mapToScreen = (val) => (p.map(val, 0, 256, 0, vCenter));

  // given one of the frequency bands & a level, draw a shape
  const drawBand = ({ band, level }) => {
    const center = ((band + (p.millis() * speedFactor)) % phaseLength) - hCenter;
    const adjustedLevel = mapToScreen(level);
    const [hi, lo] = [adjustedLevel, -adjustedLevel];
    const [left, right] = [center - bandWidth, center + bandWidth];
    p.quad(left, 0, center, hi, right, 0, center, lo);
  }

  // Center head, rotate per track time, draw all 5 spectrum bands
  const visualize = (levels) => {
    p.background(0, 0, 15, 0.05);
    p.push();
    p.translate(...screenCenter);
    p.rotate(p.map(audio.currentTime(), 0, audio.duration(), 0, 360));
    drawBand({ band: bands[0], level: levels[0] });
    drawBand({ band: bands[1], level: levels[1] });
    drawBand({ band: bands[2], level: levels[2] });
    drawBand({ band: bands[3], level: levels[3] });
    drawBand({ band: bands[4], level: levels[4] });
    p.pop();
  }

  /**
   * P5 FUNCTIONS
   */ 
  p.preload = () => {
    // before doing anything else, load the track
    audio = p.loadSound(process.env.PUBLIC_URL + '/assets/BoujeeBlaster.mp3');
  };

  p.setup = () => {
    // General setup
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.angleMode(p.DEGREES);
    p.colorMode(p.HSL);
    p.background(0, 0, 15);
    p.stroke(0, 100, 50, 0.5);
    p.fill(0, 0, 0, 0.5);
    p.strokeWeight(5);
    p.strokeCap(p.ROUND);
    p.strokeJoin(p.ROUND);

    // Set audio to restart, so new triggers restart, rather than stacking
    audio.playMode('restart');
    // Begin playback
    audio.play();
    // init Frequency analysis
    fft = new p5.FFT();
    // set frequencly analyzer to watch track
    fft.setInput(audio);

    p.userStartAudio()
  };
  
  p.draw = () => {
    // begin analysis, needed for .getEnergy() below
    fft.analyze();
    const levels = [];
    // load data from all 5 hardcoded frequency bands
    levels.push(fft.getEnergy('bass'));
    levels.push(fft.getEnergy('lowMid'));
    levels.push(fft.getEnergy('mid'));
    levels.push(fft.getEnergy('highMid'));
    levels.push(fft.getEnergy('treble'));
    // begin visualization
    visualize(levels);
  };

  // on mouseclick, play/pause
  p.mouseClicked = () => {
    if (p.getAudioContext().state !== 'running') {
      p.getAudioContext().resume();
    }
    if (audio.isPlaying()) {
      audio.pause();
    } else {
      audio.play();
    }
    p.background(0, 0, 15);
  };

  // on doubleclick, stop
  p.doubleClicked = () => {
    audio.stop();
  };
};

const BoujeeBlaster = () => (
  <P5Wrapper sketch={sketch} />
);

export default BoujeeBlaster;
