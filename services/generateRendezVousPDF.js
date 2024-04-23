/* import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';
import * as FileSystem from 'expo-file-system';

export const generateRendezVousPDF = async (center, date, userId) => {
    try {
      // Create a new PDF document
  const page = PDFPage
  .create()
  .setMediaBox(200, 200)
 // .drawText(content)
 
      // Add content to the PDF
    //  const page = pdfDoc.addPage(); // Check if page is undefined
      if (page) {
        const content = `Rendezvous Information:\n\nCenter: ${center}\nDate: ${date}\nUser ID: ${userId}`;
      //  const text = await PDFText.create(content);
        page.drawText(content);
        const pdfPath = `${RNFS.DocumentDirectoryPath}/rendezvous.pdf`;

        PDFDocument
  .create(pdfPath)
  .addPages(page)
  .write() // Returns a promise that resolves with the PDF's path
  .then(path => {
    console.log('PDF created at: ' + path);
    return path; // Return the path of the generated PDF

    // Do stuff with your shiny new PDF!
  });

  
      } else {
        throw new Error('Failed to create PDF page');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  };
   */