import React from 'react';
import InputMask  from 'react-input-mask'
import loadable from '@loadable/component';

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const TicketNav = loadable(() => import('components/TicketNav'));

function TicketLogin() {
  return (
    <div>
      { DEVELOPMENT && <TicketNav /> }
      <main>
        <h1>TicketLogin</h1>
        <InputMask
          placeholder="UserName"
        />
        <br/>
        <InputMask
          placeholder="Password"
        />
      </main>
    </div>
  );
}

export { TicketLogin as default };
