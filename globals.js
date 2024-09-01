// Экспорт глобальных переменных
export let ellipses = [];
export let line = [];
export let includeLine = [];
export let extendLine = [];
export let lines = [];
export let actorX = 370;
export let actorY = 280;
export let actorWidth = 30;
export let actorHeight = 60;
export let ellipseWidth = 120;
export let ellipseHeigth = 80;
export let placeType = -1;
export let actorName = "";
export let svgTargetSizeW = 1700;

export function nullEllipses() {
    ellipses = [];
}

export function nullLine() {
    line = [];
}
export function nullIncludeLine() {
    includeLine = [];
}

export function nullExtendLine() {
    extendLine = [];
}

export function nullLines() {
    lines = [];
}

export function setPlaceType(newPlaceType) {
    placeType = newPlaceType;
}

export function setSvgTargetSizeW(newSvgWidth) {
    svgTargetSizeW = newSvgWidth;
}