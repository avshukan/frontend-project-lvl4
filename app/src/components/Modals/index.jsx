import React from 'react';
import { useDispatch } from 'react-redux';
import CreateChannel from './CreateChannel';
import RemoveChannel from './RemoveChannel';
import RenameChannel from './RenameChannel';
import { hideModal } from '../../slices/modalsSlice';
import { useModal } from '../../slices';

const modals = {
  create: CreateChannel,
  rename: RenameChannel,
  remove: RemoveChannel,
};

function Modals() {
  const dispatch = useDispatch();

  const { type, info } = useModal();

  const Modal = modals[type];

  const onHide = () => dispatch(hideModal());

  return type
    ? <Modal info={info} onHide={onHide} />
    : null;
}

export default Modals;
