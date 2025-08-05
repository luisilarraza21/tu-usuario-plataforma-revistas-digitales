import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ViewFlipbook() {
  const { id } = useParams();
  const flipbookRef = React.useRef(null);

  useEffect(() => {
    const loadPDF = async () => {
      try {
        const res = await axios.get(`https://tu-backend.vercel.app/api/pdf/flipbook/${id}`);
        const pdfUrl = res.data.pdfUrl;
        const pdf = await window.pdfjsLib.getDocument(pdfUrl).promise;
        const container = flipbookRef.current;
        container.innerHTML = '';

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const canvas = document.createElement('canvas');
          container.appendChild(canvas);
          const context = canvas.getContext('2d');
          const viewport = page.getViewport({ scale: 1 });
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          await page.render({ canvasContext: context, viewport }).promise;
        }

        $(flipbookRef.current).turn({
          width: 800,
          height: 600,
          autoCenter: true,
        });
      } catch (err) {
        console.error('Error al cargar el flipbook', err);
      }
    };

    loadPDF();
  }, [id]);

  return <div ref={flipbookRef} className="mx-auto"></div>;
}

export default ViewFlipbook;
