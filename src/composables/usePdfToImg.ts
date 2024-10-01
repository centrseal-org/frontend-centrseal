import PdfToImg from "pdftoimg-js";

export function usePdfToImg() {
  const convertPdfToImage = async (file: any) => {
    let img;
    if (!file) {
      return;
    }
    img = await PdfToImg(file);
    return img[0];
  };

  return {
    convertPdfToImage,
  };
}
