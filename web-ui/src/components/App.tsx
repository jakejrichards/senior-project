import { generate as genId } from 'shortid';
import React, { useState, ChangeEvent, useEffect } from 'react';
import Preview from './Preview';
import Output from './Output';

interface Choice {
  name: string;
  text: string;
  feedback: string;
}

const questionId = `q-${genId()}`;

interface QuestionData {
  questionId: string;
  questionText: string;
  choices: Choice[];
}

const getDataFromCache = (): Partial<QuestionData> => {
  const cacheStr = localStorage.getItem('questions-data');
  return cacheStr ? JSON.parse(cacheStr) : {};
};

const App = () => {
  const cached = getDataFromCache();
  const [questionText, setQuestionText] = useState(cached.questionText || 'What color is the sky?');
  const [choices, setChoices] = useState<Choice[]>(cached.choices || []);

  useEffect(() => {
    localStorage.setItem('questions-data', JSON.stringify({ questionText, choices }));
  });

  const addChoice = () => {
    setChoices(choices => choices.concat({ name: `a-${genId()}`, text: '', feedback: '' }));
  };

  const removeChoice = (name: string) => {
    setChoices(choices => choices.filter(choice => choice.name !== name));
  };

  const updateChoice = (field: keyof Choice, index: number) => (value: string) => {
    setChoices(choices => {
      const newChoices = [...choices];
      newChoices[index] = { ...newChoices[index], [field]: value };
      return newChoices;
    });
  };

  return (
    <div className='grid grid-cols-2 gap-20'>
      <div className='p-5'>
        <div className='question-text mb-3'>
          <label>Question</label>
          <input
            value={questionText}
            onChange={e => setQuestionText(e.target.value)}
            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
          />
        </div>
        {choices.map((choice, index) => (
          <div className='my-3 border rounded p-4 relative'>
            <button
              onClick={() => removeChoice(choice.name)}
              className='absolute top-0 right-0 border border-red-400 rounded bg-red-400 text-white py-1 px-2'
            >
              Remove
            </button>
            <div>
              <label>Text</label>
              <input
                value={choice.text}
                onChange={e => updateChoice('text', index)(e.target.value)}
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              />
            </div>
            <div className='mt-3'>
              <label>Feedback</label>
              <input
                value={choice.feedback}
                onChange={e => updateChoice('feedback', index)(e.target.value)}
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              />
            </div>
          </div>
        ))}
        <button onClick={addChoice} className='w-full py-2 px-4 rounded border border-dashed'>
          Add Answer Choice
        </button>
      </div>
      <div>
        <h1 className='text-3xl my-4'>Generated UI</h1>
        <Preview
          redirect=''
          hint=''
          correct=''
          questionId={questionId}
          questionText={questionText}
          choices={choices}
        />
        <h1 className='text-3xl my-4'>Generated Markdown</h1>
        <Output
          redirect=''
          hint=''
          correct=''
          questionId={questionId}
          questionText={questionText}
          choices={choices}
        />
      </div>
    </div>
  );
};

export default App;
