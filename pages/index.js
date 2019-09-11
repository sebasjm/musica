import {useState, useEffect} from 'react';
import Control from '../src/boton'
import Tone from 'tone'

// from
// https://stackoverflow.com/questions/39200994/play-specific-frequency-with-javascript

const playNote = (frequency, duration) => new Promise(resolve => {
  var osc = new Tone.Oscillator(frequency, "sine")
	.toMaster() //connected to the master output
	.start(); // start it right away

  setTimeout( () => {
    osc.stop();
    resolve();
  }, 1000 * 256 / (duration * tempo));

})

let time = 0
const playMelody = (flag,notes) => notes.length === 0 ? Promise.resolve() :
    notes.reduce( (p, note) => p.then( _ =>
        flag === time ? playNote(...note) : Promise.reject()
    ), Promise.resolve() ) 

const tempo = 100;

const change = (notes, index, note, time) => {
    const newNotes = [...notes]
    newNotes[index] = [note,time]
    return newNotes
}

const View = ({defaultNotes}) => { 
    const [ notes, setNotes ] = useState(defaultNotes)
    return <div >
        <div onClick={e => playMelody(++time, notes) }>
         play
        </div>
        {notes.map( (n,i) => <div key={i}>
            <Control key={JSON.stringify(n)+i} 
                note={n[0]} time={n[1]} 
                onChangeNote={v => setNotes( change(notes, i, v, n[1])) } onChangeTime={v => setNotes( change(notes, i, n[0], v))} 
                onAddUp={ v => setNotes([...notes.slice(0, i), n, ...notes.slice(i)]) }
                onAddDown={ v =>  setNotes([...notes.slice(0, i+1), n,...notes.slice(i+1)]) }
                onDelete={v => setNotes([...notes.slice(0, i), ...notes.slice(i + 1)]) }
            />
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
