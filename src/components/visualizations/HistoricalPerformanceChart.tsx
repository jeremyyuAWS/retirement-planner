import React, { useEffect, useRef } from 'react';

interface HistoricalDataPoint {
  date: string;
  value: number;
}

interface HistoricalPerformanceChartProps {
  data: HistoricalDataPoint[];
  color: string;
}

const HistoricalPerformanceChart: React.FC<HistoricalPerformanceChartProps> = ({ data, color }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        const width = canvas.width;
        const height = canvas.height;
        const padding = 40;
        
        // Clear canvas
        context.clearRect(0, 0, width, height);
        
        // Find min and max values
        const values = data.map(d => d.value);
        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);
        const valueRange = maxValue - minValue;
        
        // Calculate scales
        const xScale = (width - 2 * padding) / (data.length - 1);
        const yScale = (height - 2 * padding) / valueRange;
        
        // Draw grid lines
        context.strokeStyle = '#e5e7eb';
        context.setLineDash([5, 5]);
        
        // Horizontal grid lines
        const numHorizontalLines = 5;
        for (let i = 0; i <= numHorizontalLines; i++) {
          const y = height - padding - (i * (height - 2 * padding) / numHorizontalLines);
          context.beginPath();
          context.moveTo(padding, y);
          context.lineTo(width - padding, y);
          context.stroke();
          
          // Draw value labels
          const value = minValue + (i * valueRange / numHorizontalLines);
          context.fillStyle = '#6b7280';
          context.font = '10px Arial';
          context.textAlign = 'right';
          context.fillText(
            `$${Math.round(value).toLocaleString()}`,
            padding - 5,
            y + 3
          );
        }
        
        context.setLineDash([]);
        
        // Draw line
        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = 2;
        
        data.forEach((point, index) => {
          const x = padding + index * xScale;
          const y = height - padding - (point.value - minValue) * yScale;
          
          if (index === 0) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        });
        
        context.stroke();
        
        // Draw data points
        data.forEach((point, index) => {
          const x = padding + index * xScale;
          const y = height - padding - (point.value - minValue) * yScale;
          
          context.beginPath();
          context.arc(x, y, 4, 0, 2 * Math.PI);
          context.fillStyle = color;
          context.fill();
          
          // Draw date labels for every 3rd point
          if (index % 3 === 0) {
            context.fillStyle = '#6b7280';
            context.font = '10px Arial';
            context.textAlign = 'center';
            context.fillText(
              point.date,
              x,
              height - padding + 15
            );
          }
        });
      }
    }
  }, [data, color]);

  return (
    <canvas ref={canvasRef} width={400} height={250} className="max-w-full" />
  );
};

export default HistoricalPerformanceChart; 