import { useLocation, useRouter } from '@happysanta/router';
import { Group, Header, Input, ModalPage, ModalRoot } from '@vkontakte/vkui';
import React, { useState } from 'react';
import { MODAL_EDIT_PROFILE } from '../../routes';
import ModalEdit from './ModalEdit';

const Modal = () => {
  const location = useLocation();
  const router = useRouter();
  const params = location.getParams();
  const id = params.id;
  const idPost = params.idPost;
  // const post = posts.find(
  //   (post) => post.id === Number(idPost) && post.userID === AuthUser.id
  // );
  // const user = users.find((user) => user.id === AuthUser.id);
  return (
    <ModalRoot
      activeModal={location.getModalId()}
      onClose={() => router.popPage()}
    >
      <ModalEdit id={MODAL_EDIT_PROFILE} />
    </ModalRoot>
  );
};
export default Modal;
