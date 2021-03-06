const puppeteer = require('puppeteer')
const calcCss = require('./calcCss.js')

const addresses = [
  'https://broncos.neocities.org',
  'https://live-wisconsin.pantheonsite.io',
  'https://dev-kentucky.pantheonsite.io',
  'https://dev-presenter.pantheonsite.io',
  'https://dev-oregon.pantheonsite.io',
  'https://dev-idahodeveloper.pantheonsite.io',
  'https://dev-bang.pantheonsite.io',
  'https://dev-usa.pantheonsite.io',
  'https://live-bang.pantheonsite.io',
  'https://dev-deutschland.pantheonsite.io',
  'https://dev-election2020.pantheonsite.io',
  'https://dev-indecision.pantheonsite.io',
  'https://dev-europeanunion.pantheonsite.io',
  'https://dev-iowa.pantheonsite.io',
  'https://test-europeanunion.pantheonsite.io',
  'https://test-iowa.pantheonsite.io',
  'https://live-europeanunion.pantheonsite.io',
  'https://live-iowa.pantheonsite.io',
  'https://dev-official.pantheonsite.io',
  'https://dev-portland.pantheonsite.io',
  'https://dev-meeting.pantheonsite.io',
  'https://dev-serious.pantheonsite.io',
  'https://dev-nevada.pantheonsite.io',
  'https://dev-utah.pantheonsite.io',
  'https://dev-colorado.pantheonsite.io',
  'https://dev-queenslibrary.pantheonsite.io',
  'https://dev-newjersey.pantheonsite.io',
  'https://dev-subaru.pantheonsite.io',
  'https://dev-boise.pantheonsite.io',
  'https://dev-visitboise.pantheonsite.io',
  'https://dev-waitinglist.pantheonsite.io'
]

async function getPageMetrics(urlstring) {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page._client.send('DOM.enable')
  await page._client.send('CSS.enable')
  await page._client.send('CSS.startRuleUsageTracking')
  await page._client.send('Performance.enable')

  const stylesheets = []
  page._client.on('CSS.styleSheetAdded', s => stylesheets.push(s.header))

  await page.goto(urlstring)
  const response = await page._client.send('Performance.getMetrics')
  const JSUsedSize = response.metrics.find(x => x.name === 'JSHeapUsedSize').value
  const JSTotalSize = response.metrics.find(x => x.name === 'JSHeapTotalSize').value
  const unusedJS = Math.round((JSUsedSize / JSTotalSize) * 100)
  const perf = await page.evaluate(_ => ({
    firstPaint:
      chrome.loadTimes().firstPaintTime * 1000 -
      performance.timing.navigationStart
  }))

  const { ruleUsage } = await page._client.send('CSS.stopRuleUsageTracking')

  const unusedCSS = calcCss.unusedCss(stylesheets, ruleUsage)
  console.log(`For ${urlstring}: `)
  // console.log(response)
  console.log(`The page's first paint time is ${perf.firstPaint}ms`)
  console.log(
    `${unusedCSS}% of CSS is unused, ${stylesheets.length
    } total stylesheets`
  )
  console.log(`${unusedJS}% of JS is unused`)
  console.log(`End of report for ${urlstring}`)
  await browser.close()
}

addresses.forEach(address => {
  getPageMetrics(address)
});
