import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import request from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';

import './NewFormModal.css';
import { useAuth } from '../../services/auth';

export default function NewFormModal({ show, setShow }) {
  const history = useHistory();
  const { token } = useAuth();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  async function submitTicket(e) {
    e.preventDefault();
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', `Bearer ${token}`);

    const reqOpts = {
      headers,
      method: 'POST',
      body: JSON.stringify({ title, body, ticket_severity: 3 }),
    };

    try {
      const { id } = await request('/api/clientcreate', reqOpts);
      history.push(`/dashboard/ticket/${id}`);
    } catch (e) {
      //
    }
  }

  return (
    <div className={'it-nfm'.concat([show ? ' nfm--active' : ''])}>
      <div className="nfm-wrapper">
        <span className="nfm-header">New Ticket</span>
        <form className="nfm-form" onSubmit={submitTicket}>
          <label htmlFor="nfmTitle" className="nfm-label">Title</label>
          <Input
            id="nfmTitle"
            name="Title"
            value={title}
            onChange={(e) => { setTitle(e.target.value); }}
          />
          <label htmlFor="nfmBody" className="nfm-label">Description</label>
          <textarea
            id="nfmBody"
            name="Description"
            className="nfm-body"
            value={body}
            onChange={(e) => { setBody(e.target.value); }}
          />
          <Button
            type="submit"
            disabled={title === '' || body === ''}
          >
            Submit
          </Button>
        </form>
      </div>
      <div
        className="nfm-background"
        onClick={() => { setShow(false); }}
      />
    </div>
  );
}

NewFormModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
};
