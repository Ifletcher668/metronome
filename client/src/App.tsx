import React from 'react';
import Main from './components/Main';

function App() {
    return (
        <React.Fragment>
            <header id='header' className='container banner'>
                {' '}
                A simple web metronome
            </header>
            <Main />
            <footer id='footer' className='container banner'></footer>
        </React.Fragment>
    );
}

export default App;
