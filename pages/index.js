import {useState, useEffect} from 'react';
import Control from '../src/boton'
// from
// https://stackoverflow.com/questions/39200994/play-specific-frequency-with-javascript

const playNote = (frequency, duration) => new Promise(resolve => {
  var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
  var oscillator = audioCtx.createOscillator();

  oscillator.type = 'sine';
  oscillator.frequency.value = frequency; 
  oscillator.connect(audioCtx.destination);
  oscillator.start();

  setTimeout( () => {
    oscillator.stop();
    resolve();
  }, duration);

})

const playMelody = notes => notes.length > 0 ? 
    notes.reduce( (p, note) => p.then( _ =>
        playNote(note[0], 1000 * 256 / (note[1] * tempo))
    ), Promise.resolve() ) 
    : Promise.resolve()

const tempo = 100;

const change = (notes, index, note, time) => {
    const newNotes = [...notes]
    newNotes[index] = [note,time]
    return newNotes
}

const View = ({defaultNotes}) => { 
    const [ notes, setNotes ] = useState(defaultNotes)
    return <div onClick={e => playMelody(notes) }>
        play
        {notes.map( (n,i) => <div>
            {n[0]},{n[1]} <Control key={i} note={n[0]} time={n[1]} onChangeNote={v => setNotes( change(notes, i, v, n[1])) } onChangeTime={v => setNotes( change(notes, i, n[0], v))} />
        </div>)}
    </div>
}

View.getInitialProps = () => ({
    defaultNotes: [
        [659, 4],
        [659, 4],
        [659, 4],
        [523, 8],
        [0, 16],
        [783, 16],
        [659, 4],
        [523, 8],
        [0, 16],
        [783, 16],
        [659, 4],
        [0, 4],
        [987, 4],
        [987, 4],
        [987, 4],
        [1046, 8],
        [0, 16],
        [783, 16],
        [622, 4],
        [523, 8],
        [0, 16],
        [783, 16],
        [659, 4]
    ]
})

export default View
