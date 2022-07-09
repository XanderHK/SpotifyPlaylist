class AudioPlayer {

    current;

    play = (src) => {
        // Checks if the audio exists
        if (this.current) {
            // Checks if the current audio src is the same as the new one
            if (this.current.src === src) {
                // Checks if the audio is playing
                if (!this.current.paused) {
                    this.current.pause()
                    return
                }
                // Checks if the audio is paused
                if (this.current.paused) {
                    this.current.play()
                    return
                }
            }

            // Pauses the old audio
            this.current.pause();
        }

        // Creates audio element
        this.current = new Audio(src)
        // Plays audio element
        this.current.play()
    }
}

const audioPlayer = new AudioPlayer()

const interactWithAudioPlayer = (src) => {
    audioPlayer.play(src)
}


