const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const moveSound = document.getElementById('moveSound');
const winSound = document.getElementById('winSound');
const drawSound = document.getElementById('drawSound');
const toggleTheme = document.getElementById('toggle-theme');
const xScoreEl = document.getElementById('xScore');
const oScoreEl = document.getElementById('oScore');
const drawsEl = document.getElementById('draws');

let currentPlayer = 'X';
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];
let scores = { X: 0, O: 0, D: 0 };

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  moveSound.play();

  const winIndex = checkWinner();
  if (winIndex !== null) {
    gameActive = false;
    highlightWin(winConditions[winIndex]);
    statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
    winSound.play();
    scores[currentPlayer]++;
    updateScore();
  } else if (!board.includes("")) {
    statusText.textContent = "It's a draw!";
    drawSound.play();
    gameActive = false;
    scores.D++;
    updateScore();
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return i;
    }
  }
  return null;
}

function highlightWin(indices) {
  indices.forEach(i => cells[i].classList.add('winning'));
}

function restartGame() {
  currentPlayer = 'X';
  gameActive = true;
  board = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('winning');
  });
}

function updateScore() {
  xScoreEl.textContent = scores.X;
  oScoreEl.textContent = scores.O;
  drawsEl.textContent = scores.D;
}

toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toggleTheme.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);
