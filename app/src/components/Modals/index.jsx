import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateChannel from './CreateChannel';
import RemoveChannel from './RemoveChannel';
import RenameChannel from './RenameChannel';
import { hideModal } from '../../slices/modalsSlice';

const modals = {
  create: CreateChannel,
  rename: RenameChannel,
  remove: RemoveChannel,
};

function Modals() {
  const dispatch = useDispatch();

  const { type, info } = useSelector((state) => state.modals);

  const Modal = modals[type];

  const onHide = () => dispatch(hideModal());

  return type
    ? <Modal info={info} onHide={onHide} />
    : null;
}

export default Modals;
