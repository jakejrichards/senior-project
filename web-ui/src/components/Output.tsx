import _ from 'lodash';
import React, { ReactElement } from 'react';
import { QuestionData } from './App';

const Block = ({
  prefix,
  children,
  className,
  props,
}: {
  prefix: string;
  children?: ReactElement[];
  className: string;
  props: object;
}) => {
  const attrs = _.map(props, (value, key) => `${key}="${value}"`).join(' ');
  return (
    <>
      {prefix}
      {`{ .${className} ${attrs} }`}
      {children && children.length ? (
        <>
          <br />
          {children}
        </>
      ) : (
        <br />
      )}
      {prefix}
    </>
  );
};

const Output = ({ questionId, questionText, choices, correct, hint, redirect }: QuestionData) => {
  return (
    <pre className='inline-block p-4 bg-gray-200'>
      <Block
        prefix=':::'
        className='question'
        props={{ id: questionId, text: questionText, correct, hint, redirect }}
      >
        {choices.map((choice, i) => (
          <React.Fragment key={choice.name}>
            <Block
              prefix='::::'
              key={i}
              className='answer-choice'
              props={{ questionId, ...choice }}
            ></Block>
            <br />
          </React.Fragment>
        ))}
      </Block>
    </pre>
  );
};

export default Output;
