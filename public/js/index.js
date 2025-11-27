const home_list = document.getElementById('home-list');

const token = localStorage.getItem('token');

if (token) {
    home_list.innerHTML += `
        <li id="btn-logout" class="center-item-list">
            <button class="btn-outline btn-outline-danger">LogOut</button>
        </li>
    `
} else {
    home_list.innerHTML += `
        <li class="center-item-list">
            <a class="btn-outline btn-outline-primary" href="http://localhost:3000/login">Login</a>
        </li>
        <li class="center-item-list">
            <a class="btn-outline btn-outline-primary" href="http://localhost:3000/register">register</a>
        </li>
    `
}

document.getElementById('btn-logout')?.addEventListener('click', () => {
    localStorage.removeItem('token')
    window.location.href = '/';
})