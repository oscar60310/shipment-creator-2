import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Nav } from './nav';

const LoadResource = (props: { children: any }) => {
  const [finish, setFinish] = React.useState(false);
  React.useEffect(() => {
    const jobs = [
      import('@blueprintjs/core/lib/css/blueprint.css'),
      import('@blueprintjs/datetime/lib/css/blueprint-datetime.css')
    ];
    Promise.all(jobs).then(() => setFinish(true));
  }, []);
  return finish ? (
    props.children
  ) : (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      Loading ...
    </div>
  );
};
const AppComponent = () => {
  return (
    <div>
      <LoadResource>
        <Nav />
        <div style={{ padding: 10 }}>2341115</div>
      </LoadResource>
    </div>
  );
};
export default hot(AppComponent);
