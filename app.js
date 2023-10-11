console.log("Yello");
// var viz = new tableau.Viz(placeholderDiv, url, options)
// rerference the place holder div which we put in as div
let viz;
const placeholderDiv = document.getElementById("vontaizCiner");
// wprks cah given the elemtn an id element like div
// get a url
const url =
  "https://public.tableau.com/views/EmbeddingWorkbookProfitsAcrossME-Asia/OfficeSupplyProfitsacrossMEandAsia?:language=en-US&:display_count=n&:origin=viz_share_link";
const options = {
  device: "desktop",
  height: "800px",
  width: "2100px",
};

function initViz() {
  //    has multiple values and is object so syntax

  viz = new tableau.Viz(placeholderDiv, url, options);
}
// let assings as a variable opposed to a constant
initViz();

// listen for content to be loaded (looking for trigger)
//document refers to entire html
document.addEventListener("DOMContentLoaded", initViz);

// buttons
const exportpdfbutton = document.getElementById("exportPDF");

function exportPDFfunction() {
  viz.showExportPDFDialog();
}

exportpdfbutton.addEventListener("click", exportPDFfunction);
const exportPowerpointbutton = document.getElementById("exportPowerpoint");
const filterButton = document.getElementById("FilterButton");
// at the start viz is an empty function, once everything is loaded then its defined, after this its then passed as the same foreward
function exportPowerpoint() {
  viz.showExportPowerPointDialog();
}
exportPowerpointbutton.addEventListener("click", exportPowerpoint);
filterButton.addEventListener("click", getRangeValues);

//get range values
function getRangeValues() {
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);
  // need to get active sheet, but this could be a dashboard or worksheet
  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();
  //inspect the sheets to filter
  console.log(sheets);
  const sheetForFilter = sheets[0];
  console.log(sheetForFilter);
  sheetForFilter
    .applyRangeFilterAsync("SUM(Sales)", { min: minValue, max: maxValue })
    .then(alert("Filtered!"));
}
