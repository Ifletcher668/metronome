import React from 'react';

interface Props {
    setHighPitch: React.Dispatch<React.SetStateAction<number>>;
    setMidPitch: React.Dispatch<React.SetStateAction<number>>;
    setLowPitch: React.Dispatch<React.SetStateAction<number>>;
    highPitch: number;
    midPitch: number;
    lowPitch: number;
    tempo: number;
    setTempo: React.Dispatch<React.SetStateAction<number>>;
}
const Controls: React.FC<Props> = (props: Props) => {
    const {
        tempo,
        setTempo,
        highPitch,
        midPitch,
        lowPitch,
        setHighPitch,
        setLowPitch,
        setMidPitch,
    } = props;
    return (
        <div id='controls' className='container center flex-1-item'>
            <form>
                <div>
                    <label>Tempo: {tempo}</label>{' '}
                    <input
                        type='range'
                        name='tempo'
                        id=''
                        min={10}
                        max={380}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setTempo(parseInt(event.target.value))
                        }
                    />
                </div>
                <div>
                    <h3>Choose Pitches</h3>
                    <label>High</label>
                    <select
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                            setHighPitch(parseInt(event.target.value) * 2);
                        }}>
                        <option value='261.6256'>C</option>
                        <option value='277.1826'>C#/Db</option>
                        <option value='293.6648'>D</option>
                        <option value='311.1270'>D#/Eb</option>
                        <option value='329.6276'>E</option>
                        <option value='349.2282'>F</option>
                        <option value='369.9944'>F#/Gb</option>
                        <option value='391.9954'>G</option>
                        <option value='415.3047'>G#/Ab</option>
                        <option selected value='440.0000'>
                            A
                        </option>
                        <option value='466.1638'>A#/Bb</option>
                        <option value='493.8833'>B</option>
                    </select>{' '}
                    <label>Mid</label>{' '}
                    <select
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                            setMidPitch(parseInt(event.target.value));
                            console.log(highPitch);
                        }}>
                        <option selected value='261.6256'>
                            C
                        </option>
                        <option value='277.1826'>C#/Db</option>
                        <option value='293.6648'>D</option>
                        <option value='311.1270'>D#/Eb</option>
                        <option value='329.6276'>E</option>
                        <option value='349.2282'>F</option>
                        <option value='369.9944'>F#/Gb</option>
                        <option value='391.9954'>G</option>
                        <option value='415.3047'>G#/Ab</option>
                        <option value='440.0000'>A</option>
                        <option value='466.1638'>A#/Bb</option>
                        <option value='493.8833'>B</option>
                    </select>
                    <label>Low</label>{' '}
                    <select
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                            setLowPitch(parseInt(event.target.value) / 2);
                            console.log(highPitch);
                        }}>
                        <option value='261.6256'>C</option>
                        <option value='277.1826'>C#/Db</option>
                        <option value='293.6648'>D</option>
                        <option selected value='311.1270'>
                            D#/Eb
                        </option>
                        <option value='329.6276'>E</option>
                        <option value='349.2282'>F</option>
                        <option value='369.9944'>F#/Gb</option>
                        <option value='391.9954'>G</option>
                        <option value='415.3047'>G#/Ab</option>
                        <option value='440.0000'>A</option>
                        <option value='466.1638'>A#/Bb</option>
                        <option value='493.8833'>B</option>
                    </select>
                </div>
            </form>
        </div>
    );
};

export default Controls;
