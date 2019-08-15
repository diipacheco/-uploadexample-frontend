/* eslint-disable react/state-in-constructor */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable radix */
import React, { Component } from 'react';
import filesize from 'filesize';
import { uniqueId } from 'lodash';
import api from './Services/api';
import Global from './Styles/Global';
import * as S from './styles';
import Upload from './Components/UploadForm';
import Filelist from './Components/FileList';

class App extends Component {
      state = {
        uploadedFiles: [],
      };

      async componentDidMount() {
        const response = await api.get('post');

        this.setState({
          uploadedFiles: response.data.map((file) => ({
            id: file._id,
            name: file.name,
            readableSize: filesize(file.size),
            preview: file.url,
            uploaded: true,
            url: file.url,
          })),
        });
      }

      componentWillUnmount() {
        this.state.uploadedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
      }

      handleUpload = (files) => {
        const uploadedFiles = files.map((file) => ({
          file,
          id: uniqueId(),
          name: file.name,
          readableSize: filesize(file.size),
          preview: URL.createObjectURL(file),
          progress: 0,
          uploaded: false,
          error: false,
          url: null,
        }));

        this.setState({
          uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles),
        });

        uploadedFiles.forEach(this.processUpload);
      };

      updateFile = (id, data) => {
        this.setState({
          uploadedFiles: this.state.uploadedFiles.map((uploadedFile) => (id === uploadedFile.id
            ? { ...uploadedFile, ...data }
            : uploadedFile)),
        });
      };

      processUpload = (uploadedFile) => {
        const data = new FormData();

        data.append('file', uploadedFile.file, uploadedFile.name);

        api
          .post('post', data, {
            onUploadProgress: (e) => {
              const progress = parseInt(Math.round((e.loaded * 100) / e.total));

              this.updateFile(uploadedFile.id, {
                progress,
              });
            },
          })
          .then((response) => {
            this.updateFile(uploadedFile.id, {
              uploaded: true,
              id: response.data._id,
              url: response.data.url,
            });
          })
          .catch(() => {
            this.updateFile(uploadedFile.id, {
              error: true,
            });
          });
      };

      handleDelete = async (id) => {
        await api.delete(`post/${id}`);

        this.setState({
          uploadedFiles: this.state.uploadedFiles.filter((file) => file.id !== id),
        });
      };


      render() {
        const { uploadedFiles } = this.state;
        return (
          <div className="App">
            <S.Container>
              <S.Content>
                <Upload onUpload={this.handleUpload} />
                {!!uploadedFiles.length && (
                <Filelist files={uploadedFiles} onDelete={this.handleDelete} />
                ) }

              </S.Content>
            </S.Container>
            <Global />
          </div>

        );
      }
}


export default App;
