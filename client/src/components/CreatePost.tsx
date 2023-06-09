import { Icon24Camera } from '@vkontakte/icons';
import { Icon24SendOutline } from '@vkontakte/icons';
import {
  FormItem,
  FormLayout,
  File,
  Textarea,
  Button,
  FormLayoutGroup,
  ButtonGroup,
  Group,
  ScreenSpinner,
  Title,
} from '@vkontakte/vkui';

import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { uploadImage } from '../store/reducers/Upload/UploadACtionCreator';
import { addPost, fetchPost } from '../store/reducers/Post/PostActionCreator';
import { useRouter } from '@happysanta/router';
import { PAGE_FEED } from '../routes';
import { ReseivedPostType } from '../types/Post';
import { AsyncThunkAction } from '@reduxjs/toolkit';

export interface SendPostType {
  desc?: string;
  image?: string;
}

const CreatePost = () => {
  const { isLoading, error } = useAppSelector((state) => state.uploadReducer);

  const { isLoading: isLoadingCreate, error: errorCreate } = useAppSelector(
    (state) => state.postReducer
  );
  const dispatch = useAppDispatch();
  const [text, setText] = useState<string>('');
  const [file, setFile] = useState<Blob | MediaSource>();
  const [fileUrl, setFileUrl] = useState<string>('');

  const data = new FormData();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPost: SendPostType = { desc: text, image: fileUrl };
    if (newPost.desc === '' && newPost.image === '') {
      console.log('Вы клоун?');
      return;
    }

    dispatch(addPost(newPost));
    setText('');
    setFile(undefined);
    setFileUrl('');
  };
  useEffect(() => {
    error && alert('не удалось загрузить фото');
  }, [error, errorCreate]);

  const handleOnChange = (e: any) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      if (!file.type.startsWith('image/')) {
        alert('Загрузите фотку');
        return;
      }
      const maxFileSize = 5 * 1024 * 1024; //5mb
      const fileSize = file.size;
      if (fileSize > maxFileSize)
        alert('Размер файла превышает максимальный размер');
      else {
        setFile(file);
        const fileName = Date.now() + file.name;
        setFileUrl(fileName);
        data.append('name', fileName);
        data.append('file', file);
        dispatch(uploadImage(data));
      }
    }
  };

  return (
    <Group>
      <FormLayout>
        <FormItem>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={1}
            placeholder="Что нового?"
          />
        </FormItem>

        {file && (
          <FormItem>
            <div>
              <img
                onClick={() => {
                  setFile(undefined);
                  setFileUrl('');
                }}
                style={{
                  borderRadius: '15px',
                  width: '100%',
                  height: 'auto',
                }}
                src={URL.createObjectURL(file)}
                alt="image"
              />
            </div>
          </FormItem>
        )}
        <FormItem>
          <ButtonGroup
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <File
              loading={isLoading}
              onChange={handleOnChange}
              size="m"
              mode="outline"
            >
              {'Фотография'}
            </File>
            <Button
              loading={isLoadingCreate}
              onClick={submit}
              mode="outline"
              size="m"
              after={<Icon24SendOutline />}
            >
              {'Опубликовать'}
            </Button>
          </ButtonGroup>
        </FormItem>
      </FormLayout>
    </Group>
  );
};

export default CreatePost;
