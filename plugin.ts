function clone(val) {
  return JSON.parse(JSON.stringify(val))
}

function getLightnessOfRGB(r, g, b) {

  const highest = Math.max(r, g, b);
  const lowest = Math.min(r, g, b);

  return (highest + lowest) / 2 / 255;
}

figma.currentPage.findAll().map(n => {
  if (!n || !n.fills || !n.fills[0]) return null;

  const fills = clone(n.fills);
  const fill = fills[0];
  if (n.fills[0].type === "IMAGE") {
    const grayVal = getLightnessOfRGB(fill.color.r * 255, fill.color.g * 255, fill.color.b * 255);
    fill.color.r = grayVal
    fill.color.g = grayVal
    fill.color.b = grayVal
    n.fills = fills
  }
  if (n.fills[0].type === "SOLID") {
    fill.filters.saturation = -1
    n.fills = fills
  }

})

figma.closePlugin()