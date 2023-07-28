import React, {useRef} from 'react';

const Player = () => {
    const ref = useRef<HTMLVideoElement>(null)
    const handlePlay = () => {
        ref?.current?.play()
    }

    const handlePause = () => {
        ref?.current?.pause()
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
            gap: '10px',
            marginBottom: '30px'
        }}>
            <button className={'btn'} onClick={handlePlay}>Play</button>
            <button className={'btn'} onClick={handlePause}>Pause</button>
            <video muted src={'https://www.w3schools.com/html/mov_bbb.mp4'} ref={ref}></video>
        </div>
    );
};

export default Player;
