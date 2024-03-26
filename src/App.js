import { useState } from 'react';
import './App.css';
import { boardsStore } from './consts/consts';

function App() {
  const [boards, setBoards] = useState(boardsStore);
  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  const dragOverHandler = (e) => {
    e.preventDefault();
    if (e.target.className === 'item') {
        e.target.style.boxShadow = '0 4px 3px gray'
    }
  }

  const dragLeaveHandler = (e) => {
    e.target.style.boxShadow = 'none'
  }

  const dragStartHandler = (e, board, item) => {
    setCurrentBoard(board);
    setCurrentItem(item);
  }

  const dragEndHandler = (e) => {
    e.target.style.boxShadow = 'none'
  }

  const dropHandler = (e, board, item) => {
    e.preventDefault();
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentItem);

    setBoards(boards.map(b => {
        if (b.id === board.id) {
            return board;
        }

        if (b.id === currentBoard.id) {
            return currentBoard;
        }

        return b;
    }
    ))
  }

  const dropCardHandler = (e, board) => {
    board.items.push(currentItem);
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);

    setBoards(boards.map(b => {
        if (b.id === board.id) {
            return board;
        }

        if (b.id === currentBoard.id) {
            return currentBoard;
        }

        return b;
    }
    ))
  }

  return (
    <div className='app'> 
        {boards.map(board =>
            <div 
                className='board'
                onDragOver={e => dragOverHandler(e)}
                onDrop={e => dropCardHandler(e, board)}
            >
                <div 
                    className='board__title'
                    key={board.id}
                >
                    {board.title}
                </div>
                {board.items.map(item =>
                    <div
                        onDragOver={e => dragOverHandler(e)}
                        onDragLeave={e => dragLeaveHandler(e)}
                        onDragStart={e => dragStartHandler(e, board, item)}
                        onDragEnd={e => dragEndHandler(e)}
                        onDrop={e => dropHandler(e, board, item)}
                        draggable={true}
                        className='item'
                        key={item.id}
                    >
                        {item.title}
                    </div>
                )}
            </div>  
        )}
    </div>
  );
}

export default App;
