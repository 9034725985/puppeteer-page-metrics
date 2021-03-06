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
  try {
    const args = [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--blink-settings=imagesEnabled=true",
    ]

    const options = {
      args,
      headless: true,
      ignoreHTTPSErrors: true
    }

    const browser = await puppeteer.launch(options)
    const page = await browser.newPage()
    await page.setViewport({
      width: 1920,
      height: 1080
    })
    await page._client.send('DOM.enable')
    await page._client.send('CSS.enable')
    await page._client.send('CSS.startRuleUsageTracking')
    await page._client.send('Performance.enable')

    const stylesheets = []
    page._client.on('CSS.styleSheetAdded', s => stylesheets.push(s.header))

    const start_time = new Date()
    await page.goto(urlstring)
    const end_time = new Date()

    // console.log({ start_time })
    // console.log({ end_time })
    // console.log({ total_time: end_time - start_time })

    const response = await page._client.send('Performance.getMetrics')
    const JSUsedSize = response.metrics.find(x => x.name === 'JSHeapUsedSize').value
    const JSTotalSize = response.metrics.find(x => x.name === 'JSHeapTotalSize').value
    const unusedJS = Math.round((JSUsedSize / JSTotalSize) * 100)
    // const perf = await page.evaluate(_ => ({
    //   firstPaint:
    //     chrome.loadTimes().firstPaintTime * 1000 -
    //     performance.timing.navigationStart
    // }))

    const { ruleUsage } = await page._client.send('CSS.stopRuleUsageTracking')

    const unusedCSS = calcCss.unusedCss(stylesheets, ruleUsage)
    console.log('\r\n')
    console.log('\r\n')
    console.log(`## For ${urlstring}: `)
    // console.log(response)
    // console.log(`The page's first paint time is ${perf.firstPaint}ms`)
    console.log('\r\n')
    console.log(`Total load time is ${ (end_time - start_time) / 1000} seconds`)
    console.log('\r\n')
    console.log(
      `${unusedCSS}% of CSS is unused, ${stylesheets.length
      } total stylesheets`
    )
    console.log('\r\n')
    console.log(`${unusedJS}% of JS is unused`)
    console.log('\r\n')
    console.log(`End of report for ${urlstring}`)
    await browser.close()
  } catch (error) {
    console.log({ error })
    console.log('\r\n')
    console.log('\r\n')
  }
}

console.log(`# Start a new run for all files`)
console.log(`${new Date()}`)
console.log('\r\n')

addresses.forEach(address => {
  getPageMetrics(address)
});

console.log('\r\n')
console.log('\r\n')

console.log(`# End of run`)
console.log(`${new Date()}`)