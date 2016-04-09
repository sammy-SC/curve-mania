'use strict';

var game = null;


/**
 * Main entry point. This is not meant to be compiled so suppressing missing
 * goog.require checks.
 */
var initialize = function() {
  var castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
  var appConfig = new cast.receiver.CastReceiverManager.Config();

  appConfig.statusText = 'Starcast';
  // In production, use the default maxInactivity instead of using this.
  appConfig.maxInactivity = 6000;

  // Create the game before starting castReceiverManager to make sure any extra
  // cast namespaces can be set up.
  /** @suppress {missingRequire} */
  var gameConfig = new cast.receiver.games.GameManagerConfig();
  gameConfig.applicationName = 'Starcast';
  /** @suppress {missingRequire} */
  var gameManager = new cast.receiver.games.GameManager(gameConfig);
  /** @suppress {missingRequire} */
  game = new cast.games.starcast.StarcastGame(gameManager);

  var startGame = function() {
    game.run(function() {
      console.log('Game running.');
      gameManager.updateGameStatusText('Game running.');
    });
  };

  castReceiverManager.onReady = function(event) {
    if (document.readyState === 'complete') {
      startGame();
    } else {
      window.onload = startGame;
    }
  };
  castReceiverManager.start(appConfig);
};

if (document.readyState === 'complete') {
  initialize();
} else {
  /** Main entry point. */
  window.onload = initialize;
}
