const puppeteer = require('puppeteer')
const calcCss = require('./calcCss.js')

const getPageMetrics = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page._client.send('Page.enable')
  await page._client.send('DOM.enable')
  await page._client.send('CSS.enable')

  await page._client.send('CSS.startRuleUsageTracking')

  const stylesheets = []
  page._client.on('CSS.styleSheetAdded', s => stylesheets.push(s.header))

  await page.goto('https://www.google.com/')

  const { ruleUsage } = await page._client.send('CSS.stopRuleUsageTracking')

  const unusedCSS = calcCss.unusedCss(stylesheets, ruleUsage)

  console.log(
    `${unusedCSS}% of your CSS is unused, ${
      stylesheets.length
    } total stylesheets`
  )
  await browser.close()
}

getPageMetrics()