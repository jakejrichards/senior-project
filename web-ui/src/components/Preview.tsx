import _ from 'lodash';
import React from 'react';
import { QuestionData } from './App';

interface AnswerChoiceProps {
  questionId: string;
  choice: { name: string; text: string; feedback: string };
}

const AnswerChoice = ({ questionId, choice }: AnswerChoiceProps) => {
  return (
    <div className='answer-choice'>
      <input
        id={choice.name}
        value={choice.text}
        name={questionId}
        data-feedback={choice.feedback}
        type='radio'
      />
      <label htmlFor={choice.name}>{choice.text}</label>
    </div>
  );
};

const Preview = ({ questionId, questionText, choices }: QuestionData) => {
  return (
    <div className='question'>
      <div className='question-text'>{questionText}</div>
      {choices.map(choice => (
        <AnswerChoice key={choice.name} questionId={questionId} choice={choice} />
      ))}
      <div className='buttons'>
        <button className='toggle-hint'>View Hint</button>
        <button disabled className='submit'>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Preview;
