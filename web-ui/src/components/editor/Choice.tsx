import React, { useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { XYCoord } from 'dnd-core';

export interface ChoiceData {
  name: string;
  text: string;
  feedback: string;
}

interface ChoiceProps {
  isCorrect: boolean;
  choice: ChoiceData;
  index: number;
  removeChoice: (name: string) => void;
  moveChoice: (dragIndex: number, hoverIndex: number) => void;
  updateText: (text: string) => void;
  updateFeedback: (feedback: string) => void;
  updateCorrect: () => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const Choice = ({
  isCorrect,
  index,
  choice,
  moveChoice,
  removeChoice,
  updateFeedback,
  updateText,
  updateCorrect,
}: ChoiceProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: 'choice',
    hover(item: DragItem, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) return;

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveChoice(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'choice', id: choice.name, index },
    collect: monitor => ({ isDragging: monitor.isDragging() }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0 : 1 }}
      className='my-3 rounded border-2 relative cursor-move'
    >
      <div className='flex items-stretch'>
        <div className='flex items-center text-white px-2 bg-blue-400'>
          <i className='fas fa-grip-lines' />
        </div>
        <div className='flex-1 p-4'>
          <div className='grid grid-cols-2 gap-5'>
            <div>
              <label className='text-gray-700'>Text</label>
              <input
                value={choice.text}
                onChange={e => updateText(e.target.value)}
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              />
            </div>
            <div>
              <label className='text-gray-700'>Feedback</label>
              <input
                value={choice.feedback}
                onChange={e => updateFeedback(e.target.value)}
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              />
            </div>
          </div>
          <div className='mt-3'>
            <label className='text-gray-700'>Correct</label>
            <input
              type='checkbox'
              value={choice.feedback}
              checked={isCorrect}
              onChange={updateCorrect}
              className='bg-gray-200 ml-3'
            />
          </div>
        </div>
        <div className='bg-red-400'>
          <button className='h-full text-white px-2' onClick={() => removeChoice(choice.name)}>
            <i className='fas fa-minus-circle' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Choice;
