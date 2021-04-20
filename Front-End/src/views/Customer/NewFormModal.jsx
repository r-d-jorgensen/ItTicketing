/* eslint-disable jsx-a11y/click-events-have-key-events,
                  jsx-a11y/no-static-element-interactions */

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import request from '../../services/api';

import Button from '../../components/Button';

import './NewFormModal.css';
import { useAuth } from '../../services/auth';

export default function NewFormModal({ show, setShow }) {
  const history = useHistory();
  const { token } = useAuth();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState(1);

  async function submitTicket(e) {
    e.preventDefault();
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', `Bearer ${token}`);

    /* eslint-disable camelcase */
    let ticket_severity = parseInt(selectedSeverity, 10) || 1;
    if (ticket_severity < 1 || ticket_severity > 4) {
      ticket_severity = 1;
    }

    const reqOpts = {
      headers,
      method: 'POST',
      body: JSON.stringify({
        title,
        body,
        ticket_severity,
      }),
    };
    /* eslint-enable camelcase */
    try {
      const { id } = await request('/api/clientcreate', reqOpts);
      history.push(`/dashboard/ticket/${id}`);
    } catch (_) {
      //
    }
  }

  return (
    <div className={'it-nfm'.concat([show ? ' nfm--active' : ''])}>
      <div className="nfm-wrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="nfm-close"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={() => {
            setShow(false);
            setTitle('');
            setBody('');
          }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        <span className="nfm-header">New Ticket</span>
        <form className="nfm-form" onSubmit={submitTicket}>
          <div className="nfm-group">
            <div className="nfm-unit">
              <label htmlFor="nfmTitle" className="nfm-label">Title</label>
              <input
                className="nfm-input"
                id="nfmTitle"
                name="Title"
                value={title}
                onChange={(e) => { setTitle(e.target.value); }}
              />
            </div>
            <div className="nfm-unit">
              <label htmlFor="nfmSeverity" className="nfm-label">Severity</label>
              <select
                id="nfmSeverity"
                name="Severity"
                defaultValue="1"
                className="nfm-select"
                onChange={({ target: { value } }) => { setSelectedSeverity(value); }}
              >
                <option value="1">Low</option>
                <option value="2">Mild</option>
                <option value="3">High</option>
                <option value="4">Urgent</option>
              </select>
            </div>
          </div>
          <label htmlFor="nfmBody" className="nfm-label">Description</label>
          <textarea
            id="nfmBody"
            name="Description"
            className="nfm-body"
            value={body}
            onChange={(e) => { setBody(e.target.value); }}
          />
          <div className="nfm-group">
            <Button
              type="submit"
              disabled={title === '' || body === ''}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
      <div
        className="nfm-background"
        onClick={() => {
          setShow(false);
          setTitle('');
          setBody('');
        }}
      />
    </div>
  );
}

NewFormModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
};
