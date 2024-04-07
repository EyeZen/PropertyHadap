import "./AddPlayerDialog.css";

function AddPlayerDialog() {
    return (
        <div className="add-player-dialog">
            <header>Add Player</header>
            <main>
                <div className="add-player__controller">
                    <label htmlFor="player-alias">Enter player alias</label>
                    <input type="text" name="player-alias" id="player-alias" />
                </div>
            </main>
            <footer>
                <button>Add Player</button>
                <button>Cancel</button>
            </footer>
        </div>
    )
}

export default AddPlayerDialog
