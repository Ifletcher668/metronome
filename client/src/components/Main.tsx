import React, { useState } from 'react';
import Metronome from './Metronome';
import Controls from './Controls';

interface Props {}
const Main: React.FC<Props> = (props: Props) => {
    const [tempo, setTempo] = useState<number>(120);
    const [highPitch, setHighPitch] = useState<number>(880.0);
    const [midPitch, setMidPitch] = useState<number>(440.0);
    const [lowPitch, setLowPitch] = useState<number>(220.0);

    return (
        <main id='main' className='container column center'>
            <div id='metronome' className='container column center'>
                <div className='container banner '>Metronome</div>
                <Controls
                    tempo={tempo}
                    setTempo={setTempo}
                    highPitch={highPitch}
                    midPitch={midPitch}
                    lowPitch={lowPitch}
                    setHighPitch={setHighPitch}
                    setMidPitch={setMidPitch}
                    setLowPitch={setLowPitch}
                />
                <Metronome
                    highPitch={highPitch}
                    midPitch={midPitch}
                    lowPitch={lowPitch}
                    tempo={tempo}
                />
            </div>
        </main>
    );
};

export default Main;
