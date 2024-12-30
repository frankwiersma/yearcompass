import html2pdf from 'html2pdf.js';

export async function generatePDF(element: HTMLElement): Promise<void> {
  const opt = {
    margin: [15, 15, 15, 15],
    filename: `year-review-${new Date().toISOString().split('T')[0]}.pdf`,
    image: { 
      type: 'jpeg', 
      quality: 1.0
    },
    html2canvas: { 
      scale: 3,
      useCORS: true,
      letterRendering: true,
      scrollY: -window.scrollY,
      windowWidth: element.offsetWidth
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait',
      compress: true
    }
  };

  try {
    const pdf = html2pdf().set(opt);
    
    // Remove scrolling constraints before generating
    element.style.maxHeight = 'none';
    element.style.overflow = 'visible';
    
    await pdf.from(element).save();
    
    // Restore scrolling constraints
    element.style.maxHeight = '70vh';
    element.style.overflow = 'auto';
    
    return Promise.resolve();
  } catch (error) {
    console.error('Error generating PDF:', error);
    return Promise.reject(error);
  }
}