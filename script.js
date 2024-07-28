document.addEventListener('DOMContentLoaded', () => {
    const character = document.getElementById('character');
    const hearts = document.querySelectorAll('.heart');
    const message = document.getElementById('message');
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    let collectedHearts = 0;

    const messages = ["I love you", "Kamu spesial", "You are amazing", "Be mine", "Forever yours"];
    const finalMessage = "Will you be my love?";
    const heartCollectionOrder = [];

    const moveCharacter = (dx, dy) => {
        const rect = character.getBoundingClientRect();
        const containerRect = character.parentElement.getBoundingClientRect();

        let newLeft = rect.left + dx;
        let newTop = rect.top + dy;

        if (newLeft < containerRect.left) newLeft = containerRect.left;
        if (newTop < containerRect.top) newTop = containerRect.top;
        if (newLeft + rect.width > containerRect.right) newLeft = containerRect.right - rect.width;
        if (newTop + rect.height > containerRect.bottom) newTop = containerRect.bottom - rect.height;

        character.style.left = `${newLeft - containerRect.left}px`;
        character.style.top = `${newTop - containerRect.top}px`;

        checkCollision();
    };

    const checkCollision = () => {
        const characterRect = character.getBoundingClientRect();
        hearts.forEach((heart, index) => {
            const heartRect = heart.getBoundingClientRect();
            if (
                characterRect.left < heartRect.left + heartRect.width &&
                characterRect.left + characterRect.width > heartRect.left &&
                characterRect.top < heartRect.top + heartRect.height &&
                characterRect.top + characterRect.height > heartRect.top &&
                !heartCollectionOrder.includes(index)
            ) {
                heart.style.display = 'none';
                showMessage(messages[collectedHearts]);
                heartCollectionOrder.push(index);
                collectedHearts += 1;
                if (collectedHearts === hearts.length) {
                    setTimeout(() => showMessage(finalMessage), 1000);
                }
            }
        });
    };

    const showMessage = (msg) => {
        message.textContent = msg;
        setTimeout(() => {
            message.textContent = '';
        }, 2000);
    };

    window.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
            case 'w':
                moveCharacter(0, -20);
                break;
            case 'ArrowDown':
            case 's':
                moveCharacter(0, 20);
                break;
            case 'ArrowLeft':
            case 'a':
                moveCharacter(-20, 0);
                break;
            case 'ArrowRight':
            case 'd':
                moveCharacter(20, 0);
                break;
        }
    });

    musicToggle.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
        } else {
            backgroundMusic.pause();
        }
    });

    // Extra complexity: randomly reposition hearts every 5 seconds
    setInterval(() => {
        hearts.forEach((heart) => {
            if (heart.style.display !== 'none') {
                heart.style.top = `${Math.random() * 570}px`;
                heart.style.left = `${Math.random() * 570}px`;
            }
        });
    }, 5000);

    // Extra feature: add more hearts dynamically
    setTimeout(() => {
        for (let i = 0; i < 5; i++) {
            const newHeart = document.createElement('div');
            newHeart.classList.add('heart');
            newHeart.style.top = `${Math.random() * 570}px`;
            newHeart.style.left = `${Math.random() * 570}px`;
            document.getElementById('game-container').appendChild(newHeart);
            hearts.push(newHeart);
        }
    }, 10000);
});
