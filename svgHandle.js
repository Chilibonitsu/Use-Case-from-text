import { line, actorX, actorY, actorName, svgTargetSizeW } from './globals.js';


export function generateSvg(ellipses) {
  // let actorX = 800;
  // let actorY = 800;
  let diagramOffset = 700;
  let actorXX = actorX + diagramOffset - 85;
  let actorYY = actorY + diagramOffset - 20;
  let actorWidth = 75;
  let actorHeight = 150;
  let svgElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  addActorToSVG(svgElement, actorXX, actorYY);

  // svgElement.setAttribute("viewBox", "0 0 2500 2500");

  //addActor(svgElement);
  svgElement.setAttribute("width", "600");
  svgElement.setAttribute("height", "600");
  let marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
  let blankMarker = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "marker"
  );
  let defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  let defsBlank = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "defs"
  );
  let polygon = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "polygon"
  );
  let polygonBlank = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "polygon"
  );
  // let img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
  // img.setAttribute("href", "actor.svg");
  // img.setAttribute("x", actorXX-3.55);
  // img.setAttribute("y", actorYY);
  // img.setAttribute("width", actorWidth/2);
  // img.setAttribute("height", actorHeight/2);
  // img.setAttribute("visibility", "visible");
  //gen как extend
  //img.setAttribute("y", actorHeight);
  //svgElement.appendChild(img);
  polygon.setAttribute("points", "0 0, 10 3.5, 0 7");
  // polygon.setAttribute("fill", "none");
  // polygon.setAttribute("stroke-width", "2");
  // polygon.setAttribute("stroke", "black");
  polygonBlank.setAttribute("points", "0 0, 10 3.5, 0 7");
  polygonBlank.setAttribute("fill", "white");
  polygonBlank.setAttribute("stroke-width", "2");
  polygonBlank.setAttribute("stroke", "black");

  marker.setAttribute("id", "arrowhead");
  marker.setAttribute("markerWidth", "10");
  marker.setAttribute("markerHeight", "7");
  marker.setAttribute("refX", "10");
  marker.setAttribute("refY", "3.5");
  marker.setAttribute("orient", "auto");

  blankMarker.setAttribute("id", "blankarrowhead");
  blankMarker.setAttribute("markerWidth", "10");
  blankMarker.setAttribute("markerHeight", "7");
  blankMarker.setAttribute("refX", "10");
  blankMarker.setAttribute("refY", "3.5");
  blankMarker.setAttribute("orient", "auto");
  blankMarker.setAttribute("stoke", "3278E0");
  blankMarker.setAttribute("fill", "none");

  // marker.setAttribute("fill", "none");

  marker.appendChild(polygon);
  blankMarker.appendChild(polygonBlank);

  defs.appendChild(marker);
  defsBlank.appendChild(blankMarker);

  svgElement.appendChild(defs);
  svgElement.appendChild(defsBlank);

  let rx = 62;
  let ry = 42;

  for (let i = 0; i < ellipses.length; i++) {
    let ellElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "ellipse"
    );
    let textElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );
    let foreignObject = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "foreignObject"
    );
    let divText = document.createElementNS(
      "http://www.w3.org/1999/xhtml",
      "div"
    );

    ellElement.setAttribute("cx", ellipses[i].x + 700);
    ellElement.setAttribute("cy", ellipses[i].y + 700);
    ellElement.setAttribute("rx", rx);
    ellElement.setAttribute("ry", ry);
    ellElement.setAttribute("fill", "rgb(255, 255, 255)");
    ellElement.setAttribute("stroke", "rgb(0, 0, 0)");

    textElement.setAttribute("x", ellipses[i].x + 700);
    textElement.setAttribute("y", ellipses[i].y + 700);
    textElement.setAttribute("fill", "rgb(0, 0, 0)");
    textElement.setAttribute("font-family", "Helvetica");
    textElement.setAttribute("font-size", "10px");

    foreignObject.setAttribute("x", ellipses[i].x + 700 - 62);
    foreignObject.setAttribute("y", ellipses[i].y + 700 - 42);
    foreignObject.setAttribute("width", 2 * rx);
    foreignObject.setAttribute("height", 2 * ry);

    divText.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
    divText.setAttribute(
      "style",
      "font-size: 12px; text-align: center; width: 65%; heigth: 60%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"
    );

    divText.textContent = ellipses[i].text;
    foreignObject.appendChild(divText);

    svgElement.appendChild(ellElement);
    svgElement.appendChild(foreignObject);
    //svgElement.appendChild(lines);
    //svgElement.appendChild(divText);
    //svgElement.appendChild(textElement);
  }

  let translateOffsets = [0, 0];
  placeArrowSVG(svgElement, ellipses);
  placeLinesSVG(svgElement);
  translateOffsets = shiftSVGToCorner(svgElement);
  scaleSVG(svgElement, translateOffsets);
  //
  //

  let xml = xmlToString(svgElement);
  let divSvg = document.getElementById("svg");
  if (!divSvg) {
    divSvg = document.createElement("div");
    divSvg.innerHTML = xml;
    divSvg.id = "svg";
    document.body.append(divSvg);
  }
  if (divSvg) {
    divSvg.innerHTML = xml;
  }
  const svg = divSvg.querySelector("svg");
  if (svg) {
    const boundingClientRect = svg.getBoundingClientRect();
    //console.log("svg.getBoundingClientRect =", boundingClientRect.width, boundingClientRect.height);
    divSvg.style.width = boundingClientRect.width + "px";
    divSvg.style.height = boundingClientRect.height + "px";
  }
  //downloadSvg(prettifyXml(xml), "diagram");
}

function addActorToSVG(svgElement, actorX, actorY) {
  let codeToAdd = `
    <g>
        <ellipse cx="688.49" cy="871.33" rx="7.5" ry="7.5" fill="rgb(255, 255, 255)" stroke="rgb(0, 0, 0)" pointer-events="all"/>
        <path d="M 688.49 878.83 L 688.49 903.83 M 688.49 883.83 L 673.49 883.83 M 688.49 883.83 L 703.49 883.83 M 688.49 903.83 L 673.49 923.83 M 688.49 903.83 L 703.49 923.83" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="all"/>
        <g transform="translate(-0.5 -0.5)">
            <switch>
                <foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow: visible; text-align: left;">
                    <div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe flex-start; justify-content: unsafe center; width: 1px; height: 1px; padding-top: 931px; margin-left: 688px;">
                        <div data-drawio-colors="color: rgb(0, 0, 0); " style="box-sizing: border-box; font-size: 0px; text-align: center;">
                            <div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; pointer-events: all; white-space: nowrap;">${actorName}</div>
                        </div>
                    </div>
                </foreignObject>
                <text x="688" y="943" fill="rgb(0, 0, 0)" font-family="Helvetica" font-size="12px" text-anchor="middle">${actorName}</text>
            </switch>
        </g>
    </g>
    `;

  let newGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
  let translateValue = `translate(${320}, ${95})`;

  newGroup.setAttribute("transform", translateValue);

  //newGroup.setAttribute("transform", `translate(${actorX}, ${actorY})`);
  newGroup.innerHTML = codeToAdd;
  // let groupElement = newGroup.querySelector("g"); // Получаем ссылку на <g> элемент
  // let elementById = groupElement.querySelector("#actorText");
  // elementById.innerHTML = "ehwhwhwh";
  // console.log(elementById.innerHTML, "eqhqheqh")
  svgElement.appendChild(newGroup);
}

function placeLinesSVG(svgElement) {
  for (let i = 0; i < line.length; i++) {
    let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", (line[i].x2 + line[i].x) / 2 - 30);
    text.setAttribute("y", (line[i].y2 + line[i].y) / 2 - 15);

    if (line[i].type == 1) {
      text.textContent = "«include»";
    } else if (line[i].type == 2) {
      text.textContent = "«extend»";
    }
    svgElement.appendChild(text);
  }
}

function placeArrowSVG(svgElement, ellipses) {
  console.log(line);
  let arr = [];
  let arr2 = [];
  for (let i = 0; i < ellipses.length; i++) {
    let lines = document.createElementNS("http://www.w3.org/2000/svg", "line");

    //arr = arrowPositionChange(line[i].x2, line[i].y2, line[i].x, line[i].y,
    //  ellipses[line[i].from].x+700, ellipses[line[i].from].y+700, 62, 42);

    if (line[i].type == "1") {
      arr = arrowPositionChange(
        line[i].x2,
        line[i].y2,
        line[i].x,
        line[i].y,
        ellipses[line[i].from].x + 700,
        ellipses[line[i].from].y + 700,
        62,
        42,
        ellipses[line[i].to].x + 700,
        ellipses[line[i].to].y + 700,
        62,
        42
      );

      lines.setAttribute("x1", arr[0]);
      lines.setAttribute("y1", arr[1]);
      lines.setAttribute("x2", arr[2]);
      lines.setAttribute("y2", arr[3]);
      lines.setAttribute("stroke", "black");
      lines.setAttribute("stroke-width", "1");
      lines.setAttribute("text-anchor", "middle");
      lines.setAttribute("stroke-dasharray", "5 2");
      lines.setAttribute("marker-end", "url(#arrowhead)");
    } else if (line[i].type == "2") {
      arr = arrowPositionChange(
        line[i].x2,
        line[i].y2,
        line[i].x,
        line[i].y,
        ellipses[line[i].to].x + 700,
        ellipses[line[i].to].y + 700,
        62,
        42,
        ellipses[line[i].from].x + 700,
        ellipses[line[i].from].y + 700,
        62,
        42
      );

      lines.setAttribute("x1", arr[0]);
      lines.setAttribute("y1", arr[1]);
      lines.setAttribute("x2", arr[2]);
      lines.setAttribute("y2", arr[3]);
      lines.setAttribute("stroke", "black");
      lines.setAttribute("stroke-width", "1");
      lines.setAttribute("text-anchor", "middle");
      lines.setAttribute("stroke-dasharray", "5 2");
      lines.setAttribute("marker-end", "url(#arrowhead)");
    } else if (line[i].type == "3") {
      arr = arrowPositionChange(
        line[i].x2,
        line[i].y2,
        line[i].x,
        line[i].y,
        ellipses[line[i].to].x + 700,
        ellipses[line[i].to].y + 700,
        62,
        42,
        ellipses[line[i].from].x + 700,
        ellipses[line[i].from].y + 700,
        62,
        42
      );

      lines.setAttribute("x1", arr[0]);
      lines.setAttribute("y1", arr[1]);
      lines.setAttribute("x2", arr[2]);
      lines.setAttribute("y2", arr[3]);
      lines.setAttribute("stroke", "black");
      lines.setAttribute("text", "aboba");
      //  lines.setAttribute("stroke-width", "1");
      //  lines.setAttribute('text-anchor', 'middle');
      //  lines.setAttribute("stroke-dasharray", "3 1");
      lines.setAttribute("marker-end", "url(#blankarrowhead)");
    } else if (line[i].type == "0") {
      arr = arrowPositionChange(
        1000,
        1000,
        line[i].x2,
        line[i].y2,
        ellipses[line[i].to].x + 700,
        ellipses[line[i].to].y + 700,
        62,
        42,
        1000,
        1000,
        62,
        42
      );

      lines.setAttribute("x1", arr[0]);
      lines.setAttribute("y1", arr[1]);
      lines.setAttribute("x2", arr[2]);
      lines.setAttribute("y2", arr[3]);
      lines.setAttribute("stroke", "black");
      lines.setAttribute("stroke-width", "1");
      lines.setAttribute("text-anchor", "middle");
    }

    svgElement.appendChild(lines);
  }
}
function arrowPositionChange(
  startX,
  startY,
  endX,
  endY,
  ellipse1CenterX,
  ellipse1CenterY,
  ellipse1RadiusX,
  ellipse1RadiusY,
  ellipse2CenterX,
  ellipse2CenterY,
  ellipse2RadiusX,
  ellipse2RadiusY
) {
  // Вычисление расстояния от начала стрелки до центра первого эллипса
  var distance1 = Math.sqrt(
    Math.pow(startX - ellipse1CenterX, 2) +
      Math.pow(startY - ellipse1CenterY, 2)
  );

  // Вычисление координат точки пересечения на первом эллипсе
  var intersectionX1 =
    ellipse1CenterX +
    (ellipse1RadiusX / distance1) * (startX - ellipse1CenterX);
  var intersectionY1 =
    ellipse1CenterY +
    (ellipse1RadiusY / distance1) * (startY - ellipse1CenterY);

  // Вычисление расстояния от конца стрелки до центра второго эллипса
  var distance2 = Math.sqrt(
    Math.pow(endX - ellipse2CenterX, 2) + Math.pow(endY - ellipse2CenterY, 2)
  );

  // Вычисление координат точки пересечения на втором эллипсе
  var intersectionX2 =
    ellipse2CenterX + (ellipse2RadiusX / distance2) * (endX - ellipse2CenterX);
  var intersectionY2 =
    ellipse2CenterY + (ellipse2RadiusY / distance2) * (endY - ellipse2CenterY);

  // Сдвиг начала и конца стрелки к точкам пересечения
  var shiftedStartX = intersectionX1;
  var shiftedStartY = intersectionY1;
  var shiftedEndX = intersectionX2;
  var shiftedEndY = intersectionY2;

  var result = [shiftedStartX, shiftedStartY, shiftedEndX, shiftedEndY];

  // console.log(result);
  // console.log("asdasdasdasdsd");
  let arr = [];

  if (isNaN(shiftedEndX)) {
    arr.push(0);
    arr.push(0);
    arr.push(0);
    arr.push(0);
  } else {
    arr.push(shiftedStartX);
    arr.push(shiftedStartY);
    arr.push(shiftedEndX);
    arr.push(shiftedEndY);
  }
  return arr;

  // //   // Известные координаты начала и конца стрелки, оси эллипса
  // // var startX = Number(xx1); // Координата X начала стрелки
  // // var startY = Number(yy1); // Координата Y начала стрелки
  // // var endX = Number(xx2); // Координата X конца стрелки
  // // var endY = Number(yy2); // Координата Y конца стрелки
  // // var cx = Number(cxx); // Координата X центра эллипса
  // // var cy = Number(cyy); // Координата Y центра эллипса
  // // var rx = Number(aa); // Радиус эллипса по оси X
  // // var ry = Number(bb); // Радиус эллипса по оси Y

  // console.log("ASDSDASDASD");
  // console.log(endX);
  // console.log(cx);
  // console.log(endY);
  // console.log(cy);

  // // Вычисление расстояния от центра эллипса до точки пересечения
  // var distance = Math.sqrt(Math.pow(endX - cx, 2) + Math.pow(endY - cy, 2));

  // // Вычисление координат точки пересечения
  // var intersectionX = cx + (rx / distance) * (endX - cx);
  // var intersectionY = cy + (ry / distance) * (endY - cy);

  // // Сдвиг начала и конца стрелки на расстояние от центра до точки пересечения
  // var shiftedStartX = intersectionX + (startX - cx);
  // var shiftedStartY = intersectionY + (startY - cy);
  // var shiftedEndX = intersectionX + (endX - cx);
  // var shiftedEndY = intersectionY + (endY - cy);
  // let arr = [];

  // if (isNaN(shiftedEndX)) {

  //   arr.push(0);
  //   arr.push(0);
  //   arr.push(0);
  //   arr.push(0);

  // } else {
  //   arr.push(shiftedStartX);
  //   arr.push(shiftedStartY);
  //   arr.push(shiftedEndX);
  //   arr.push(shiftedEndY);
  // }
  // return arr;
}

function shiftSVGToCorner(svgElement) {
  let translateX = 0;
  let translateY = 0;
  let translateXoffset = 0;
  let translateYoffset = 0;
  let min = [];
  let max = [];

  min = findEllipsesMin(svgElement);
  max = findEllipsesMax(svgElement);
  let gElement = document.createElementNS("http://www.w3.org/2000/svg", "g");

  gElement.setAttribute("transform", `translate(${translateX}, ${translateY})`);
  let xoffs = 65;
  let yoffs = 62;
  if (min[0] > 70) {
    translateX = -(min[0] - xoffs);
    translateXoffset = max[0] + translateX + xoffs;
    svgElement.setAttribute("width", translateXoffset);
  }
  if (min[1] > 70) {
    translateY = -(min[1] - yoffs);
    translateYoffset = max[1] + translateY + yoffs;
    svgElement.setAttribute("height", translateYoffset);
  }
  console.log(
    svgElement.getAttribute("width"),
    svgElement.getAttribute("height")
  );

  gElement.setAttribute("transform", `translate(${translateX}, ${translateY})`);

  let svgChildren = Array.from(svgElement.childNodes);

  svgChildren.forEach((child) => {
    gElement.appendChild(child);
  });

  svgElement.appendChild(gElement);

  let arr = [];
  arr.push(translateX);
  arr.push(translateY);
  return arr;
  // alert(Number(svgElement.getAttribute("width")) - min[0]- xoffs);
  // svgElement.setAttribute("width", Number(svgElement.getAttribute("width"))  -min[0]-xoffs);
  // svgElement.setAttribute("height", Number(svgElement.getAttribute("height")) -min[1]-yoffs);
}

function scaleSVG(svgElement, translateOffsets) {
  let scale = 1; //скейлит svg
  let translateX = 0;
  let translateY = 0;

  let min = [];
  let max = [];

  min = findEllipsesMin(svgElement);
  max = findEllipsesMax(svgElement);
  min[0] = min[0] + translateOffsets[0];
  min[1] = min[1] + translateOffsets[1];
  max[0] = max[0] + translateOffsets[0];
  max[1] = max[1] + translateOffsets[1];

  if (min[0] < 0) {
    translateX = Math.abs(min[0]) + 70;
  }
  console.log(min[1], "miny");
  if (min[1] < 40) {
    translateY = Math.abs(min[1]) + 70;
  }

  if (max[0] > svgElement.getAttribute("width")) {
    svgElement.setAttribute("width", max[0] + translateX + 80);
  }
  if (max[1] > svgElement.getAttribute("height")) {
    svgElement.setAttribute("height", max[1] + translateY + 80);
  }

  //svgElement.setAttribute("style", `transform: scale(${scale}); transform-origin: 0 0;`);
  updateScaleWithSize(svgElement);

  let gElement = document.createElementNS("http://www.w3.org/2000/svg", "g");

  gElement.setAttribute("transform", `translate(${translateX}, ${translateY})`);

  let svgChildren = Array.from(svgElement.childNodes);

  svgChildren.forEach((child) => {
    gElement.appendChild(child);
  });

  svgElement.appendChild(gElement);
}

function xmlToString(xml_node) {
  //привести к стандарту
  if (xml_node.xml) return xml_node.xml;
  else if (XMLSerializer) {
    var xml_serializer = new XMLSerializer();
    return xml_serializer.serializeToString(xml_node);
  } else {
    alert("ERROR: Extremely old browser");
    return "";
  }
}

function prettifyXml(sourceXml) {
  var xmlDoc = new DOMParser().parseFromString(sourceXml, "application/xml");
  var xsltDoc = new DOMParser().parseFromString(
    [
      // describes how we want to modify the XML - indent everything
      '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">',
      '  <xsl:strip-space elements="*"/>',
      '  <xsl:template match="para[content-style][not(text())]">', // change to just text() to strip space in text nodes
      '    <xsl:value-of select="normalize-space(.)"/>',
      "  </xsl:template>",
      '  <xsl:template match="node()|@*">',
      '    <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>',
      "  </xsl:template>",
      '  <xsl:output indent="yes"/>',
      "</xsl:stylesheet>",
    ].join("\n"),
    "application/xml"
  );

  var xsltProcessor = new XSLTProcessor();
  xsltProcessor.importStylesheet(xsltDoc);
  var resultDoc = xsltProcessor.transformToDocument(xmlDoc);
  var resultXml = new XMLSerializer().serializeToString(resultDoc);
  return resultXml;
}
function findEllipsesMin(svgElement) {

    let ellipses = svgElement.getElementsByTagName('ellipse');
    let minX = Infinity;
    let minY = Infinity;
    
    for (let i = 0; i < ellipses.length; i++) {
      let ellipse = ellipses[i];
      let cx = parseFloat(ellipse.getAttribute('cx'));
      let cy = parseFloat(ellipse.getAttribute('cy'));
    
      if (cx < minX) {
        minX = cx;
      }
    
      if (cy < minY) {
        minY = cy;
      }
    }
    let arr = []
    arr.push(minX);
    arr.push(minY);
    return arr;
  }
  
  function findEllipsesMax(svgElement) {
  
    let ellipses = svgElement.getElementsByTagName('ellipse');
    let maxX = -Infinity;
    let maxY = -Infinity;
    
    for (let i = 0; i < ellipses.length; i++) {
      let ellipse = ellipses[i];
      let cx = parseFloat(ellipse.getAttribute('cx'));
      let cy = parseFloat(ellipse.getAttribute('cy'));
    
      if (cx > maxX) {
        maxX = cx;
      }
    
      if (cy > maxY) {
        maxY = cy;
      }
    }
    let arr = []
    console.log(maxX)
    console.log(maxY)
    arr.push(maxX);
    arr.push(maxY);
    return arr;
  }
  

  
function updateScaleWithSize(svgElement) {

    const scaleX = svgTargetSizeW / svgElement.getAttribute("width"); // Рассчитываем масштабирование по ширине
    const scaleY = scaleX;
  
  
    let scale = Math.min(scaleX, scaleY);
  
  
    svgElement.setAttribute("style", `transform: scale(${scale}); transform-origin: 0 0;`);
  }
  
  