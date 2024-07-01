import { render, screen, fireEvent } from '@testing-library/react';
import GameButton from '../components/gameButton';

describe('GameButton', () => {
  test('renders button with correct classes', () => {
    render(<GameButton border="rounded-tl-full" bg="bg-green-500" onClick={() => {}} color="green" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('rounded-tl-full bg-green-500');
  });

  test('handles click event', () => {
    const handleClick = jest.fn();
    render(<GameButton border="rounded-tl-full" bg="bg-green-500" onClick={handleClick} color="green" />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
