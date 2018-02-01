exports.unusedCss = (stylesheets, ruleUsage) => {
  let usedCSS = 0
  let totalCSS = 0
  stylesheets.forEach(stylesheet => {
    totalCSS += stylesheet.length
    usedCSS += calcUsedLength(ruleUsage, stylesheet)
  })
  return 100 - Math.round(usedCSS / totalCSS * 100)
}

const calcUsedLength = (ruleUsage, stylesheet) => {
  const stylesheetRuleUsages = ruleUsage.filter(
    y => y.styleSheetId === stylesheet.styleSheetId
  )

  return stylesheetRuleUsages.reduce(
    (sum, x) => sum + x.endOffset - x.startOffset,
    0
  )
}
