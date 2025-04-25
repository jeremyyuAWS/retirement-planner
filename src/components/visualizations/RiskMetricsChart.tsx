import React, { useEffect, useRef } from 'react';

interface RiskMetric {
  name: string;
  value: number;
  benchmark: number;
  color: string;
}

interface RiskMetricsChartProps {
  data: RiskMetric[];
}

const RiskMetricsChart: React.FC<RiskMetricsChartProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        const width = canvas.width;
        const height = canvas.height;
        const padding = 40;
        const barHeight = 20;
        const spacing = 30;
        
        // Clear canvas
        context.clearRect(0, 0, width, height);
        
        // Find max value
        const maxValue = Math.max(
          ...data.map(d => Math.max(d.value, d.benchmark))
        );
        
        // Calculate x scale
        const xScale = (width - 2 * padding) / maxValue;
        
        // Draw bars
        data.forEach((metric, index) => {
          const y = padding + index * (barHeight + spacing);
          
          // Draw benchmark line
          context.strokeStyle = '#d1d5db';
          context.setLineDash([5, 5]);
          context.beginPath();
          context.moveTo(padding + metric.benchmark * xScale, y - 5);
          context.lineTo(padding + metric.benchmark * xScale, y + barHeight + 5);
          context.stroke();
          context.setLineDash([]);
          
          // Draw value bar
          context.fillStyle = metric.color;
          context.fillRect(
            padding,
            y,
            metric.value * xScale,
            barHeight
          );
          
          // Draw labels
          context.fillStyle = '#6b7280';
          context.font = '10px Arial';
          context.textAlign = 'left';
          context.fillText(metric.name, padding, y - 5);
          
          context.textAlign = 'right';
          context.fillText(
            metric.value.toFixed(2),
            padding + metric.value * xScale - 5,
            y + barHeight / 2 + 3
          );
          
          // Draw benchmark label
          context.textAlign = 'left';
          context.fillText(
            `Benchmark: ${metric.benchmark.toFixed(2)}`,
            padding + metric.benchmark * xScale + 5,
            y + barHeight / 2 + 3
          );
        });
      }
    }
  }, [data]);

  return (
    <canvas ref={canvasRef} width={400} height={250} className="max-w-full" />
  );
};

export default RiskMetricsChart; 