document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');

    // Find all elements with the class 'title_left'
    const titles = document.querySelectorAll('.title_left');

    // Get all elements with the class 'main-img' and remove the 'filter' style
    const coversCollection = document.getElementsByClassName('main-img');
    const covers = Array.from(coversCollection);
    console.log(covers);
    covers.forEach((e) => { e.style.removeProperty('filter') });

    // Create <ul> element with specific styling
    const ul = document.createElement('ul');
    ul.classList.add('positioned-list'); // Add class for styling
    Object.assign(ul.style, {
        position: 'fixed',
        top: '50px',
        right: '50px',
        borderRadius: '5px',
        listStyleType: 'none',
        padding: '1rem',
        backgroundColor: 'white',
        zIndex: 1000,
        outline: 'solid 1px grey',
        boxShadow: '10px 5px 5px grey',
    });

    // Add <ul> to the page
    document.body.appendChild(ul);

    // Function to render the list from localStorage
    function renderListFromStorage() {
        const storedLinks = JSON.parse(localStorage.getItem('links')) || [];
        storedLinks.forEach(({ href, text, imageUrl }) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = href;
            a.textContent = text; 
            li.appendChild(a);

            // Create an image popup on hover
            const imagePopup = document.createElement('div');
            Object.assign(imagePopup.style, {
                position: 'absolute',
                display: 'none',
                border: '1px solid black',
                backgroundColor: 'white',
                padding: '10px',
                zIndex: 1000,
            });

            const image = document.createElement('img');
            image.src = imageUrl;
            image.style.maxWidth = '150px';
            imagePopup.appendChild(image);
            document.body.appendChild(imagePopup);

            // Show and hide the image popup on hover
            a.addEventListener('mouseover', function(event) {
                imagePopup.style.display = 'block';
                imagePopup.style.top = `${event.pageY + 10}px`;
                imagePopup.style.left = `${event.pageX + 10}px`;
            });

            a.addEventListener('mouseout', function() {
                imagePopup.style.display = 'none';
            });

            // Create and append remove button for each list item
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

    // Function to add a link to localStorage
    function addToStorage(href, text, imageUrl) {
        const storedLinks = JSON.parse(localStorage.getItem('links')) || [];
        storedLinks.push({ href, text, imageUrl });
        localStorage.setItem('links', JSON.stringify(storedLinks));
    }

    // Function to remove a link from localStorage
    function removeFromStorage(href) {
        const storedLinks = JSON.parse(localStorage.getItem('links')) || [];
        const updatedLinks = storedLinks.filter(link => link.href !== href);
        localStorage.setItem('links', JSON.stringify(updatedLinks));
    }

    // Display links from localStorage when the page loads
    renderListFromStorage();

    // Add button to each title for adding to the list
    titles.forEach(title => {
        const addButton = document.createElement('button');
        addButton.textContent = 'Add to list';
        Object.assign(addButton.style, {
            marginBottom: '16px',
            color: 'white',
            backgroundColor: '#4a0074',
            padding: '8px',
            border: 'none',
            fontWeight: 'bold',
            fontSize: '1rem',
            fontFamily: "'Roboto Condensed', sans-serif",
            outline: 'solid 1px grey',
            boxShadow: '10px 5px 5px grey',
            borderRadius: '10px',
            cursor: 'pointer',
        });

        // On button click, add the link to the list and localStorage
        addButton.addEventListener('click', function() {
            const link = title.querySelector('a').href;
            const linkText = title.querySelector('a').textContent;

            // Get the image from the closest element with class 'main-img'
            const parentDiv = title.closest('.news');
            const imageElement = parentDiv.querySelector('img.main-img');
            const imageUrl = imageElement ? imageElement.src : ''; 

            // Trim text before adding it to the list
            const delimiter = '/';
            const index = linkText.indexOf(delimiter);
            const trimmedText = index !== -1 ? linkText.substring(0, index).trim() : linkText.trim();

            // Create and append a new list item
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = link;
            a.textContent = trimmedText;
            li.appendChild(a);

            // Create an image popup for hover effect
            const imagePopup = document.createElement('div');
            Object.assign(imagePopup.style, {
                position: 'absolute',
                display: 'none',
                border: '1px solid black',
                backgroundColor: 'white',
                padding: '10px',
                zIndex: 1000,
            });

            const image = document.createElement('img');
            image.src = imageUrl;
            image.style.maxWidth = '150px';
            imagePopup.appendChild(image);
            document.body.appendChild(imagePopup);

            // Display and hide the popup on hover
            a.addEventListener('mouseover', function(event) {
                imagePopup.style.display = 'block';
                imagePopup.style.top = `${event.pageY + 10}px`;
                imagePopup.style.left = `${event.pageX + 10}px`;
            });

            a.addEventListener('mouseout', function() {
                imagePopup.style.display = 'none';
            });

            // Add a remove button for each list item
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

            // Add the link and image to localStorage
            addToStorage(link, trimmedText, imageUrl);
        });

        title.appendChild(addButton);
    });

    // Create a toggle button to show/hide the list
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Toggle list';
    Object.assign(toggleButton.style, {
        position: 'fixed',
        top: '20px',
        right: '50px',
        backgroundColor: '#4a0074',
        borderRadius: '10px',
        padding: '8px',
        colour: 'white',
        border: 'none',
        fontWeight: 'bold',
        fontSize: '1rem',
        fontFamily: "'Roboto Condensed', sans-serif",
        outline: 'solid 1px grey',
        boxShadow: '10px 5px 5px grey',
        zIndex: 1000,
        cursor: 'pointer',
    });

    document.body.appendChild(toggleButton);

    // Toggle the visibility of the list
    toggleButton.addEventListener('click', function() {
        ul.style.display = (ul.style.display === 'none') ? 'block' : 'none';
    });
});
