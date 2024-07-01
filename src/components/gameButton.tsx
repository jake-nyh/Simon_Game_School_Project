"use client"
import React, { forwardRef, ForwardedRef, MouseEventHandler } from 'react';

interface GameButtonProps {
  border: string;
  bg: string;
  color: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const GameButton = forwardRef<HTMLButtonElement, GameButtonProps>(({ border, bg, onClick, color }, ref: ForwardedRef<HTMLButtonElement>) => {
  return (
    <button
      className={`${border} ${bg} w-[175px] sm:w-[200px] h-[175px] sm:h-[200px] m-2 duration-200 hover:scale-105`}
      onClick={onClick}
      ref={ref}
      color={color}
    >
      {color}
    </button>
  );
});

export default GameButton;
