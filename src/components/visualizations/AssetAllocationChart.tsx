import React, { useEffect, useRef } from 'react';

interface AssetAllocationData {
  category: string;
  value: number;
  color: string;
}

interface AssetAllocationChartProps {
  data: AssetAllocationData[];
}

const AssetAllocationChart: React.FC<AssetAllocationChartProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2 - 20;
        const innerRadius = radius * 0.6;
        
        // Clear canvas
        context.clearRect(0, 0, width, height);
        
        // Calculate total value
        const total = data.reduce((sum, item) => sum + item.value, 0);
        
        // Draw donut chart
        let startAngle = 0;
        data.forEach((item) => {
          const sliceAngle = (item.value / total) * 2 * Math.PI;
          
          // Draw outer arc
          context.beginPath();
          context.moveTo(centerX, centerY);
          context.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
          context.closePath();
          context.fillStyle = item.color;
          context.fill();
          
          // Draw inner arc (to create donut)
          context.beginPath();
          context.moveTo(centerX, centerY);
          context.arc(centerX, centerY, innerRadius, startAngle, startAngle + sliceAngle);
          context.closePath();
          context.fillStyle = '#ffffff';
          context.fill();
          
          // Draw label
          const midAngle = startAngle + sliceAngle / 2;
          const labelRadius = (radius + innerRadius) / 2;
          const labelX = centerX + Math.cos(midAngle) * labelRadius;
          const labelY = centerY + Math.sin(midAngle) * labelRadius;
          
          context.fillStyle = '#6b7280';
          context.font = '10px Arial';
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          context.fillText(
            `${item.category} (${Math.round((item.value / total) * 100)}%)`,
            labelX,
            labelY
          );
          
          startAngle += sliceAngle;
        });
      }
    }
  }, [data]);

  return (
    <canvas ref={canvasRef} width={300} height={300} className="max-w-full" />
  );
};

export default AssetAllocationChart; 