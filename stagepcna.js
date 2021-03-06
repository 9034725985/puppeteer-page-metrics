const puppeteer = require('puppeteer')
const calcCss = require('./calcCss.js')
const max_listeners = require('events').EventEmitter.prototype._maxListeners = 1000;

const addresses = [
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
  'https://stagepcna.znodedev.com/en-us/compliance',
  'https://stagepcna.znodedev.com/en-us/product-recalls',
  'https://stagepcna.znodedev.com/en-us/privacy-policy',
  'https://stagepcna.znodedev.com/en-us/legal',

  'https://stagepcna.znodedev.com/en-us/apparel',
  'https://stagepcna.znodedev.com/en-us/bags',
  'https://stagepcna.znodedev.com/en-us/drinkware',
  'https://stagepcna.znodedev.com/en-us/health-beauty',
  'https://stagepcna.znodedev.com/en-us/home-diy',
  'https://stagepcna.znodedev.com/en-us/office',
  'https://stagepcna.znodedev.com/en-us/outdoor-sport',
  'https://stagepcna.znodedev.com/en-us/technology',
  'https://stagepcna.znodedev.com/en-us/eco-friendly',

  'https://stagepcna.znodedev.com/en-us/apparel/apparel-accessories',
  'https://stagepcna.znodedev.com/en-us/apparel/face-coverings',
  'https://stagepcna.znodedev.com/en-us/apparel/headwear',
  'https://stagepcna.znodedev.com/en-us/apparel/hoodies-sweatshirts',
  'https://stagepcna.znodedev.com/en-us/apparel/jackets-vests',
  'https://stagepcna.znodedev.com/en-us/apparel/polos',
  'https://stagepcna.znodedev.com/en-us/apparel/shirts',
  'https://stagepcna.znodedev.com/en-us/apparel/sweaters',
  'https://stagepcna.znodedev.com/en-us/apparel/t-shirts',

  'https://stagepcna.znodedev.com/en-us/product/skullcandy-crusher-evo-bluetooth-headphones-7196-15',
  'https://stagepcna.znodedev.com/en-ca/product/skullcandy-crusher-evo-bluetooth-headphones-7196-15',

  'https://stagepcna.znodedev.com/en-us/product/u-wallace-roots73-knit-scarf-tm45129',
  'https://stagepcna.znodedev.com/en-us/product/unisex-kyes-eco-winter-snood-tm45140',
  'https://stagepcna.znodedev.com/en-us/product/u-shelty-roots73-knit-toque-tm36108',
  'https://stagepcna.znodedev.com/en-us/product/womens-copperbay-roots73-fz-hoody-tm98734',
  'https://stagepcna.znodedev.com/en-us/product/womens-bridgewater-roots73-insulated-jacket-tm99411',
  'https://stagepcna.znodedev.com/en-us/product/mens-antero-short-sleeve-polo-knit-light-tm16703',
  'https://stagepcna.znodedev.com/en-us/product/womens-sprucelake-roots73-long-sleeve-shirt-tm97603',
  'https://stagepcna.znodedev.com/en-us/product/womens-equinox-knit-blazer-tm98613',
  'https://stagepcna.znodedev.com/en-us/product/womens-riverrock-roots73-henley-tm97811',

  'https://stagepcna.znodedev.com/en-us/product/elevate-soleil-backpack-10000-mah-power-bank-1975-22',
  'https://stagepcna.znodedev.com/en-us/product/premium-work-from-home-essentials-7700-07',
  'https://stagepcna.znodedev.com/en-us/product/kenneth-cole-colombian-leather-computer-messenger-9950-34',
  'https://stagepcna.znodedev.com/en-us/product/arctic-zone-titan-deep-freeze-rolling-cooler-3860-58',
  'https://stagepcna.znodedev.com/en-us/product/field-co-campster-drawstring-rucksack-7950-25',
  'https://stagepcna.znodedev.com/en-us/product/kenneth-cole-colombian-leather-22-duffel-9950-30',
  'https://stagepcna.znodedev.com/en-us/product/carhartt-signature-fanny-pack-1889-62',
  'https://stagepcna.znodedev.com/en-us/product/thule-subterra-carry-on-22-luggage-9020-55',
  'https://stagepcna.znodedev.com/en-us/product/moop-porter-tote-9005-22',
  'https://stagepcna.znodedev.com/en-us/product/herschel-travel-daypack-20l-2009-15',

  'https://stagepcna.znodedev.com/en-us/product/downtown-sling-backpack-sm-7591',
  'https://stagepcna.znodedev.com/en-us/product/basic-work-from-home-essentials-kit-7700-04',
  'https://stagepcna.znodedev.com/en-us/product/rhythm-non-woven-messenger-bag-sm-7349',
  'https://stagepcna.znodedev.com/en-us/product/261464',
  'https://stagepcna.znodedev.com/en-us/product/crossweave-heat-sealed-drawstring-bag-sm-5892',
  'https://stagepcna.znodedev.com/en-us/product/merchant-craft-sawyer-18-duffel-3750-30',
  'https://stagepcna.znodedev.com/en-us/product/hipster-budget-fanny-pack-sm-7102',
  'https://stagepcna.znodedev.com/en-us/product/taggy-luggage-tag-sm-2393',
  'https://stagepcna.znodedev.com/en-us/product/beach-towel-clips-sm-7689'
]

async function getPageMetrics() {
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

    console.log(`# Perf matters`)
    console.log('\r\n')
    console.log(`Start a new run`)
    console.log(`${new Date()}`)
    console.log('\r\n')
    console.log('\r\n')

    const run_start_time = new Date()

    for (const address of addresses) {
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
      const goto = await page.goto(address, {
        waitUntil: 'networkidle2',
        timeout: 0
      });
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
      console.log(`## For ${address}: `)
      // console.log(response)
      // console.log(`The page's first paint time is ${perf.firstPaint}ms`)
      console.log('\r\n')
      console.log(`Total load time is ${(end_time - start_time) / 1000} seconds`)
      console.log('\r\n')
      console.log(
        `${unusedCSS}% of CSS is unused, ${stylesheets.length
        } total stylesheets`
      )
      console.log('\r\n')
      console.log(`${unusedJS}% of JS is unused`)
      console.log('\r\n')
      console.log(`End of report for ${address}`)
      await browser.close()
    }

    const run_end_time = new Date()

    console.log('\r\n')
    console.log(`End of run`)
    console.log('\r\n')
    const run_time = Math.round((run_end_time - run_start_time) / (60 * 1000)).toFixed(2);
    console.log(`The whole thing took about ${run_time} minutes.`)
    console.log(`${ new Date() } `)
    console.log('\r\n')
    console.log('\r\n')

  } catch (error) {
    console.log({ error })
    console.log('\r\n')
    console.log('\r\n')
  }
}

getPageMetrics();
