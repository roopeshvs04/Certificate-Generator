const userName = document.getElementById("name");
const submitBtn = document.getElementById("submitBtn");

const { PDFDocument, rgb, degrees } = PDFLib;


const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase()
  );

submitBtn.addEventListener("click", () => {
  const val = capitalize(userName.value);
  if (val.trim() !== "" && userName.checkValidity()) {
    generatePDF(val);
  } else {
    userName.reportValidity();
  }
});

const generatePDF = async (name) => {
  const existingPdfBytes = await fetch("./Certificate.pdf").then((res) =>
    res.arrayBuffer()
  );

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);

  const fontBytes = await fetch("./Sanchez-Regular.ttf").then((res) =>
    res.arrayBuffer()
  );

  const SanChezFont = await pdfDoc.embedFont(fontBytes);

  // Get the first page of the document
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  firstPage.drawText(name, {
    x: 255,
    y: 255,
    size: 50,
    font: SanChezFont,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
  console.log("Done creating");

  var file = new File(
    [pdfBytes],
    "tefoLOGIC Achivement Certificate.pdf",
    {
      type: "application/pdf;charset=utf-8",
    }
  );
 saveAs(file);
};

// init();
