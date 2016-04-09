var appConfig = new cast.receiver.CastReceiverManager.Config();

appConfig.statusText = 'Ready to play';
appConfig.maxInactivity = 6000;

window.castReceiverManager.start(appConfig);

window.castReceiverManager.onSenderDisconnected = function(event) {
  if(window.castReceiverManager.getSenders().length == 0 &&
    event.reason == cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER) {
      window.close();
  }
}
