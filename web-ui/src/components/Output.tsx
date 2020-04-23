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

const Output = ({ questionId, questionText, choices }: PreviewProps) => {
  return (
    <pre className='inline-block p-4 bg-gray-200'>
      <Block prefix=':::' className='question' props={{ id: questionId, text: questionText }}>
        {choices.map((choice, i) => (
          <>
            <Block
              prefix='::::'
              key={i}
              className='answer-choice'
              props={{ questionId, ...choice }}
            ></Block>
            <br />
          </>
        ))}
      </Block>
    </pre>
  );
};

export default Output;
