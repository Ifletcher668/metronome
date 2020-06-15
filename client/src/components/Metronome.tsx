import React, { useState, useEffect } from 'react';

import worker from '../workers/metronomeWorker';

interface Props {
    highPitch: number;
    midPitch: number;
    lowPitch: number;
    tempo: number;
}
const Metronome: React.FC<Props> = (props: Props) => {
    const { highPitch, midPitch, lowPitch, tempo } = props;
    const [isPlayButtonClicked, setIsPlayButtonClicked] = useState<boolean>(false);
    const [bpm, setBpm] = useState<any>(150);

    const timerWorker = new Worker(worker);
    const audioContext = new AudioContext();

    let unlocked = false;
    let isPlaying = false;
    let startTime = null;
    let current16thNote = 0;
    let lookahead = 25.0;

    let scheduleAheadTime = 0.1;

    let nextNoteTime = 0.0;
    let noteResolution = 0;
    let noteLength = 0.05;
    const notesInQueue = [];

    window.requestAnimationFrame = (function () {
        return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (callback: any) {
                window.setTimeout(callback, 1000 / 60);
            }
        );
    })();

    // function to calculate when the next note should fire
    const nextNote = () => {
        // advance current note and time by a 16th note
        const secondsPerBeat = 60.0 / tempo; //TODO check for const or let
        // this picks up the CURRENT tempo value
        // to calculate beat length.

        nextNoteTime += 0.5 * secondsPerBeat;

        current16thNote++; // advance the beat number, and wrap to zero
        if (current16thNote === 16) {
            current16thNote = 0;
        }
    };

    const scheduleNote = (beatNumber: number, time: number) => {
        // push the note on the queue, even if we're not playing
        notesInQueue.push({ note: beatNumber, time: time });
        if (noteResolution === 1 && beatNumber % 2) return;
        if (noteResolution === 2 && beatNumber % 4) return;

        const oscillator: OscillatorNode = audioContext.createOscillator();
        // connects newly created oscillator to default destination, computer speakers
        oscillator.connect(audioContext.destination);

        if (beatNumber % 16 === 0) oscillator.frequency.value = highPitch;
        else if (beatNumber % 4 === 0) oscillator.frequency.value = midPitch;
        else oscillator.frequency.value = lowPitch;

        oscillator.start(time);
        oscillator.stop(time + noteLength);
    };
    // the core code of the scheduling process is in this function
    // This function gets the current audio hardware time, and compares it
    // against the time for the next note in the sequence
    const scheduler = () => {
        while (nextNoteTime < audioContext.currentTime + scheduleAheadTime) {
            console.log('scheduler ran');
            scheduleNote(current16thNote, nextNoteTime);
            nextNote();
        }
    };

    const play = () => {
        if (!unlocked) {
            const buffer = audioContext.createBuffer(1, 1, 22050); //TODO lookup what this does
            const node = audioContext.createBufferSource(); //TODO lookup what this does
            node.buffer = buffer; // * in other words, "buffer source = buffer created"
            node.start(0); // TODO check to see if value '0' means length of none
            unlocked = true;
        }

        isPlaying = !isPlaying;
        if (isPlaying) {
            // start playing
            current16thNote = 0;
            nextNoteTime = audioContext.currentTime;
            timerWorker.postMessage('start');
            return 'stop';
        } else {
            timerWorker.postMessage('stop');
            return 'play';
        }
    };

    timerWorker.onmessage = (e: any) => {
        if (e.data === 'tick') {
            scheduler();
        } else console.log(`message: ${e.data}`);
    };

    timerWorker.postMessage({ interval: lookahead });

    const testFunction = () => {
        setIsPlayButtonClicked(!isPlayButtonClicked);
        play();
    };
    return (
        <div id='play-button' className='container flex-0-item column'>
            <h1>Audio</h1>
            <button
                onClick={() => {
                    play();
                }}>
                {isPlayButtonClicked ? 'stop' : 'start'}
            </button>
            <audio src=''>Two</audio>
        </div>
    );
};

export default Metronome;
