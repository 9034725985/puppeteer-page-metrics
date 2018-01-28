const puppeteer = require('puppeteer')
const calcCss = require('./calcCss.js')

const getPageMetrics = async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page._client.send('Page.enable')
  await page._client.send('DOM.enable')
  await page._client.send('CSS.enable')
  await page._client.send('CSS.startRuleUsageTracking')
  await page._client.send('Performance.enable');

  const stylesheets = []
  page._client.on('CSS.styleSheetAdded', s => stylesheets.push(s.header))

  await page.goto('https://www.google.com/')
  const { metrics } = await page._client.send('Performance.getMetrics')
  const JSUsedSize = metrics.find(x => x.name === 'JSHeapUsedSize').value
  const JSTotalSize = metrics.find(x => x.name === 'JSHeapTotalSize').value
  const unusedJS = Math.round((JSUsedSize / JSTotalSize) * 100)
  const perf = await page.evaluate(_ => ({
    firstPaint:
      chrome.loadTimes().firstPaintTime * 1000 -
      performance.timing.navigationStart
  }))

  const { ruleUsage } = await page._client.send('CSS.stopRuleUsageTracking')

  const unusedCSS = calcCss.unusedCss(stylesheets, ruleUsage)

  console.log(`The page's first paint time is ${perf.firstPaint}ms`)
  console.log(
    `${unusedCSS}% of CSS is unused, ${
      stylesheets.length
    } total stylesheets`
  )
  console.log(`${unusedJS}% of JS is unused`)
  await browser.close()
}

getPageMetrics()
