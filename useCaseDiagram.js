import { generateSvg } from './svgHandle.js';
import { ellipses, line, actorX, actorY, actorWidth, actorHeight, placeType, actorName } from './globals.js';
import { 
  nullEllipses, 
  nullLine, 
  nullIncludeLine, 
  nullExtendLine, 
  nullLines, 
  setPlaceType, 
  setSvgTargetSizeW 
} from './globals.js';
import {
  placeFirstLvl,
  placeSecondLvl,
  placeAllFromCertainEllipse,
  placeAllFromActor,
  placeAllFromActorB
} from './placeElements.js';

class Element {
  constructor(id, text) {
    this.id = id;
    this.text = text;
    //icon
  }
}

class Man extends Element {
  constructor(id, text) {
    super(id, text);

    //icon
  }
}
class Ellipse extends Element {
  //ellipse
  constructor(radius, text, id, type, x, y, rx, ry, degrees) {//type - уровень эллипса: первый, второй
    super(id, text);
    this.radius = radius;
    this.type = type;
    this.x = x;
    this.y = y;
    this.rx = rx;
    this.ry = ry;
    this.degrees = degrees
    //   this.radius = radius;
    //   this.text = text;
    //   this.id = id;
  }
}

class Line extends Element {
  constructor(length, id, from, to, relation, type, x, y, x2, y2) {
    super(id);
    this.length = length;
    this.relation = relation;
    this.from = from;
    this.to = to;
    this.type = type;
    this.x = x;
    this.y = y;
    this.x2 = x2;
    this.y2 = y2;
  }
}

class IncludeLine extends Line {
  constructor(length, id, from, to, relation) {
    super(length, id, from, to, relation, x, y, x2, y2);
    //this.relation = relation; //begin/end;//скорее всего будет в Line
  }
}

class ExtendLine extends Line {
  constructor(length, id, from, to, relation) {
    super(length, id, from, to, relation, x, y, x2, y2);
    //this.relation = relation; //можно класс
  }
}




// let ellipses = [];
// let line = [];
// let includeLine = [];
// let extendLine = [];
// let lines = [];
// let actorX = 370;
// let actorY = 280;
// let actorWidth = 30;
// let actorHeight = 60;
// let ellipseWidth = 120;
 //let ellipseHeigth = 80;
// let placeType = 0;

// let actorName = "";

// let svgTargetSizeW = 1000;
function init(placingType, svgWidth) {
  nullEllipses();
  nullLine();
  nullIncludeLine();
  nullExtendLine();
  nullLines();
  
  // ellipses = [];
  // line = [];
  // includeLine = [];
  // extendLine = [];
  // lines = [];
  // actorName = "";
  setPlaceType(placingType);
  setSvgTargetSizeW(svgWidth);  
  // placeType = Number(placingType);
  // svgTargetSizeW = svgWidth;
  
}
// делить ширину на scale ///////

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('button1').addEventListener('click', () => {
    parse(5, 0, 1700);
  });
  document.getElementById('button2').addEventListener('click', () => {
    parse(4, 0, 1700);
  });
  document.getElementById('button3').addEventListener('click', () => {
    parse(3, 0, 1700);
  });
  document.getElementById('button4').addEventListener('click', () => {
    parse(6, 0, 1700);
  });
  document.getElementById('downloadSvg').addEventListener('click', () => {
    downloadSvgByButton();
  });
  document.getElementById('downloadXml').addEventListener('click', () => {
    downloadXmlByButton();
  });
});

function parse(placingType, useCaseList, svgWidth) {
  init(placingType, svgWidth);
  if (useCaseList) {
    parseText(useCaseList);
  }
  else {
    let x = document.getElementById("input");
    parseText(x.value);
  }
}



/*
function start(inputText) {
  let text = inputText;
  parseText(text);
}
*/


function parseText(text) {
  let myText = text;
  let lines = myText.split("\n");
  if (lines[0].startsWith("a:")) {
    actorName = lines.shift();
    actorName = actorName.replace("a:", "");
  }
  let numLines = lines.length;
  let linetext = "";
  let arrowType = "";
  let counter = 0;
  for (let i = 0; i < numLines; i++) {
    if (lines[i].length !== 0) {
      
      //? lines[i] !== ""
      //const rowElemList = lines[i].trim().split(":");
      
      const useCaseInfoList = lines[i].trim().split("--");
      arrowType = useCaseInfoList[0].split(":")[0]; //rowElemList[0];
      const nameIndex = useCaseInfoList.length === 1 ? 0 : 1;
      linetext = useCaseInfoList[nameIndex];

      let iplustwo = i + 2;
      //console.log(arrowType);
      //console.log(lines[i]);
      if (lines[i][0] != " " && lines[i][1] != " ") {
        ellipses.push(new Ellipse(100, linetext, counter+2, 1, 0, 0, 0));
      } else {
        ellipses.push(new Ellipse(100, linetext, counter+2, 2, 0, 0, 0));
      }
      if (arrowType === "m") {
        line.push(new Line(0, "m-" + (i + 2), 0, 0, counter, 0, 0, 0, 0, 0));
      } else if (arrowType === "i") {
        line.push(new Line(0, "i-" + (i + 2), 0, 0, counter, 1, 0, 0, 0, 0)); //лучше, если один класс под все стрелки?
      } else if (arrowType === "e") {
        line.push(new Line(0, "e-" + (i + 2), 0, 0, counter, 2, 0, 0, 0, 0));
      } else if (arrowType === "g") {
        line.push(new Line(0, "g-" + (i + 2), 0, 0, counter, 3, 0, 0, 0, 0));
      } else {
        line.push(new Line(0, "g-" + (i + 2), 0, 0, counter, 3, 0, 0, 0, 0));
      }
      

      counter++;

    }
    
  }

  console.log(line);
  console.log(ellipses);
 
  createXml(ellipses);
}
function countMainType(ellipses) {
  let main = [];
  for (let i = 0; i < ellipses.length; i++) {
    if (ellipses[i].type == "1") {
      main.push(ellipses[i]);
    }
  }
  return main;
}

function storeXML(xmlElement) {
  const doc = document.implementation.createDocument('', '', null);
  const fragment = doc.createDocumentFragment();
  fragment.appendChild(xmlElement.cloneNode(true));
  
  const xmlString = new XMLSerializer().serializeToString(fragment);
  localStorage.setItem('xmlData', xmlString);
}

function createXml(ellipses) {


  
  let mainType = countMainType(ellipses);

  let doc = document;
  let mxfile = doc.createElementNS("asd", "mxfile");
  let root = doc.createElementNS("asd", "root");
  let diagram = doc.createElementNS("asd", "diagram");
  let mxGraphModel = doc.createElementNS("asd", "mxGraphModel");

  let mxcell_0 = doc.createElementNS("asd", "mxCell");

  let mxcell_1 = doc.createElementNS("asd", "mxCell");

  let mxcell_actor = doc.createElementNS("asd", "mxCell");
  let mxGeo_actor = doc.createElementNS("asd", "mxGeometry");

  mxcell_0.setAttribute("id", "0");
  mxcell_1.setAttribute("id", "1");
  mxcell_1.setAttribute("parent", "0");

  mxcell_actor.setAttribute("id", "actor-1");
  mxcell_actor.setAttribute("value", `${actorName}`);
  mxcell_actor.setAttribute(
    "style",
    "shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;"
  );
  mxcell_actor.setAttribute("vertex", "1");
  mxcell_actor.setAttribute("parent", "1");

  mxGeo_actor.setAttribute("x", actorX);
  mxGeo_actor.setAttribute("y", actorY);
  mxGeo_actor.setAttribute("width", actorWidth);
  mxGeo_actor.setAttribute("height", actorHeight);
  mxGeo_actor.setAttribute("as", "geometry");

  mxcell_actor.appendChild(mxGeo_actor);

  root.appendChild(mxcell_0);
  root.appendChild(mxcell_1);
  root.appendChild(mxcell_actor);

  console.log(ellipses);

  if (placeType === 1 || placeType === 2) {

    placeFirstLvl(mainType, doc, root);
    placeSecondLvl(mainType, doc, root, mxGraphModel, diagram, mxfile);
    
  }
  if (placeType === 3 ) {
    placeAllFromCertainEllipse(doc, root, mxGraphModel, diagram, mxfile);
  }
  if (placeType === 4 ) {

    placeAllFromActor(doc, root, mxGraphModel, diagram, mxfile);
  }
  
  if (placeType === 5 ) {

    placeAllFromActorB(doc, root, mxGraphModel, diagram, mxfile, 1);
  }
  if (placeType === 6 ) {

    placeAllFromActorB(doc, root, mxGraphModel, diagram, mxfile, 2);
  }
  generateSvg(ellipses);
  storeXML(mxfile);

 // downloadFile(prettifyXml(xmlToString(mxfile)), "diagram");
}


function toDegrees(angle) {
  return angle * (180 / Math.PI);
}
function sin(angle) {
  return Math.sin(angle);
}
function cos(angle) {
  return Math.cos(angle);
}
function toRadians(angle) {
  return angle * (Math.PI / 180);
}








