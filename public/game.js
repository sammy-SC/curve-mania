'use strict';

var gameManager = null;

function start() {
    gameManager.debugUi.open()
    gameManager.addEventListener(
        cast.receiver.games.EventType.PLAYER_AVAILABLE,
        function(event) {
            console.log('===================')
            console.log(event)
            console.log('===================')
        }
    )
}

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
  gameManager = new cast.receiver.games.GameManager(gameConfig);

  var startGame = function() {
      start()
      console.log('Game running.');
      gameManager.updateGameStatusText('Game running.');
  };

  castReceiverManager.onReady = function(event) {
    if (document.readyState === 'complete') {
      console.log('Starting game.');
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

var debugUi = new cast.receiver.games.debug.DebugUI(gameManager);
