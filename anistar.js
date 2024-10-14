document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM повністю завантажений');

    // Знайдемо всі елементи з класом title_left
    const titles = document.querySelectorAll('.title_left');

    const coversCollection = document.getElementsByClassName('main-img');
    const covers = Array.from(coversCollection);
    console.log(covers);
    covers.forEach((e) => { e.style.removeProperty('filter') });

    // Створюємо <ul> елемент
    const ul = document.createElement('ul');
    ul.classList.add('positioned-list'); // Додаємо клас для стилізації

    // Додаємо стилі для списку через JS
    ul.style.position = 'fixed';
    ul.style.top = '50px';
    ul.style.right = '50px';
    ul.style.borderRadius = '5px';
    ul.style.listStyleType = 'none';
    ul.style.padding = '1rem';
    ul.style.backgroundColor = 'white';
    ul.style.zIndex = 1000;
    ul.style.outline = 'solid 1px grey';
    ul.style.boxShadow = '10px 5px 5px grey';

    // Додаємо <ul> на сторінку
    document.body.appendChild(ul);

    // Функція для відображення списку з localStorage
    function renderListFromStorage() {
        const storedLinks = JSON.parse(localStorage.getItem('links')) || [];
        storedLinks.forEach(({ href, text, imageUrl }) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = href;
            a.textContent = text; 
            li.appendChild(a);

            const imagePopup = document.createElement('div');
            imagePopup.style.position = 'absolute';
            imagePopup.style.display = 'none';
            imagePopup.style.border = '1px solid black';
            imagePopup.style.backgroundColor = 'white';
            imagePopup.style.padding = '10px';
            imagePopup.style.zIndex = 1000;

            const image = document.createElement('img');
            image.src = imageUrl;
            image.style.maxWidth = '150px';
            imagePopup.appendChild(image);

            document.body.appendChild(imagePopup);

            a.addEventListener('mouseover', function(event) {
                imagePopup.style.display = 'block';
                imagePopup.style.top = `${event.pageY + 10}px`;
                imagePopup.style.left = `${event.pageX + 10}px`;
            });

            a.addEventListener('mouseout', function() {
                imagePopup.style.display = 'none';
            });

            const removeButton = document.createElement('button');
            removeButton.textContent = '−';
            removeButton.style.marginLeft = '10px';

            removeButton.addEventListener('click', function() {
                ul.removeChild(li);
                removeFromStorage(href);
            });

            li.appendChild(removeButton);
            li.style.marginBottom = '10px';
            a.style.textDecoration = 'none';
            a.style.color = '#4a0074';
            ul.appendChild(li);
        });
    }

    // Функція для додавання посилання до localStorage
    function addToStorage(href, text, imageUrl) {
        const storedLinks = JSON.parse(localStorage.getItem('links')) || [];
        storedLinks.push({ href, text, imageUrl });
        localStorage.setItem('links', JSON.stringify(storedLinks));
    }

    // Функція для видалення посилання з localStorage
    function removeFromStorage(href) {
        const storedLinks = JSON.parse(localStorage.getItem('links')) || [];
        const updatedLinks = storedLinks.filter(link => link.href !== href);
        localStorage.setItem('links', JSON.stringify(updatedLinks));
    }

    // Відображення посилань з localStorage при завантаженні
    renderListFromStorage();

    titles.forEach(title => {
        const addButton = document.createElement('button');
        addButton.textContent = 'Додати в список';
        addButton.style.marginBottom = '16px';
        addButton.style.color = 'white';
        addButton.style.backgroundColor = '#4a0074';
        addButton.style.padding = '8px';
        addButton.style.border = 'none';
        addButton.style.fontWeight = 'bold';
        addButton.style.fontSize = '1rem';
        addButton.style.fontFamily = "Roboto Condensed', sans-serif";
        addButton.style.outline = 'solid 1px grey';
        addButton.style.boxShadow = '10px 5px 5px grey';
        addButton.style.borderRadius = '10px';
        addButton.style.cursor = 'pointer';

        addButton.addEventListener('click', function() {
            const link = title.querySelector('a').href;
            const linkText = title.querySelector('a').textContent;

            // Отримуємо зображення з найближчого елемента з класом .main-img
            const parentDiv = title.closest('.news');
            const imageElement = parentDiv.querySelector('img.main-img');
            const imageUrl = imageElement ? imageElement.src : ''; // Отримуємо src зображення

            const delimiter = '/';
            const index = linkText.indexOf(delimiter);
            const trimmedText = index !== -1 ? linkText.substring(0, index).trim() : linkText.trim();

            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = link;
            a.textContent = trimmedText;
            li.appendChild(a);

            const imagePopup = document.createElement('div');
            imagePopup.style.position = 'absolute';
            imagePopup.style.display = 'none';
            imagePopup.style.border = '1px solid black';
            imagePopup.style.backgroundColor = 'white';
            imagePopup.style.padding = '10px';
            imagePopup.style.zIndex = 1000;

            const image = document.createElement('img');
            image.src = imageUrl;
            image.style.maxWidth = '150px';
            imagePopup.appendChild(image);

            document.body.appendChild(imagePopup);

            a.addEventListener('mouseover', function(event) {
                imagePopup.style.display = 'block';
                imagePopup.style.top = `${event.pageY + 10}px`;
                imagePopup.style.left = `${event.pageX + 10}px`;
            });

            a.addEventListener('mouseout', function() {
                imagePopup.style.display = 'none';
            });

            const removeButton = document.createElement('button');
            removeButton.textContent = '−';
            removeButton.style.marginLeft = '10px';

            removeButton.addEventListener('click', function() {
                ul.removeChild(li);
                removeFromStorage(link);
            });

            li.appendChild(removeButton);
            li.style.marginBottom = '10px';
            a.style.textDecoration = 'none';
            a.style.color = 'blue';
            ul.appendChild(li);

            addToStorage(link, trimmedText, imageUrl);
        });

        title.appendChild(addButton);
    });

    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Згорнути/Розгорнути список';
    toggleButton.style.position = 'fixed';
    toggleButton.style.top = '20px';
    toggleButton.style.right = '50px';
    toggleButton.style.backgroundColor = '#4a0074';
    toggleButton.style.borderRadius = '10px';
    toggleButton.style.padding = '8px';
    toggleButton.style.color = 'white';
    toggleButton.style.border = 'none';
    toggleButton.style.fontWeight = 'bold';
    toggleButton.style.fontSize = '1rem';
    toggleButton.style.fontFamily = "Roboto Condensed', sans-serif";
    toggleButton.style.outline = 'solid 1px grey';
    toggleButton.style.boxShadow = '10px 5px 5px grey';
    toggleButton.style.zIndex = 1000;
    toggleButton.style.cursor = 'pointer';

    document.body.appendChild(toggleButton);

    toggleButton.addEventListener('click', function() {
        if (ul.style.display === 'none') {
            ul.style.display = 'block';
        } else {
            ul.style.display = 'none';
        }
    });
});
