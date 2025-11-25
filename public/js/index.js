const home_list = document.getElementById('home-list');

const token = localStorage.getItem('token');

if (token) {
    console.log(token)
    home_list.innerHTML += `<li id="btn-logout" class="center-item-list">
        <button class="btn-outline btn-outline-danger">LogOut</button>
    </li>`
}

document.getElementById('btn-logout')?.addEventListener('click', () => {
    localStorage.removeItem('token')
    window.location.href = '/';
})