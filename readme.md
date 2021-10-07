# Perf matters


Start a new run
Thu Oct 07 2021 21:12:54 GMT+0000 (Coordinated Universal Time)








## For https://stagepcna.znodedev.com/en-us: 


Total load time is 26.729 seconds


94% of CSS is unused, 13 total stylesheets


70% of JS is unused


End of report for https://stagepcna.znodedev.com/en-us




## For https://stagepcna.znodedev.com/en-ca: 


Total load time is 5.081 seconds


94% of CSS is unused, 13 total stylesheets


68% of JS is unused


End of report for https://stagepcna.znodedev.com/en-ca
{
  error: ErrorEvent {
    target: WebSocket {
      _events: [Object: null prototype],
      _eventsCount: 2,
      _maxListeners: 1000,
      readyState: 3,
      protocol: '',
      _binaryType: 'nodebuffer',
      _closeFrameReceived: false,
      _closeFrameSent: false,
      _closeMessage: '',
      _closeTimer: null,
      _closeCode: 1006,
      _extensions: {},
      _receiver: null,
      _sender: null,
      _socket: null,
      _isServer: false,
      _redirects: 0,
      url: 'ws://127.0.0.1:36785/devtools/browser/751cda4d-4588-4316-86c5-da5739506099',
      _req: null,
      [Symbol(kCapture)]: false
    },
    type: 'error',
    message: 'socket hang up',
    error: Error: socket hang up
        at connResetException (internal/errors.js:639:14)
        at Socket.socketOnEnd (_http_client.js:499:23)
        at Socket.emit (events.js:412:35)
        at endReadableNT (internal/streams/readable.js:1334:12)
        at processTicksAndRejections (internal/process/task_queues.js:82:21) {
      code: 'ECONNRESET'
    }
  }
}




