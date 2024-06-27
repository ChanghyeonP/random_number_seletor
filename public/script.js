document.addEventListener('DOMContentLoaded', () => {
    const manBtn = document.getElementById('manBtn');
    const womanBtn = document.getElementById('womanBtn');
    const numberContainer = document.getElementById('numberContainer');
    const selectionTitle = document.getElementById('selectionTitle');
    const selectedNumber = document.getElementById('selectedNumber');

    // UUID 생성 함수
    const generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    // Local Storage에서 UUID 가져오기 또는 새로 생성
    let uuid = localStorage.getItem('uuid');
    if (!uuid) {
        uuid = generateUUID();
        localStorage.setItem('uuid', uuid);
    }

    const fetchRandomNumber = async (gender) => {
        try {
            const response = await fetch('/api/random-number', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ gender, uuid })
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

    manBtn.addEventListener('click', () => {
        displayRandomNumber('man');
    });

    womanBtn.addEventListener('click', () => {
        displayRandomNumber('woman');
    });
});
