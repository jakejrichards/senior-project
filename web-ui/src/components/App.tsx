import { generate as genId } from 'shortid';
import React, { useState, useEffect, useCallback } from 'react';
import Preview from './Preview';
import Output from './Output';
import Choice, { ChoiceData } from './editor/Choice';
import Input from './widgets/Input';
import { swap } from '../utils/swap';

const questionId = `q-${genId()}`;

export interface QuestionData {
  hint?: string;
  redirect?: string;
  correct?: string;
  questionId: string;
  questionText: string;
  choices: ChoiceData[];
}

const getDataFromCache = (): Partial<QuestionData> => {
  const cacheStr = localStorage.getItem('questions-data');
  return cacheStr ? JSON.parse(cacheStr) : {};
};

const App = () => {
  const cached = getDataFromCache();
  const [correct, setCorrect] = useState(cached.correct);
  const [hint, setHint] = useState(cached.hint || '');
  const [redirect, setRedirect] = useState(cached.redirect || '');
  const [questionText, setQuestionText] = useState(cached.questionText || 'What color is the sky?');
  const [choices, setChoices] = useState<ChoiceData[]>(cached.choices || []);

  useEffect(() => {
    if (!correct && choices.length) setCorrect(choices[0].name);
  }, [correct, choices]);

  useEffect(() => {
    localStorage.setItem(
      'questions-data',
      JSON.stringify({ questionText, choices, correct, redirect, hint }),
    );
  });

  const moveChoice = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setChoices(choices => swap([...choices], dragIndex, hoverIndex));
    },
    [choices],
  );

  const addChoice = () => {
    setChoices(choices => choices.concat({ name: `a-${genId()}`, text: '', feedback: '' }));
  };

  const removeChoice = (name: string) => {
    setChoices(choices => choices.filter(choice => choice.name !== name));
  };

  const updateChoice = (field: keyof ChoiceData, index: number) => (value: string) => {
    setChoices(choices => {
      const newChoices = [...choices];
      newChoices[index] = { ...newChoices[index], [field]: value };
      return newChoices;
    });
  };

  return (
    <div className='grid grid-cols-2 gap-20 pr-10'>
      <div className='pl-10'>
        <h1 className='text-3xl my-4'>Interactive Questions Generator</h1>
        <div className='mb-3'>
          <label>Question</label>
          <Input value={questionText} onChange={e => setQuestionText(e.target.value)} />
        </div>
        <div className='grid grid-cols-2 gap-10'>
          <div>
            <label>Hint</label>
            <Input value={hint} onChange={e => setHint(e.target.value)} />
          </div>
          <div>
            <label>Redirect</label>
            <Input value={redirect} onChange={e => setRedirect(e.target.value)} />
          </div>
        </div>
        <div className='mt-3'>
          <label>Answer Choices</label>
          {choices.map((choice, index) => (
            <Choice
              key={choice.name}
              index={index}
              choice={choice}
              isCorrect={correct === choice.name}
              moveChoice={moveChoice}
              removeChoice={removeChoice}
              updateFeedback={updateChoice('feedback', index)}
              updateText={updateChoice('text', index)}
              updateCorrect={() =>
                setCorrect(correct => (correct === choice.name ? undefined : choice.name))
              }
            />
          ))}
        </div>
        <button
          onClick={addChoice}
          className='w-full p-4 rounded border border-dashed text-gray-700 hover:bg-gray-100'
        >
          <i className='fas fa-plus-circle' />
          <span className='ml-3 uppercase font-bold '>Add Answer Choice</span>
        </button>
      </div>
      <div>
        <h1 className='text-3xl my-4'>Generated UI</h1>
        <Preview
          redirect={redirect}
          hint={hint}
          correct={correct}
          questionId={questionId}
          questionText={questionText}
          choices={choices}
        />
        <h1 className='text-3xl my-4 mt-8'>Generated Markdown</h1>
        <Output
          redirect={redirect}
          hint={hint}
          correct={correct}
          questionId={questionId}
          questionText={questionText}
          choices={choices}
        />
      </div>
    </div>
  );
};

export default App;
