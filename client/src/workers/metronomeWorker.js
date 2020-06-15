const worker = () => {
    let timerId = null;
    let interval = 100;
    onmessage = (e) => {
        // console.log(e.data)
        if (e.data === 'start') {
            // console.log(e);
            console.log('starting');
            timerId = setInterval(() => postMessage('tick'), interval);
        } else if (e.data.interval) {
            console.log('setting interval');
            interval = e.data.interval;
            console.log(e.data);
            console.log(`e.data.interval is: ${e.data.interval}`);
            console.log(`interval: ${interval}`);
            console.log(timerId);
            // TODO It's never hitting this if check
            if (timerId) {
                clearInterval(timerId);
                timerId = setInterval(() => postMessage('tick'), interval);
            }
        } else if (e.data === 'stop') {
            console.log('stopping');
            clearInterval(timerId);
            timerId = null;
        }
    };
};

let code = worker.toString();
code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));

const blob = new Blob([code], { type: 'application/javascript' });
const workerScript = URL.createObjectURL(blob);

export default workerScript;
