exports.unusedCss = (stylesheets, ruleUsage) => {
  let usedLength = 0
  let totalLength = 0
  stylesheets.forEach(stylesheet => {
    totalLength += stylesheet.length
    usedLength += calcUsedLength(ruleUsage, stylesheet)
  })
  return 100 - Math.round(usedLength / totalLength * 100)
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
