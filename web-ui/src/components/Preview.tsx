import _ from 'lodash';
import React, { ReactElement } from 'react';

interface PreviewProps {
  questionId: string;
  choices: { name: string; text: string; feedback: string }[];
  questionText: string;
  correct: string;
  hint: string;
  redirect: string;
}

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

const Preview = ({ questionId, questionText, choices }: PreviewProps) => {
  return (
    <div className='question'>
      <div className='question-text'>{questionText}</div>
      {choices.map((choice, index) => (
        <AnswerChoice questionId={questionId} choice={choice} />
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
