document.addEventListener('DOMContentLoaded', () => {
    const manBtn = document.getElementById('manBtn');
    const womanBtn = document.getElementById('womanBtn');
    const numberContainer = document.getElementById('numberContainer');
    const selectionTitle = document.getElementById('selectionTitle');
    const selectedNumber = document.getElementById('selectedNumber');

    const fetchRandomNumber = async (gender) => {
        try {
            const response = await fetch('/random-number', {
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
        selectionTitle.textContent = gender === 'man' ? '남자 번호를 선택하세요' : '여자 번호를 선택하세요';
        const number = await fetchRandomNumber(gender);
        if (number !== undefined) {
            selectedNumber.textContent = `선택된 번호: ${number}`;
            numberContainer.classList.remove('hidden');
        }
    };

    manBtn.addEventListener('click', () => {
        displayRandomNumber('man');
    });

    womanBtn.addEventListener('click', () => {
        displayRandomNumber('woman');
    });
});
