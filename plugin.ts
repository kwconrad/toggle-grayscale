function clone(val) {
  return JSON.parse(JSON.stringify(val))
}

function getLightnessOfRGB(rgbString) {
  const rgbIntArray = rgbString.replace(/ /g, '').slice(4, -1).split(',').map(e => parseInt(e));

  const highest = Math.max(...rgbIntArray);
  const lowest = Math.min(...rgbIntArray);

  return (highest + lowest) / 2 / 255;
}

figma.currentPage.selection.map(n => {
  if (!!n.fills[0] && n.fills[0].type === "SOLID") {
    const fills = clone(n.fills);
    const originalFills = fills
    const fill = fills[0];
    const grayVal = getLightnessOfRGB(`rgb(${fill.color.r * 255}, ${fill.color.r * 255}, ${fill.color.r * 255})`);
    fill.color.r = grayVal
    fill.color.g = grayVal
    fill.color.b = grayVal
    n.fills = fills
  }
})

figma.closePlugin()