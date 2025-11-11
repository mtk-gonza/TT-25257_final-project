function toggleSection(id) {
    const section = document.getElementById(id);
    const header = section.previousElementSibling; // el .section-header
    const indicator = header.querySelector('.section-indicator');

    section.classList.toggle('hidden');

    if (section.classList.contains('hidden')) {
        indicator.textContent = '▶';
    } else {
        indicator.textContent = '▼';
    }
}

function toggleEndpoint(id) {
    const details = document.getElementById(id);
    const summary = details.previousElementSibling;
    const indicator = summary.querySelector('.toggle-indicator');

    details.classList.toggle('hidden');

    if (details.classList.contains('hidden')) {
        indicator.textContent = '▶';
    } else {
        indicator.textContent = '▼';
    }
}