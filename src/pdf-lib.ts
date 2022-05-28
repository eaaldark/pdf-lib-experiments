import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from 'fs'

export const createPdf = async()=> {
  const pdfDoc = await PDFDocument.create();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  const arrayDatos = [
    { name: "Carlos", lastname: "Oviedo", year: 15 },
    { name: "Juliana", lastname: "Mosquera", year: 30 },
    { name: "Maria", lastname: "Lopez", year: 45 },
  ];

  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  const fontSize = 30;

  let position: number = 0
  
  arrayDatos.map(data => {
    page.drawText(
      `Usuario ${data.name} ${data.lastname} de ${data.year} años de edad\n`,
      {
        x: 50,
        y: height + position - 4 * fontSize,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0.53, 0.71),
      }
    );
    position += 40
  })


 return fs.writeFileSync('./files/output.pdf', await pdfDoc.save());
}
