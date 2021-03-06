const puppeteer = require('puppeteer')
const calcCss = require('./calcCss.js')

const addresses = [
  'https://coloradoquiz.web.app/quiz/us-geography',
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
  'https://dev-waitinglist.pantheonsite.io',
  'https://stagepcna.znodedev.com/en-us',
  'https://stagepcna.znodedev.com/en-ca',
  'https://stagepcna.znodedev.com/en-us/bags/backpacks',
  'https://stagepcna.znodedev.com/en-ca/bags/backpacks',
  'https://stagepcna.znodedev.com/en-us/drinkware/tumblers',
  'https://stagepcna.znodedev.com/en-ca/drinkware/tumblers',
  'https://stagepcna.znodedev.com/en-us/technology/headphones-earbuds',
  'https://stagepcna.znodedev.com/en-ca/technology/headphones-earbuds',
  'https://stagepcna.znodedev.com/en-us/outdoor-sport/outdoor-blankets',
  'https://stagepcna.znodedev.com/en-ca/outdoor-sport/outdoor-blankets',
  'https://stagepcna.znodedev.com/en-us/apparel/hoodies-sweatshirts',
  'https://stagepcna.znodedev.com/en-ca/apparel/hoodies-sweatshirts',
  'https://stagepcna.znodedev.com/en-us/product/welly-tumbler-traveler-bundle-set-1629-12',
  'https://stagepcna.znodedev.com/en-ca/product/welly-tumbler-traveler-bundle-set-1629-12',
  'https://stagepcna.znodedev.com/en-us/product/denon-ah-gc30-bluetooth-anc-headphones-7197-31',
  'https://stagepcna.znodedev.com/en-ca/product/denon-ah-gc30-bluetooth-anc-headphones-7197-31',
  'https://stagepcna.znodedev.com/en-us/product/high-sierra-roll-up-puffy-sherpa-blanket-8052-84',
  'https://stagepcna.znodedev.com/en-ca/product/high-sierra-roll-up-puffy-sherpa-blanket-8052-84',
  'https://stagepcna.znodedev.com/en-us/product/womens-copperbay-roots73-fz-hoody-tm98734',
  'https://stagepcna.znodedev.com/en-ca/product/womens-copperbay-roots73-fz-hoody-tm98734',
  'https://stagepcna.znodedev.com/tools-services/customizable-ecatalogs',
  'https://stagepcna.znodedev.com/tools-services/build-your-own-flyers',
  'https://stagepcna.znodedev.com/en-us/tools-services/custom-websites',
  'https://www.pcnaopportunities.com/',
  'https://stagepcna.znodedev.com/en-us/how-to-order/leeds',
  'https://stagepcna.znodedev.com/blog',
  'https://stagepcna.znodedev.com/en-us/tools-services/why-pcna',
  'https://stagepcna.znodedev.com/en-ca/tools-services/why-pcna',
  'https://stagepcna.znodedev.com/en-us/tools-services/electronic-integration',
  'https://stagepcna.znodedev.com/en-ca/tools-services/electronic-integration',
  'https://stagepcna.znodedev.com/en-us/tools-services/worldsource-custom-sourcing',
  'https://stagepcna.znodedev.com/en-ca/tools-services/worldsource-custom-sourcing',
  'https://stagepcna.znodedev.com/en-us/tools-services/perfectly-packaged',
  'https://stagepcna.znodedev.com/en-ca/tools-services/perfectly-packaged',
  'https://stagepcna.znodedev.com/en-us/brand/leeds/shop-all',
  'https://stagepcna.znodedev.com/en-ca/brand/leeds/shop-all',
  'https://stagepcna.znodedev.com/en-us/brand/bullet/shop-all',
  'https://stagepcna.znodedev.com/en-ca/brand/bullet/shop-all',
  'https://stagepcna.znodedev.com/en-us/brand/bullet/shop-all',
  'https://stagepcna.znodedev.com/en-us/brand/trimark/shop-all',
  'https://stagepcna.znodedev.com/en-ca/brand/trimark/shop-all',
  'https://www.journalbooks.com/',
  'https://etsexpress.com/pg_home/',
  'https://stagepcna.znodedev.com/en-us/brand/herschel',
  'https://stagepcna.znodedev.com/en-us/brand/skullcandy',
  'https://stagepcna.znodedev.com/en-us/brand/roots-73',
  'https://stagepcna.znodedev.com/en-us/brand/camelbak',
  'https://stagepcna.znodedev.com/en-us/brand/arctic-zone',
  'https://stagepcna.znodedev.com/en-us/brand/moop/shop-all',
  'https://stagepcna.znodedev.com/en-us/brand/rocketbook/shop-all',
  'https://stagepcna.znodedev.com/en-us/new-products',
  'https://stagepcna.znodedev.com/en-us/clearance-products',
  'https://stagepcna.znodedev.com/en-us/deals',
  'https://stagepcna.znodedev.com/en-us/request-samples/leeds',
  'https://stagepcna.znodedev.com/en-us/how-to-order/leeds',
  'https://stagepcna.znodedev.com/en-us/fulfillment-shipping/leeds',
  'https://stagepcna.znodedev.com/en-us/returns-cancellations/leeds',
  'https://stagepcna.znodedev.com/en-us/how-to-order/leeds',
  'https://stagepcna.znodedev.com/en-us/user/sign-up',
  'https://stagepcna.znodedev.com/en-us/site-map',
  'https://stagepcna.znodedev.com/en-us/about',
  'https://stagepcna.znodedev.com/brand/list',
  'https://stagepcna.znodedev.com/en-us/careers',
  'http://www.polyconcept.com/',
  'https://stagepcna.znodedev.com/en-us/compliance',
  'https://www.pfconcept.com/en_nl/',
  'https://stagepcna.znodedev.com/en-us/product-recalls',
  'https://stagepcna.znodedev.com/en-us/privacy-policy',
  'https://stagepcna.znodedev.com/en-us/legal'
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

console.log(`# Perf matters`)
console.log('\r\n')
console.log(`Start a new run`)
console.log(`${new Date()}`)
console.log('\r\n')
console.log('\r\n')


addresses.forEach(address => {
  getPageMetrics(address)
});
