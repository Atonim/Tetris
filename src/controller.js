export default class Controller {
  constructor(game, view, music) {
    this.music = music;
    this.game = game;
    this.view = view;
    this.isPlaying = false;
    this.intervalId = null;
    //this.inMenu = true;

    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));

    this.view.renderStartScreen();
  }

  update() {
    console.log('salam');
    this.game.movePieceDown();
    this.updateView();
  }

  pause() {
    this.isPlaying = false;
    this.stopTimer();
    this.updateView();
  }

  play() {
    //this.inMenu = false;
    this.isPlaying = true;
    this.music.play();
    this.startTimer();
    this.updateView();
  }

  reset() {
    this.game.reset();
    this.play();
  }

  updateView() {
    const state = this.game.getState();

    if (state.isGameOver) {
      this.view.renderEndScreen(state);
    }
    else if (!this.isPlaying) {
      this.view.renderPauseScreen();
    } else {
      this.view.renderMainScreen(this.game.getState());
    }

  }
  startTimer() {

    const speed = 1000 - this.game.getState().level * 100;

    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.update();
      }, speed > 0 ? speed : 100);
    }

  }

  stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  handleKeyDown(event) {
    const state = this.game.getState();
    switch (event.key) {
      case "Enter":
        if (state.isGameOver) {
          this.reset();
        }
        else if (this.isPlaying) {
          this.pause();
        }
        else {
          this.play();
        }
        break;
      case "ArrowLeft":
        if (this.isPlaying) {
          this.game.movePieceLeft();
          this.updateView();
        }
        break;
      case "ArrowUp":
        if (this.isPlaying) {
          this.game.rotatePiece();
          this.updateView();
        }

        break;
      case "ArrowRight":
        if (this.isPlaying) {
          this.game.movePieceRight();
          this.updateView();
        }
        break;
      case "ArrowDown":
        if (this.isPlaying) {
          console.log('opapa');
          this.stopTimer();
          this.game.movePieceDown();
          this.updateView();
        }
        break;
    }
  }

  handleKeyUp(event) {
    switch (event.key) {
      case "ArrowDown":
        if (this.isPlaying) {
          this.startTimer();
        }

        break;
    }
  }
}