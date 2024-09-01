import { ellipses, line, actorX, actorY, actorWidth, ellipseWidth, ellipseHeigth, placeType } from './globals.js';


function placeFirstLvl(mainType, doc, root) {
  //let len = 5.5;//6.5-7 для 140
  //лен = 4 для 12 осн норм, для 14 уже не норм
  //лен = 5.5 норм для 16, для 16 уже не норм
  let len = lenFindFirstLvl();

  document.getElementById("toFirstLvlActualLength").textContent = len;

  if (document.getElementById("toFirstLvlLength").value != "") {
    len = document.getElementById("toFirstLvlLength").value;
    
  }

  let offset = 0;
  let deg = 360 / mainType.length; //сделать целым?
  let width = 120;
  let height = 80;

  for (let i = 0; i < mainType.length; i++) {
    let mxcell = doc.createElementNS("asd", "mxCell");
    let mxGeometry = doc.createElementNS("asd", "mxGeometry");

    let mainEll_Index = ellipses.findIndex((ecl) => ecl.id === mainType[i].id); // *i проходов по ellipses
    let x =
      actorX -
      actorWidth -
      actorWidth / 2 +
      Math.round(toDegrees(cos(toRadians(offset)) * len));
    let y = actorY - 10 + Math.round(toDegrees(sin(toRadians(offset)) * len));

    mainType[i].x = x;
    mainType[i].y = y;

    ellipses[mainEll_Index].x = x;
    ellipses[mainEll_Index].y = y;

    console.log(toDegrees(cos(toRadians(offset))));
    mxGeometry.setAttribute("x", x);

    mxGeometry.setAttribute("y", y);

    offset = offset + deg;

    mxGeometry.setAttribute("width", width);
    mxGeometry.setAttribute("height", height);
    mxGeometry.setAttribute("as", "geometry");

    mxcell.setAttribute("value", mainType[i].text);
    mxcell.setAttribute("id", mainType[i].id);
    mxcell.setAttribute("style", "ellipse;whiteSpace=wrap;html=1;");
    mxcell.setAttribute("parent", "1");
    mxcell.setAttribute("vertex", "1");
    mxcell.appendChild(mxGeometry);

    mxcell.appendChild(mxGeometry);
    root.appendChild(mxcell);

    placeArrow(mainType, doc, root, mainEll_Index, i, 1, 0);
  }
}

function placeSecondLvl(mainType, doc, root, mxGraphModel, diagram, mxfile) {
  let width = 120; //ширина эллипса
  let height = 80;
  let deg = 360 / (ellipses.length - mainType.length); //сделать целым?
  let offset = 0;
  console.log(offset);
  let deg2 = 8.5;
  let typeOneindex = 0;
  let arrowOffset_x = 1;
  // console.log(ellipses);
  // console.log(mainType);

  let lens = [];
  if (placeType == "1") {
    lens = lenFindSecondLvlActorBase();
    //deg = 360 / (ellipses.length);
  } else if (placeType == "2") {
    lens = lenFindSecondLvlEllipseBase();
    deg = 360 / ellipses.length;
  }

  document.getElementById("startingActualLength").textContent = lens[0];
  document.getElementById("endingActualLength").textContent = lens[1];

  if (document.getElementById("startingLength").value != "") {
    lens[0] = document.getElementById("startingLength").value;
    lens[0] = Number(lens[0]);
  }

  if (document.getElementById("endingLength").value != "") {
    lens[1] = document.getElementById("endingLength").value;
    lens[1] = Number(lens[1]);
  }

  //else if(placeType == "3") {
  //lens = lenFindSecondLvlEllipseBase()
  //}

  //let lens = lenFindSecondLvlEllipseBase();//длины
  // let lens = lenFindSecondLvlActorBase();
  let orig_len = lens[0]; //4 при lvlx 10 при actorx
  let len = orig_len;
  let len_top = lens[1]; //14 при lvlx 15 при actorx

  let len_offset = 0;
  let middle = 1;
  let typeCount = 0;
  let typeCounter_counter = 0;
  let changePosition_check = true;
  let lvl1_x = 0;
  let lvl1_y = 0;
  for (let i = 0; i < ellipses.length; i++) {
    if (ellipses[i].type === 1) {
      lvl1_x = ellipses[i].x;
      lvl1_y = ellipses[i].y;
      typeCount = typeCounter(ellipses, ellipses[i].id);
      len = orig_len;
      len_offset = (len_top - orig_len) / typeCount;
      middle = 1; //для уменьшения длины с середины
      typeOneindex = i;
      typeCounter_counter = 0;
      changePosition_check = true;
      if (placeType == "2") {
        //offset+=deg;
      }
    } else {
      typeCounter_counter += 1;
      let mxcell = doc.createElementNS("asd", "mxCell");
      let mxGeometry = doc.createElementNS("asd", "mxGeometry");

      let x = 0;
      let y = 0;
      if (placeType == "1") {
        x = actorX + Math.round(toDegrees(cos(toRadians(offset)) * len));
        y = actorY + Math.round(toDegrees(sin(toRadians(offset)) * len));
      } else if (placeType == "2") {
        x = lvl1_x + Math.round(toDegrees(cos(toRadians(offset)) * len));
        y = lvl1_y + Math.round(toDegrees(sin(toRadians(offset)) * len));
      }
      // let x = actorX + Math.round(toDegrees(cos(toRadians(offset)) * len));
      // let y = actorY + Math.round(toDegrees(sin(toRadians(offset)) * len));

      // let x = lvl1_x + Math.round(toDegrees(cos(toRadians(offset)) * len));
      // let y = lvl1_y + Math.round(toDegrees(sin(toRadians(offset)) * len));

      ellipses[i].x = x;
      ellipses[i].y = y;
      mxGeometry.setAttribute("x", x);
      mxGeometry.setAttribute("y", y);
      offset += deg;
      console.log(offset);
      console.log(ellipses[i].text);
      if (typeCounter_counter >= typeCount / 2) {
        middle = -1;
        //console.log(ellipses[typeOneindex].id);
        if (changePosition_check) {
          //changePosition(ellipses, typeOneindex, i, root, offset, ellipses[typeOneindex].x, ellipses[typeOneindex].y, 8, 2);
          changePosition_check = false;
          //(ellipses, mainEllIndex, currentEllipseIndex, root, degrees, basex, basey,  len,  type)
          // (ellipses, mainEllIndex, currentEllipseIndex, root, degrees, basex, basey,  len,  type)
        }
      }
      len += len_offset * middle;

      mxGeometry.setAttribute("width", width);
      mxGeometry.setAttribute("height", height);
      mxGeometry.setAttribute("as", "geometry");

      mxcell.setAttribute("value", ellipses[i].text);
      mxcell.setAttribute("id", ellipses[i].id);
      mxcell.setAttribute("style", "ellipse;whiteSpace=wrap;html=1;");
      mxcell.setAttribute("parent", "1");
      mxcell.setAttribute("vertex", "1");
      mxcell.appendChild(mxGeometry);

      mxcell.appendChild(mxGeometry);
      root.appendChild(mxcell);
      // console.log("text: ", ellipses[i].text);
      // console.log("degree", offset);

      placeArrow(
        ellipses,
        doc,
        root,
        typeOneindex,
        i,
        2,
        typeOneindex,
        offset,
        2
      );

      //console.log(arrowOffset_x)
    }
  }

  //changePosition(ellipses, typeOneindex, 0, root, 0, ellipses[typeOneindex].x, ellipses[typeOneindex].y, len, 2);
  mxGraphModel.appendChild(root);
  diagram.appendChild(mxGraphModel);
  mxfile.appendChild(diagram);
}

function placeArrow(
  arr,
  doc,
  root,
  mainEll_index,
  index,
  lvl,
  typeOneIndex,
  degrees
) {
  let mxcell = doc.createElementNS("asd", "mxCell");
  let mxGeometry = doc.createElementNS("asd", "mxGeometry");
  let mxPoint = doc.createElementNS("asd", "mxPoint");
  let mxPoint2 = doc.createElementNS("asd", "mxPoint");
  if (lvl === 1) {
    mxcell.setAttribute("id", line[mainEll_index].id);
    mxcell.setAttribute("value", "");
    mxcell.setAttribute(
      "style",
      "endArrow=none;html=1;rounded=0;exitX=0.5;exitY=0;exitDx=0;exitDy=0;"
    );
    mxcell.setAttribute("parent", "1");
    mxcell.setAttribute("source", "actor-1");
    mxcell.setAttribute("target", arr[index].id);
    mxcell.setAttribute("edge", "1");

    mxGeometry.setAttribute("width", "50");
    mxGeometry.setAttribute("heigth", "50");
    mxGeometry.setAttribute("relative", "1");
    mxGeometry.setAttribute("as", "geometry");

    mxPoint.setAttribute("x", actorX);
    mxPoint.setAttribute("y", actorY);
    mxPoint.setAttribute("as", "sourcePoint");

    mxPoint2.setAttribute("x", arr[index].x);
    mxPoint2.setAttribute("y", arr[index].y);
    mxPoint2.setAttribute("as", "targetPoint");

    console.log("asdasdasdasdasd");

    line[mainEll_index].x = actorX + 700;
    line[mainEll_index].y = actorY + 700;
    line[mainEll_index].x2 = arr[index].x + 700;
    line[mainEll_index].y2 = arr[index].y + 700;

    line[mainEll_index].relation = index;

    // console.log(arr[index].text);
    // console.log(arr[index].x);
    // console.log(arr[index].y);
    // console.log(line[index].y);
    // console.log(line[index].x2);
    // console.log(line[index].y2);
    line[mainEll_index].from = -1;
    line[mainEll_index].to = mainEll_index;
    console.log(line);

    mxGeometry.appendChild(mxPoint);
    mxGeometry.appendChild(mxPoint2);
    mxcell.appendChild(mxGeometry);

    root.appendChild(mxcell);
  } else {
    if (line[index].type === 1) {
      mxcell.setAttribute("id", line[index].id);
      mxcell.setAttribute("value", "<< include >>");

      mxcell.setAttribute(
        "style",
        `endArrow=classicThin;html=1;dashed=1;rounded=0;`
      );
      mxcell.setAttribute("parent", "1");
      mxcell.setAttribute("source", arr[typeOneIndex].id);
      mxcell.setAttribute("target", arr[index].id);
      mxcell.setAttribute("edge", "1");

      mxGeometry.setAttribute("width", "50");
      mxGeometry.setAttribute("heigth", "50");
      mxGeometry.setAttribute("relative", "1");
      mxGeometry.setAttribute("as", "geometry");

      mxPoint.setAttribute("x", arr[typeOneIndex].x);
      mxPoint.setAttribute("y", arr[typeOneIndex].y);
      mxPoint.setAttribute("as", "sourcePoint");

      mxPoint2.setAttribute("x", arr[index].x);
      mxPoint2.setAttribute("y", arr[index].y);
      mxPoint2.setAttribute("as", "targetPoint");

      line[index].x = arr[typeOneIndex].x + 700;
      line[index].y = arr[typeOneIndex].y + 700;
      line[index].x2 = arr[index].x + 700;
      line[index].y2 = arr[index].y + 700;

      line[index].relation = index;
      line[index].from = typeOneIndex;
      line[index].to = index;
      mxGeometry.appendChild(mxPoint);
      mxGeometry.appendChild(mxPoint2);
      mxcell.appendChild(mxGeometry);

      root.appendChild(mxcell);
    } else if (line[index].type === 2) {
      let ex = "extend";
      mxcell.setAttribute("id", line[index].id);
      mxcell.setAttribute("value", `\<\< extend \>\>`);
      mxcell.setAttribute(
        "style",
        `endArrow=classicThin;html=1;dashed=1;rounded=0;`
      );
      mxcell.setAttribute("parent", "1");
      mxcell.setAttribute("source", arr[index].id);
      mxcell.setAttribute("target", arr[typeOneIndex].id);
      mxcell.setAttribute("edge", "1");

      mxGeometry.setAttribute("width", "50");
      mxGeometry.setAttribute("heigth", "50");
      mxGeometry.setAttribute("relative", "1");
      mxGeometry.setAttribute("as", "geometry");

      mxPoint.setAttribute("x", arr[index].x);
      mxPoint.setAttribute("y", arr[index].y);
      mxPoint.setAttribute("as", "sourcePoint");
      mxPoint2.setAttribute("x", arr[typeOneIndex].x);
      mxPoint2.setAttribute("y", arr[typeOneIndex].y);
      mxPoint2.setAttribute("as", "targetPoint");

      line[index].x2 = arr[typeOneIndex].x + 700;
      line[index].y2 = arr[typeOneIndex].y + 700;
      line[index].x = arr[index].x + 700;
      line[index].y = arr[index].y + 700;

      line[index].relation = index;
      line[index].from = typeOneIndex;
      line[index].to = index;

      mxGeometry.appendChild(mxPoint);
      mxGeometry.appendChild(mxPoint2);
      mxcell.appendChild(mxGeometry);
      root.appendChild(mxcell);
    } else if (line[index].type === 3) {
      let ex = "gen";
      mxcell.setAttribute("id", line[index].id);
      // mxcell.setAttribute("value", `\<\< gen \>\>`);
      mxcell.setAttribute(
        "style",
        `endArrow=block;endSize=12;endFill=0;html=1;rounded=0;`
      );
      mxcell.setAttribute("parent", "1");
      mxcell.setAttribute("source", arr[index].id);
      mxcell.setAttribute("target", arr[typeOneIndex].id);
      mxcell.setAttribute("edge", "1");

      mxGeometry.setAttribute("width", "50");
      mxGeometry.setAttribute("heigth", "50");
      mxGeometry.setAttribute("relative", "1");
      mxGeometry.setAttribute("as", "geometry");

      mxPoint.setAttribute("x", arr[index].x);
      mxPoint.setAttribute("y", arr[index].y);
      mxPoint.setAttribute("as", "sourcePoint");
      mxPoint2.setAttribute("x", arr[typeOneIndex].x);
      mxPoint2.setAttribute("y", arr[typeOneIndex].y);
      mxPoint2.setAttribute("as", "targetPoint");

      line[index].x2 = arr[typeOneIndex].x + 700;
      line[index].y2 = arr[typeOneIndex].y + 700;
      line[index].x = arr[index].x + 700;
      line[index].y = arr[index].y + 700;

      line[index].relation = index;
      line[index].from = typeOneIndex;
      line[index].to = index;

      mxGeometry.appendChild(mxPoint);
      mxGeometry.appendChild(mxPoint2);
      mxcell.appendChild(mxGeometry);
      root.appendChild(mxcell);
    }
  }

  //line.push(new Line(0, "i-" + iplustwo, 0, 0, i, 0))
}
function findAmountBetweenFirstLvls(ellipses, j) {
  let position = j + 1;
  let counter = 0;
  for (let i = position; i < ellipses.length; i++) {
    if (ellipses[i].type === 2) {
      counter++;
    } else {
      break;
    }
  }
  return counter;
}

function placeAllFromActor(doc, root, mxGraphModel, diagram, mxfile) {
  let lenFromActorFirstLvl = floatingLengthActorFirstLvl();

  document.getElementById("toFirstLvlActualLength").textContent = lenFromActorFirstLvl;
  
    if (document.getElementById("toFirstLvlLength").value != "") {
      lenFromActorFirstLvl = document.getElementById("toFirstLvlLength").value;
      lenFromActorFirstLvl = Number(lenFromActorFirstLvl);
  
    }
    

  let width = ellipseWidth; //ширина эллипса
  let height = ellipseHeigth;

  let offset = 360 / ellipses.length;

  // if (!isFinite(offset)) {
  //   offset = 360/(ellipses.length);
  // }

  let arr = floatingLengthActorSecondLvl();

  document.getElementById("startingActualLength").textContent = arr[0];
  document.getElementById("endingActualLength").textContent = arr[1];

  
    if (document.getElementById("startingLength").value != "") {
      arr[0] = document.getElementById("startingLength").value;
      arr[0] = Number(arr[0])
  
    }
  
    if (document.getElementById("endingLength").value != "") {
      arr[1] = document.getElementById("endingLength").value;
      arr[1] = Number(arr[1])
  
    }
    

  let startingLength = arr[0];
  let endingLength = arr[1];

  let floatingLength = 0;
  let floatingLengthoffset = 0;
  let middleSectionMarker = 1;
  // let actualDegree2 = 0;
  let actualDegree = 0;
  let sectionEllipsesCount = 0;
  let sectionEllipsesCounter = 0;

  let x = 0;
  let y = 0;
  let x2 = 0;
  let y2 = 0;
  let typeOneIndex = 0;
  for (let i = 0; i < ellipses.length; i++) {
    if (ellipses[i].type === 1) {
      let mxcell = doc.createElementNS("asd", "mxCell");
      let mxGeometry = doc.createElementNS("asd", "mxGeometry");

      sectionEllipsesCount = findAmountBetweenFirstLvls(ellipses, i);

      floatingLengthoffset =
        (endingLength - startingLength) / sectionEllipsesCount;

      floatingLength = startingLength;

      middleSectionMarker = 1;
      sectionEllipsesCounter = 0;
      // if (sectionEllipsesCount == 0 ) {

      //   actualDegree = actualDegree+ offset ;

      // }

      x =
        actorX +
        lenFromActorFirstLvl *
          cos(
            (((actualDegree + offset * sectionEllipsesCount - actualDegree) /
              2 +
              actualDegree) *
              Math.PI) /
              180
          );
      y =
        actorY +
        lenFromActorFirstLvl *
          sin(
            (((actualDegree + offset * sectionEllipsesCount - actualDegree) /
              2 +
              actualDegree) *
              Math.PI) /
              180
          );

      actualDegree += offset;

      ellipses[i].x = x;
      ellipses[i].y = y;

      mxGeometry.setAttribute("x", x);
      mxGeometry.setAttribute("y", y);

      mxGeometry.setAttribute("width", width);
      mxGeometry.setAttribute("height", height);
      mxGeometry.setAttribute("as", "geometry");

      mxcell.setAttribute("value", ellipses[i].text);
      mxcell.setAttribute("id", ellipses[i].id);
      mxcell.setAttribute("style", "ellipse;whiteSpace=wrap;html=1;");
      mxcell.setAttribute("parent", "1");
      mxcell.setAttribute("vertex", "1");
      mxcell.appendChild(mxGeometry);

      mxcell.appendChild(mxGeometry);
      root.appendChild(mxcell);

      let mainEll_Index = ellipses.findIndex(
        (ecl) => ecl.id === ellipses[i].id
      ); // *i проходов по ellipses
      placeArrow(ellipses, doc, root, mainEll_Index, i, 1, 0);

      typeOneIndex = i;
      //actualDegree2 = 0;
    } else {
      let mxcell = doc.createElementNS("asd", "mxCell");
      let mxGeometry = doc.createElementNS("asd", "mxGeometry");
      //let offset2 = 360/sectionEllipsesCount;

      if (sectionEllipsesCounter >= sectionEllipsesCount / 2) {
        middleSectionMarker = -1;
      }
      sectionEllipsesCounter += 1;
      floatingLength =
        floatingLength + floatingLengthoffset * middleSectionMarker;
      console.log(floatingLength);
      x2 = actorX + floatingLength * cos((actualDegree * Math.PI) / 180);
      y2 = actorY + floatingLength * sin((actualDegree * Math.PI) / 180);
      ellipses[i].x = x2;
      ellipses[i].y = y2;

      actualDegree = actualDegree + offset;
      // actualDegree2 = actualDegree2 + offset2 ;

      mxGeometry.setAttribute("x", x2);
      mxGeometry.setAttribute("y", y2);

      mxGeometry.setAttribute("width", width);
      mxGeometry.setAttribute("height", height);
      mxGeometry.setAttribute("as", "geometry");

      mxcell.setAttribute("value", ellipses[i].text);
      mxcell.setAttribute("id", ellipses[i].id);
      mxcell.setAttribute("style", "ellipse;whiteSpace=wrap;html=1;");
      mxcell.setAttribute("parent", "1");
      mxcell.setAttribute("vertex", "1");
      mxcell.appendChild(mxGeometry);

      mxcell.appendChild(mxGeometry);
      root.appendChild(mxcell);

      placeArrow(
        ellipses,
        doc,
        root,
        typeOneIndex,
        i,
        2,
        typeOneIndex,
        actualDegree,
        2
      );
    }
  }

  mxGraphModel.appendChild(root);
  diagram.appendChild(mxGraphModel);
  mxfile.appendChild(diagram);
}

function placeAllFromCertainEllipse(doc, root, mxGraphModel, diagram, mxfile) {
  let lenFromActorFirstLvl = floatingLengthEllipseFirstLvl();

  
    document.getElementById("toFirstLvlActualLength").textContent = lenFromActorFirstLvl;
  
  
    if (document.getElementById("toFirstLvlLength").value != "") {
      lenFromActorFirstLvl = document.getElementById("toFirstLvlLength").value;
      lenFromActorFirstLvl = Number(lenFromActorFirstLvl);
    }
    

  let width = ellipseWidth; //ширина эллипса
  let height = ellipseHeigth;

  let offset = 360 / ellipses.length;

  // if (!isFinite(offset)) {
  //   offset = 360/(ellipses.length);
  // }

  let arr = floatingLengthEllipseSecondLvl();

  
    document.getElementById("startingActualLength").textContent = arr[0];
    document.getElementById("endingActualLength").textContent = arr[1];
  
  
  
    if (document.getElementById("startingLength").value != "") {
      arr[0] = document.getElementById("startingLength").value;
      arr[0] = Number(arr[0])
  
    }
  
    if (document.getElementById("endingLength").value != "") {
      arr[1] = document.getElementById("endingLength").value;
      arr[1] = Number(arr[1])
  
    }
    

  let startingLength = arr[0];
  let endingLength = arr[1];

  let floatingLength = 0;
  let floatingLengthoffset = 0;
  let middleSectionMarker = 1;
  // let actualDegree2 = 0;
  let actualDegree = 0;
  let sectionEllipsesCount = 0;
  let sectionEllipsesCounter = 0;

  let x = 0;
  let y = 0;
  let x2 = 0;
  let y2 = 0;
  let typeOneIndex = 0;
  //console.log("widdd")

  // let actualDegree2 = 0;

  //lenFromEllipse = width/2 * 2 * Math.cos (offset*2* Math.PI/180)/sin(2*offset*2  *Math.PI/180);

  //let offset = 360/widthOffset/2;

  for (let i = 0; i < ellipses.length; i++) {
    if (ellipses[i].type === 1) {
      let mxcell = doc.createElementNS("asd", "mxCell");
      let mxGeometry = doc.createElementNS("asd", "mxGeometry");

      sectionEllipsesCount = findAmountBetweenFirstLvls(ellipses, i);
      floatingLengthoffset =
        (endingLength - startingLength) / sectionEllipsesCount;
      floatingLength = startingLength;

      middleSectionMarker = 1;
      sectionEllipsesCounter = 0;

      sectionEllipsesCount = findAmountBetweenFirstLvls(ellipses, i);
      //console.log(actualDegree);
      x =
        actorX +
        lenFromActorFirstLvl *
          cos(
            (((actualDegree + offset * sectionEllipsesCount - actualDegree) /
              2 +
              actualDegree) *
              Math.PI) /
              180
          );
      y =
        actorY +
        lenFromActorFirstLvl *
          sin(
            (((actualDegree + offset * sectionEllipsesCount - actualDegree) /
              2 +
              actualDegree) *
              Math.PI) /
              180
          );
      //console.log("act", (actualDegree + offset* sectionEllipsesCount   - actualDegree   ) / 2 + actualDegree    )
      //console.log("x", y)
      ellipses[i].x = x;
      ellipses[i].y = y;

      mxGeometry.setAttribute("x", x);
      mxGeometry.setAttribute("y", y);

      mxGeometry.setAttribute("width", width);
      mxGeometry.setAttribute("height", height);
      mxGeometry.setAttribute("as", "geometry");

      mxcell.setAttribute("value", ellipses[i].text);
      mxcell.setAttribute("id", ellipses[i].id);
      mxcell.setAttribute("style", "ellipse;whiteSpace=wrap;html=1;");
      mxcell.setAttribute("parent", "1");
      mxcell.setAttribute("vertex", "1");
      mxcell.appendChild(mxGeometry);

      mxcell.appendChild(mxGeometry);
      root.appendChild(mxcell);

      let mainEll_Index = ellipses.findIndex(
        (ecl) => ecl.id === ellipses[i].id
      ); // *i проходов по ellipses
      placeArrow(ellipses, doc, root, mainEll_Index, i, 1, 0);

      typeOneIndex = i;
    } else {
      let mxcell = doc.createElementNS("asd", "mxCell");
      let mxGeometry = doc.createElementNS("asd", "mxGeometry");

      if (sectionEllipsesCounter >= sectionEllipsesCount / 2) {
        middleSectionMarker = -1;
      }
      sectionEllipsesCounter += 1;
      floatingLength =
        floatingLength + floatingLengthoffset * middleSectionMarker;

      x2 = x + floatingLength * cos((actualDegree * Math.PI) / 180);
      y2 = y + floatingLength * sin((actualDegree * Math.PI) / 180);
      ellipses[i].x = x2;
      ellipses[i].y = y2;

      actualDegree = actualDegree + offset;

      mxGeometry.setAttribute("x", x2);
      mxGeometry.setAttribute("y", y2);

      mxGeometry.setAttribute("width", width);
      mxGeometry.setAttribute("height", height);
      mxGeometry.setAttribute("as", "geometry");

      mxcell.setAttribute("value", ellipses[i].text);
      mxcell.setAttribute("id", ellipses[i].id);
      mxcell.setAttribute("style", "ellipse;whiteSpace=wrap;html=1;");
      mxcell.setAttribute("parent", "1");
      mxcell.setAttribute("vertex", "1");
      mxcell.appendChild(mxGeometry);

      mxcell.appendChild(mxGeometry);
      root.appendChild(mxcell);

      placeArrow(
        ellipses,
        doc,
        root,
        typeOneIndex,
        i,
        2,
        typeOneIndex,
        actualDegree,
        2
      );
    }
  }

  mxGraphModel.appendChild(root);
  diagram.appendChild(mxGraphModel);
  mxfile.appendChild(diagram);
}

function placeAllFromActorB(
  doc,
  root,
  mxGraphModel,
  diagram,
  mxfile,
  roundOrNot
) {
  ///////////

  let lenFromActorFirstLvl = floatingLengthActorFirstLvlB();

  
    document.getElementById("toFirstLvlActualLength").textContent = lenFromActorFirstLvl;
  
  
    if (document.getElementById("toFirstLvlLength").value != "") {
      lenFromActorFirstLvl = document.getElementById("toFirstLvlLength").value;
      lenFromActorFirstLvl = Number(lenFromActorFirstLvl);
  
    }
  

  let width = ellipseWidth; //ширина эллипса
  let height = ellipseHeigth;

  let offset = 360 / (ellipses.length - countLvlFirst(ellipses));

  if (!isFinite(offset)) {
    offset = 360 / ellipses.length;
  }

  let arr = floatingLengthActorSecondLvlB();

  let startingLength = 0;
  let endingLength = 0;

  if (roundOrNot == 2) {
    arr = forRound();

    document.getElementById("startingActualLength").textContent = arr[0];
    document.getElementById("endingActualLength").textContent = arr[1];

    startingLength = arr[0];
    endingLength = arr[0];
  } else {
    document.getElementById("startingActualLength").textContent = arr[0];
    document.getElementById("endingActualLength").textContent = arr[1];

    
      if (document.getElementById("startingLength").value != "") {
        arr[0] = document.getElementById("startingLength").value;
        arr[0] = Number(arr[0])
    
      }
    
      if (document.getElementById("endingLength").value != "") {
        arr[1] = document.getElementById("endingLength").value;
        arr[1] = Number(arr[1])
    
      }
      

    startingLength = arr[0];
    endingLength = arr[1];
  }

  let floatingLength = 0;
  let floatingLengthoffset = 0;
  let middleSectionMarker = 1;
  // let actualDegree2 = 0;
  let actualDegree = 1;
  let sectionEllipsesCount = 0;
  let sectionEllipsesCounter = 0;

  let x = 0;
  let y = 0;
  let x2 = 0;
  let y2 = 0;
  let typeOneIndex = 0;
  for (let i = 0; i < ellipses.length; i++) {
    if (ellipses[i].type === 1) {
      let mxcell = doc.createElementNS("asd", "mxCell");
      let mxGeometry = doc.createElementNS("asd", "mxGeometry");

      sectionEllipsesCount = findAmountBetweenFirstLvls(ellipses, i);

      floatingLengthoffset =
        (endingLength - startingLength) / sectionEllipsesCount;
      floatingLength = startingLength;

      middleSectionMarker = 1;
      sectionEllipsesCounter = 0;
      if (sectionEllipsesCount == 0) {
        actualDegree = actualDegree + offset; //багуется первый лвл, когда у первого уровня нет подуровней
      }

      x =
        actorX +
        lenFromActorFirstLvl *
          cos(
            (((actualDegree + offset * sectionEllipsesCount - actualDegree) /
              2 +
              actualDegree) *
              Math.PI) /
              180
          );
      y =
        actorY +
        lenFromActorFirstLvl *
          sin(
            (((actualDegree + offset * sectionEllipsesCount - actualDegree) /
              2 +
              actualDegree) *
              Math.PI) /
              180
          );

      console.log(actualDegree);
      console.log(offset);
      console.log(sectionEllipsesCount);

      ellipses[i].x = x;
      ellipses[i].y = y;

      mxGeometry.setAttribute("x", x);
      mxGeometry.setAttribute("y", y);

      mxGeometry.setAttribute("width", width);
      mxGeometry.setAttribute("height", height);
      mxGeometry.setAttribute("as", "geometry");

      mxcell.setAttribute("value", ellipses[i].text);
      mxcell.setAttribute("id", ellipses[i].id);
      mxcell.setAttribute("style", "ellipse;whiteSpace=wrap;html=1;");
      mxcell.setAttribute("parent", "1");
      mxcell.setAttribute("vertex", "1");
      mxcell.appendChild(mxGeometry);

      mxcell.appendChild(mxGeometry);
      root.appendChild(mxcell);

      let mainEll_Index = ellipses.findIndex(
        (ecl) => ecl.id === ellipses[i].id
      ); // *i проходов по ellipses
      placeArrow(ellipses, doc, root, mainEll_Index, i, 1, 0);

      typeOneIndex = i;
      //actualDegree2 = 0;
    } else {
      let mxcell = doc.createElementNS("asd", "mxCell");
      let mxGeometry = doc.createElementNS("asd", "mxGeometry");
      //let offset2 = 360/sectionEllipsesCount;

      if (sectionEllipsesCounter >= sectionEllipsesCount / 2) {
        middleSectionMarker = -1;
      }
      sectionEllipsesCounter += 1;
      floatingLength =
        floatingLength + floatingLengthoffset * middleSectionMarker;

      x2 = actorX + floatingLength * cos((actualDegree * Math.PI) / 180);
      y2 = actorY + floatingLength * sin((actualDegree * Math.PI) / 180);
      ellipses[i].x = x2;
      ellipses[i].y = y2;

      actualDegree = actualDegree + offset;
      // actualDegree2 = actualDegree2 + offset2 ;

      mxGeometry.setAttribute("x", x2);
      mxGeometry.setAttribute("y", y2);

      mxGeometry.setAttribute("width", width);
      mxGeometry.setAttribute("height", height);
      mxGeometry.setAttribute("as", "geometry");

      mxcell.setAttribute("value", ellipses[i].text);
      mxcell.setAttribute("id", ellipses[i].id);
      mxcell.setAttribute("style", "ellipse;whiteSpace=wrap;html=1;");
      mxcell.setAttribute("parent", "1");
      mxcell.setAttribute("vertex", "1");
      mxcell.appendChild(mxGeometry);

      mxcell.appendChild(mxGeometry);
      root.appendChild(mxcell);

      placeArrow(
        ellipses,
        doc,
        root,
        typeOneIndex,
        i,
        2,
        typeOneIndex,
        actualDegree,
        2
      );
    }
  }

  mxGraphModel.appendChild(root);
  diagram.appendChild(mxGraphModel);
  mxfile.appendChild(diagram);
}

function floatingLengthActorFirstLvl() {
  let len = 100;

  let lvl_amount = countLvlFirst();

  if (lvl_amount < 6) {
    len = 200;
    return len;
  } else if (lvl_amount >= 6 && lvl_amount <= 12) {
    len = 270;
    return len;
  } else {
    len = (lvl_amount / 6) * 125;
    return len;
  }
}

function floatingLengthActorFirstLvlB() {
  //////////////////

  let len = 100;

  let lvl_amount = countLvlFirst();
  console.log(lvl_amount, "lvl");
  if (lvl_amount < 6) {
    len = 200;
    return len;
  } else if (lvl_amount >= 6 && lvl_amount <= 12) {
    len = 270;
    return len;
  } else {
    len = (lvl_amount / 6) * 125;
    return len;
  }
}

function floatingLengthEllipseFirstLvl() {
  let len = 100;

  let lvl_amount = countLvlFirst();

  if (lvl_amount < 4) {
    len = 160;
    return len;
  }

  if (lvl_amount < 6) {
    len = 250;
    return len;
  } else if (lvl_amount >= 6 && lvl_amount <= 12) {
    len = 300;
    return len;
  } else {
    len = (lvl_amount / 3) * 120;
    return len;
  }
}

function floatingLengthActorSecondLvl() {
  let arr = [];
  let lvl_amount = ellipses.length;
  if (lvl_amount <= 12) {
    arr.push(410);
    arr.push(410);
    return arr;
  } else if (lvl_amount > 10 && lvl_amount <= 16) {
    arr.push(400);
    arr.push(450);
    return arr;
  } else if (lvl_amount > 16 && lvl_amount <= 20) {
    arr.push(400);
    arr.push(450);
    return arr;
  } else if (lvl_amount > 20 && lvl_amount < 30) {
    arr.push(450);
    arr.push(900);
    return arr;
  } else if (lvl_amount >= 30 && lvl_amount < 40) {
    arr.push(500);
    arr.push(1100);
    return arr;
  } else if (lvl_amount >= 40 && lvl_amount < 50) {
    arr.push(600);
    arr.push(1300);
    return arr;
  } else if (lvl_amount >= 50 && lvl_amount < 70) {
    arr.push(650);
    arr.push(650 * Math.E);
    return arr;
  } else {
    arr.push((ellipses.length * 100) / 7); //для сотки хорошо работает, для двух вроде тоже
    arr.push((ellipses.length * 100) / 5);
    return arr;
  }
}

function floatingLengthActorSecondLvlB() {
  ////////////////

  let arr = [];
  let lvl_amount = ellipses.length;
  if (lvl_amount <= 12) {
    arr.push(370);
    arr.push(500);
    return arr;
  } else if (lvl_amount > 10 && lvl_amount <= 16) {
    arr.push(350);
    arr.push(430);
    return arr;
  } else if (lvl_amount > 16 && lvl_amount <= 20) {
    arr.push(380);
    arr.push(550);
    return arr;
  } else if (lvl_amount > 20 && lvl_amount < 30) {
    arr.push(400);
    arr.push(900);
    return arr;
  } else if (lvl_amount >= 30 && lvl_amount < 40) {
    arr.push(550);
    arr.push(1100);
    return arr;
  } else if (lvl_amount >= 40 && lvl_amount < 45) {
    arr.push(550);
    arr.push(1100);
    return arr;
  } else if (lvl_amount >= 45 && lvl_amount < 50) {
    arr.push(650);
    arr.push(1200);
    return arr;
  } else if (lvl_amount >= 50 && lvl_amount < 70) {
    arr.push(970);
    arr.push(970 * 3.5);
    return arr;
  } else {
    arr.push((ellipses.length * 100) / 7); //для сотки хорошо работает, для двух вроде тоже
    arr.push((ellipses.length * 100) / 3);
    return arr;
  }
}

function floatingLengthEllipseSecondLvl() {
  let arr = [];
  let lvl_amount = ellipses.length;
  if (lvl_amount <= 12) {
    arr.push(250);
    arr.push(250);
    return arr;
  } else if (lvl_amount > 12 && lvl_amount <= 20) {
    arr.push(390);
    arr.push(390);
    return arr;
  } else if (lvl_amount > 20 && lvl_amount < 30) {
    arr.push(450);
    arr.push(650);
    return arr;
  } else if (lvl_amount >= 30 && lvl_amount < 40) {
    arr.push(500);
    arr.push(920);
    return arr;
  } else if (lvl_amount >= 40 && lvl_amount < 50) {
    arr.push(600);
    arr.push(1300);
    return arr;
  } else {
    arr.push((ellipses.length * 100) / 7); //для сотки хорошо работает, для двух вроде тоже
    arr.push((ellipses.length * 100) / 5);
    return arr;
  }
}

function forRound() {
  let arr = [];
  let lvl_amount = ellipses.length;
  if (lvl_amount <= 6) {
    arr.push(300);
    arr.push(300);
    return arr;
  } else if (lvl_amount > 10 && lvl_amount <= 16) {
    arr.push(400);
    arr.push(400);
    return arr;
  } else if (lvl_amount > 16 && lvl_amount <= 20) {
    arr.push(400);
    arr.push(450);
    return arr;
  } else if (lvl_amount > 20 && lvl_amount < 30) {
    arr.push(550);
    arr.push(550);
    return arr;
  } else if (lvl_amount >= 30 && lvl_amount < 40) {
    arr.push(700);
    arr.push(700);
    return arr;
  } else if (lvl_amount >= 40 && lvl_amount < 50) {
    arr.push(800);
    arr.push(800);
    return arr;
  } else if (lvl_amount >= 50 && lvl_amount < 70) {
    arr.push(650);
    arr.push(650 * Math.E);
    return arr;
  } else {
    arr.push((ellipses.length * 100) / 7); //для сотки хорошо работает, для двух вроде тоже
    arr.push((ellipses.length * 100) / 5);
    return arr;
  }
}

function changePosition(
  ellipses,
  mainEllIndex,
  currentEllipseIndex,
  root,
  degrees,
  basex,
  basey,
  len,
  type
) {
  let check = true;
  let i = 0;

  let id = `${ellipses[mainEllIndex].id}`;

  while (check) {
    if (root.getElementsByTagName("mxCell")[i].attributes.id.value === id) {
      root
        .getElementsByTagName("mxCell")
        [i].getElementsByTagName("mxGeometry")[0]
        .setAttribute(
          "x",
          Math.round(toDegrees(cos(toRadians(degrees)) * len))
        );
      root
        .getElementsByTagName("mxCell")
        [i].getElementsByTagName("mxGeometry")[0]
        .setAttribute(
          "y",
          Math.round(toDegrees(sin(toRadians(degrees)) * len))
        );
      console.log("POSITION CHANGE");
      console.log(degrees);
      console.log(
        root
          .getElementsByTagName("mxCell")
          [i].getElementsByTagName("mxGeometry")[0].attributes
      );
      ellipses[i].x = Math.round(toDegrees(cos(toRadians(degrees)) * len));
      ellipses[i].y = Math.round(toDegrees(sin(toRadians(degrees)) * len));

      check = false;
    }
    i++;
  }

  // while (check) {
  //   if (root.getElementsByTagName("mxCell")[i].attributes.id.value === id) {
  //     console.log(root.getElementsByTagName("mxCell")[i].attributes.value);
  //     console.log("ABOBA");
  //     // x = root.getElementsByTagName("mxCell")[i].getElementsByTagName("mxGeometry")[0].attributes.x.value;
  //     // y = root.getElementsByTagName("mxCell")[i].getElementsByTagName("mxGeometry")[0].attributes.y.value;
  //     if (degrees >=0 && degrees <=90) {
  //       root.getElementsByTagName("mxCell")[i].getElementsByTagName("mxGeometry")[0].setAttribute("x", "0");
  //       root.getElementsByTagName("mxCell")[i].getElementsByTagName("mxGeometry")[0].setAttribute("y", "0");
  //     }
  //     else if (degrees >=90 && degrees <180) {

  //       root.getElementsByTagName("mxCell")[i].getElementsByTagName("mxGeometry")[0].setAttribute("x", "0");

  //       root.getElementsByTagName("mxCell")[i].getElementsByTagName("mxGeometry")[0].setAttribute("y", "0");
  //     } else if (degrees >=180 && degrees <=270) {

  //       root.getElementsByTagName("mxCell")[i].getElementsByTagName("mxGeometry")[0].setAttribute("x", "0");

  //       root.getElementsByTagName("mxCell")[i].getElementsByTagName("mxGeometry")[0].setAttribute("y", "0");

  //     } else if (degrees >=270 && degrees <=360) {

  //       root.getElementsByTagName("mxCell")[i].getElementsByTagName("mxGeometry")[0].setAttribute("x", "0");

  //       root.getElementsByTagName("mxCell")[i].getElementsByTagName("mxGeometry")[0].setAttribute("y", "0");

  //     }
  //     //console.log( root.getElementsByTagName("mxCell")[i].getElementsByTagName("mxGeometry")[0].text.value)
  //     //console.log(root.getElementsByTagName("mxCell")[i].getElementsByTagName("mxGeometry")[0].attributes.x.value);
  //     //console.log("победа")
  //     check = false;
  //   }
  //   i++;
  // }
}

function lenFindFirstLvl() {
  let len = 5.5;

  let lvl_amount = countLvlFirst();

  if (lvl_amount < 12) {
    len = 4;
    return len;
  } else {
    len = 4 + ((lvl_amount - 12) / 2) * 0.7;
    return len;
  }
}
function lenFindSecondLvlActorBase() {
  let arr = [];
  let lvl_amount = ellipses.length;
  if (lvl_amount <= 10) {
    arr.push(8);
    arr.push(8);
    return arr;
  } else if (lvl_amount > 10 && lvl_amount <= 20) {
    arr.push(8);
    arr.push(10);
    return arr;
  } else if (lvl_amount > 20 && lvl_amount < 30) {
    arr.push(8);
    arr.push(12);
    return arr;
  } else if (lvl_amount >= 30 && lvl_amount < 40) {
    arr.push(8.5);
    arr.push(14);
    return arr;
  } else if (lvl_amount >= 40 && lvl_amount < 50) {
    arr.push(10);
    arr.push(15);
    return arr;
  } else if (lvl_amount >= 50 && lvl_amount < 70) {
    arr.push(12);
    arr.push(12 * Math.E + 2);
    return arr;
  } else {
    arr.push((ellipses.length / 14) * 4); //для сотки хорошо работает, для двух вроде тоже
    arr.push((ellipses.length / 14) * 0.95 * 2);
    return arr;
  }
}
function lenFindSecondLvlEllipseBase() {
  let arr = [];
  let lvl_amount = ellipses.length;
  if (lvl_amount <= 10) {
    arr.push(4);
    arr.push(5);
    return arr;
  } else if (lvl_amount > 10 && lvl_amount < 30) {
    arr.push(6.5);
    arr.push(14);
    return arr;
  } else if (lvl_amount >= 30 && lvl_amount < 40) {
    arr.push(6.5);
    arr.push(15);
    return arr;
  } else if (lvl_amount >= 40 && lvl_amount < 50) {
    arr.push(8);
    arr.push(16);
    return arr;
  } else if (lvl_amount >= 50 && lvl_amount < 60) {
    arr.push(9);
    arr.push(9 * Math.E);
    return arr;
  } else {
    arr.push((ellipses.length / 20) * 1.8); //для сотки хорошо работает, для двух вроде тоже
    arr.push((ellipses.length / 20) * 2 * Math.E);
    return arr;
  }
}

function countLvlFirst() {
  let counter = 0;
  for (let i = 0; i < ellipses.length; i++) {
    if (ellipses[i].type === 1) {
      counter++;
    }
  }
  return counter;
}
function typeCounter(ellipses, id) {
  //считает количество между первыми уровнями диаграммы
  //let counte = ellipses.map(e => e.id).indexOf(id);
  let counter = 0;
  let mainEll_Index = ellipses.findIndex((ecl) => ecl.id === id);
  mainEll_Index++;
  for (let i = mainEll_Index; i < ellipses.length; i++) {
    if (ellipses[i].type === 2) {
      counter++;
    } else break;
  }
  if (counter !== 0) {
    return counter;
  } else return 1;
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
  
  

export {
    placeFirstLvl,
    placeSecondLvl,
    placeAllFromCertainEllipse,
    placeAllFromActor,
    placeAllFromActorB

};