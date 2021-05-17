# Perf matters


Start a new run
Mon May 17 2021 04:27:56 GMT+0000 (Coordinated Universal Time)




{
  error: Error: net::ERR_CONNECTION_RESET at https://stagepcna.znodedev.com/en-us
      at navigate (/home/runner/work/puppeteer-page-metrics/puppeteer-page-metrics/node_modules/puppeteer/lib/FrameManager.js:120:37)
      at processTicksAndRejections (internal/process/task_queues.js:93:5)
      at async FrameManager.navigateFrame (/home/runner/work/puppeteer-page-metrics/puppeteer-page-metrics/node_modules/puppeteer/lib/FrameManager.js:94:17)
      at async Frame.goto (/home/runner/work/puppeteer-page-metrics/puppeteer-page-metrics/node_modules/puppeteer/lib/FrameManager.js:406:12)
      at async Page.goto (/home/runner/work/puppeteer-page-metrics/puppeteer-page-metrics/node_modules/puppeteer/lib/Page.js:674:12)
      at async getPageMetrics (/home/runner/work/puppeteer-page-metrics/puppeteer-page-metrics/stagepcna.js:165:20)
    -- ASYNC --
      at Frame.<anonymous> (/home/runner/work/puppeteer-page-metrics/puppeteer-page-metrics/node_modules/puppeteer/lib/helper.js:111:15)
      at Page.goto (/home/runner/work/puppeteer-page-metrics/puppeteer-page-metrics/node_modules/puppeteer/lib/Page.js:674:49)
      at Page.<anonymous> (/home/runner/work/puppeteer-page-metrics/puppeteer-page-metrics/node_modules/puppeteer/lib/helper.js:112:23)
      at getPageMetrics (/home/runner/work/puppeteer-page-metrics/puppeteer-page-metrics/stagepcna.js:165:31)
      at processTicksAndRejections (internal/process/task_queues.js:93:5)
}




