function downloadFile(string, fileName) {
  const str = string;

  var file = new Blob([str], { type: "application/xml" });
  var url = URL.createObjectURL(file);
  let a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
}
function retrieveXML() {
  try {
    return localStorage.getItem("xmlData");
  } catch (error) {
    console.log("При первом запуске программы нечего скачивать");
    alert("При первом запуске программы нечего скачивать");
  }
}

function downloadXmlByButton() {
  const xml = retrieveXML();
  downloadFile(prettifyXml(xml), "diagram");
}
function downloadSvgByButton() {
  try {
    let prev = document.getElementById("svg").innerHTML;

    downloadSvg(prettifyXml(prev), "diagram");
  } catch (error) {
    console.log("Сначала нужно разместить диаграмму");
  }
}
function downloadSvg(string, fileName) {
  const str = string;

  var file = new Blob([str], { type: "image/svg+xml" });
  var url = URL.createObjectURL(file);
  let a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
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