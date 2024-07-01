import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SimonGame from '../components/simonGame';

describe('SimonGame', () => {
  test('renders Play button initially', () => {
    render(<SimonGame />);
    expect(screen.getByText('Play')).toBeInTheDocument();
  });

  test('starts the game when Play button is clicked', () => {
    render(<SimonGame />);
    fireEvent.click(screen.getByText('Play'));
    expect(screen.queryByText('Play')).not.toBeInTheDocument();
  });

  test('shows the sequence when a level is started', async () => {
    render(<SimonGame />);
    fireEvent.click(screen.getByText('Play'));
    await waitFor(() => {
      expect(screen.queryByText('1')).toBeInTheDocument();
    });
  });

  test('handles correct sequence input', async () => {
    render(<SimonGame />);
    fireEvent.click(screen.getByText('Play'));
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);
    await waitFor(() => {
      expect(screen.queryByText('2')).toBeInTheDocument();
    });
  });

  test('handles incorrect sequence input and resets', async () => {
    render(<SimonGame />);
    fireEvent.click(screen.getByText('Play'));
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]); // Click wrong button
    await waitFor(() => {
      expect(screen.queryByText('Play')).toBeInTheDocument();
    });
  });

  test('displays high scores correctly', () => {
    localStorage.setItem('highScores', JSON.stringify([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]));
    render(<SimonGame />);
    fireEvent.click(screen.getByText('Play'));
    const scores = screen.getAllByRole('listitem');
    expect(scores.length).toBe(10);
    expect(scores[0]).toHaveTextContent('10');
  });
});
