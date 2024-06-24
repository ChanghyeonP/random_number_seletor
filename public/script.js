document.addEventListener('DOMContentLoaded', () => {
    const manBtn = document.getElementById('manBtn');
    const womanBtn = document.getElementById('womanBtn');
    const numberContainer = document.getElementById('numberContainer');
    const selectionTitle = document.getElementById('selectionTitle');
    const selectedNumber = document.getElementById('selectedNumber');

    const fetchRandomNumber = async (gender) => {
        try {
            const response = await fetch('/api/random-number', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ gender })
            });
            if (!response.ok) {
                throw new Error(await response.text());
            }
            const data = await response.json();
            return data.number;
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    const displayRandomNumber = async (gender) => {
        selectionTitle.textContent = gender === 'man' ? '' : '';
        const number = await fetchRandomNumber(gender);
        if (number !== undefined) {
            selectedNumber.textContent = `선택된 번호: ${number}`;
            numberContainer.classList.remove('hidden');
        }
    };

    const disableButtons = () => {
        manBtn.disabled = true;
        womanBtn.disabled = true;
    };

    manBtn.addEventListener('click', async () => {
        await displayRandomNumber('man');
        disableButtons();
    });

    womanBtn.addEventListener('click', async () => {
        await displayRandomNumber('woman');
        disableButtons();
    });
});
