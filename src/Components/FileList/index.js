/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */

import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';
import PropTypes from 'prop-types';
import * as S from './styles';

export default function FileList({ files, onDelete }) {
  return (

    <S.Container>
      {files.map((file) => (
        <li key={file.id}>
          <S.Fileinfo>
            <S.Preview src={file.preview} />
            <div>
              <strong>{file.name}</strong>
              <span>
                {file.readableSize}
                {!!file.url && (
                  <button type="button" onClick={() => onDelete(file.id)}>
                  Excluir
                  </button>
                )}
              </span>

            </div>
          </S.Fileinfo>


          <div>
            {!file.uploaded && !file.error && (
              <CircularProgressbar
                styles={{
                  root: { width: 24 },
                  path: { stroke: '#ec912d' },
                }}
                strokeWidth={10}
                value={file.progress}
              />
            )}


            {file.url && (
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
              </a>
            )}
            {file.uploaded && <MdCheckCircle size={24} color="#78e5d5" />}
            {file.error && <MdError size={24} color="#e57878" /> }
          </div>
        </li>
      ))}
    </S.Container>
  );
}

FileList.propTypes = {
  files: PropTypes.array,
};
