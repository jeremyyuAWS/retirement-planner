import React, { useEffect, useRef } from 'react';

interface ProjectedValueChartProps {
  data: {
    year: number;
    value: number;
  }[];
  color: string;
}

const ProjectedValueChart: React.FC<ProjectedValueChartProps> = ({ data, color }) => {
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
        
        // Find max value
        const maxValue = Math.max(...data.map(d => d.value));
        
        // Calculate scales
        const barWidth = (width - 2 * padding) / data.length - 10;
        const yScale = (height - 2 * padding) / maxValue;
        
        // Draw bars
        data.forEach((point, index) => {
          const x = padding + index * (barWidth + 10);
          const barHeight = point.value * yScale;
          const y = height - padding - barHeight;
          
          // Draw bar
          context.fillStyle = color;
          context.fillRect(x, y, barWidth, barHeight);
          
          // Draw value label
          context.fillStyle = '#6b7280';
          context.font = '10px Arial';
          context.textAlign = 'center';
          context.fillText(
            `$${Math.round(point.value).toLocaleString()}`,
            x + barWidth / 2,
            y - 5
          );
          
          // Draw year label
          context.fillText(
            point.year.toString(),
            x + barWidth / 2,
            height - padding + 15
          );
        });
      }
    }
  }, [data, color]);

  return (
    <canvas ref={canvasRef} width={400} height={250} className="max-w-full" />
  );
};

export default ProjectedValueChart; 