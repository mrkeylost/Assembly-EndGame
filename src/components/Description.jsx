import clsx from "clsx"

export default function Description(props) {
    const renderStatus = () => {
        if (!props.gameOver) {
            if(props.farewell !== null) {
                return (
                    <>
                        <span>"{props.farewell}"🫡 </span>
                    </>
                )
            } else {
                return null
            }
        }

        if (props.gameWon) {
            return (
                <>
                    <p>You Win!</p>
                    <span>Well done! 🎉</span>
                </>
            )
        } else {
            return (
                <>
                    <p>Game Over!</p>
                    <span>
                        You lose! Better start learning Assembly 😭
                    </span>
                </>
            )
        }
    }

    return(
        <header className="description">
            <h2>Assembly: Endgame</h2>
            <p>
                Guess the word in under 8 attempts to keep the programming world safe from Assembly!
            </p>
            <div 
                aria-live="polite"
                role="status"
                className={clsx (
                    "game-status", 
                    {
                        'won': props.gameWon && props.gameOver,
                        'lose': !props.gameWon && props.gameOver,
                        'wrong-guess': props.farewell && !props.gameOver
                    }

                )}
            >
                {renderStatus()}
            </div>
        </header>
    )
}