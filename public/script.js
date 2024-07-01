document.addEventListener('DOMContentLoaded', () => {
    const manBtn = document.getElementById('manBtn');
    const womanBtn = document.getElementById('womanBtn');
    const numberContainer = document.getElementById('numberContainer');
    const selectionTitle = document.getElementById('selectionTitle');
    const selectedNumber = document.getElementById('selectedNumber');
    const cells = document.querySelectorAll('td[data-number]');

    const generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

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
        selectionTitle.textContent = gender === 'man' ? '남자' : '여자';
        const number = await fetchRandomNumber(gender);
        if (number !== undefined) {
            selectedNumber.textContent = `선택된 번호: ${number}`;
            numberContainer.classList.remove('hidden');
            highlightNumber(number, gender);
        }
    };

    const highlightNumber = (number, gender) => {
        const cell = document.querySelector(`td[data-number="${number}"]`);
        if (cell) {
            if (cell.classList.contains('man-selected') && gender === 'woman') {
                cell.classList.remove('man-selected');
                cell.classList.add('both-selected');
            } else if (cell.classList.contains('woman-selected') && gender === 'man') {
                cell.classList.remove('woman-selected');
                cell.classList.add('both-selected');
            } else if (gender === 'man') {
                cell.classList.add('man-selected');
            } else if (gender === 'woman') {
                cell.classList.add('woman-selected');
            }
        }
    };

    manBtn.addEventListener('click', () => {
        displayRandomNumber('man');
    });

    womanBtn.addEventListener('click', () => {
        displayRandomNumber('woman');
    });
});