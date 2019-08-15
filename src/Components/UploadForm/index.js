/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Dropzone from 'react-dropzone';
import * as S from './styles';


export default function UploadForm({ onUpload }) {
  const renderDragMessage = (isDragActive, isDragReject) => {
    if (!isDragActive) {
      return <S.UploadMessage>Arraste arquivos aqui...</S.UploadMessage>;
    }
    if (isDragReject) {
      return <S.UploadMessage type="error">Este arquivo não vai rolar...</S.UploadMessage>;
    }
    return <S.UploadMessage type="success">Pode soltar seus arquivos</S.UploadMessage>;
  };


  return (
    <Dropzone accept="image/*" onDropAccepted={onUpload}>
      {({
        getInputProps, getRootProps, isDragActive, isDragReject,
      }) => (
        <S.Container
          {...getRootProps()}
          isDragActive={isDragActive}
          isDragReject={isDragReject}
        >
          <input {...getInputProps()} />
          {renderDragMessage(isDragActive, isDragReject)}
        </S.Container>

      )}
    </Dropzone>
  );
}
