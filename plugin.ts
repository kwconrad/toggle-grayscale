function clone(val) {
  return JSON.parse(JSON.stringify(val))
}

function getLightnessOfRGB(r, g, b) {

  const highest = Math.max(r, g, b);
  const lowest = Math.min(r, g, b);

  return (highest + lowest) / 2 / 255;
}

figma.currentPage.findAll().map(n => {
  if (!!n && !!n.fills[0] && n.fills[0].type === "SOLID") {
    const fills = clone(n.fills);
    const originalFills = fills
    const fill = fills[0];
    const grayVal = getLightnessOfRGB(fill.color.r * 255, fill.color.g * 255, fill.color.b * 255);
    fill.color.r = grayVal
    fill.color.g = grayVal
    fill.color.b = grayVal
    n.fills = fills
  }

  if (!!n && !!n.fills[0] && n.fills[0].type === "IMAGE") {
    const fills = clone(n.fills);
    const fill = fills[0];
    fill.filters.saturation = -1
    n.fills = fills
  }
})

figma.closePlugin()