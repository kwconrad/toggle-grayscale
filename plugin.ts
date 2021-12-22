function clone(val) {
  return JSON.parse(JSON.stringify(val))
}

function getLightnessOfRGB(r, g, b) {

  const highest = Math.max(r, g, b);
  const lowest = Math.min(r, g, b);

  return (highest + lowest) / 2 / 255;
}

figma.currentPage.findAll().map(n => {
  if (!n || !n.fills) return null;

  const fills = clone(n.fills);
  const fill = fills[0];

  const nodeType = fills[0].type

  if (/GRADIENT/.test(nodeType)) {
    fill.gradientStops.map(gFill => {
      const grayVal = getLightnessOfRGB(gFill.color.r * 255, gFill.color.g * 255, gFill.color.b * 255);
      gFill.color.r = grayVal;
      gFill.color.g = grayVal;
      gFill.color.b = grayVal;
    })
    n.fills = fills
  }
  if (nodeType === "SOLID") {
    const grayVal = getLightnessOfRGB(fill.color.r * 255, fill.color.g * 255, fill.color.b * 255);
    fill.color.r = grayVal;
    fill.color.g = grayVal;
    fill.color.b = grayVal;
    n.fills = fills
  }
  if (nodeType === "IMAGE") {
    fill.filters.saturation = -1;
    n.fills = fills;
  }
});

figma.closePlugin()