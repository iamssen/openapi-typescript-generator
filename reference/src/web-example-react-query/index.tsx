import React from 'react';
import { render } from 'react-dom';
import { useQuery } from 'react-query';
import { defaultApi, servers } from './client';

function App() {
  const { isLoading, error, data } = useQuery('posts', async () =>
    defaultApi.postsGet({ basePath: servers[0].url }),
  );

  return (
    <div>
      {Array.isArray(data) && (
        <ul>
          {data.map(({ id, title, userId, body }) => (
            <li key={id}>
              <div>
                <div>
                  {title} ({userId})
                </div>
                <pre>{body}</pre>
              </div>
            </li>
          ))}
        </ul>
      )}

      {isLoading && <div>Loading...</div>}

      {error && <div>Error {String(error)}</div>}
    </div>
  );
}

render(<App />, document.querySelector('#app'));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
