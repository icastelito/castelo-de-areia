import React, { useEffect, useState } from 'react';
import './FloatingElements.css';

interface FloatingElement {
  id: number;
  left: number;
  delay: number;
  size: number;
  color: string;
}

export const FloatingElements: React.FC = () => {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const colors = [
      'var(--accent-primary)',
      'var(--accent-secondary)', 
      '#00ffff',
      '#ff006e',
      '#39ff14',
      '#8338ec'
    ];

    const newElements: FloatingElement[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      size: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    setElements(newElements);
  }, []);

  return (
    <div className="floating-elements">
      {elements.map(element => (
        <div
          key={element.id}
          className="floating-element"
          style={{
            left: `${element.left}%`,
            animationDelay: `${element.delay}s`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            background: element.color,
            boxShadow: `0 0 ${element.size * 3}px ${element.color}`
          }}
        />
      ))}
    </div>
  );
};
