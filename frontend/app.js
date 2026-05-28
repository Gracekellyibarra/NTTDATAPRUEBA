const URL_API = 'http://localhost:3000/api/users';
const btnLoad = document.getElementById('btn-load');
const loadingDiv = document.getElementById('loading');
const tableUsers = document.getElementById('users-table');
const usersBody = document.getElementById('users-body');
const searchInput = document.getElementById('search-input');
const lifecycleFilter = document.getElementById('lifecycle-filter');

let allUsers = []; 

async function fetchUsers() {
    try {
        loadingDiv.style.display = 'block';
        tableUsers.classList.add('hidden');
        usersBody.innerHTML = '';
        searchInput.value = ''; 
        lifecycleFilter.value = 'todos'; // Reiniciar filtro

        const response = await fetch(URL_API);
        const result = await response.json();

        if (result.success) {
            allUsers = result.data;
            renderUsers(allUsers);
        }
    } catch (error) {
        loadingDiv.innerText = 'Error al conectar con el servidor backend.';
    } finally {
        loadingDiv.style.display = 'none';
    }
}

function renderUsers(users) {
    usersBody.innerHTML = ''; 
    
    if (users.length === 0) {
        usersBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#94a3b8; padding:30px;">No se encontraron resultados para los filtros seleccionados</td></tr>`;
        tableUsers.classList.remove('hidden');
        return;
    }

    users.forEach(user => {
        const row = document.createElement('tr');
        const genderClass = user.gender === 'Femenino' ? 'female' : 'male';

        // Estilos dinámicos para las etiquetas de etapas de vida
        let lifecycleBadgeColor = '#e2e8f0';
        let lifecycleTextColor = '#334155';
        if (user.lifecycle === 'Universitario / Joven') { lifecycleBadgeColor = '#e0f2fe'; lifecycleTextColor = '#0369a1'; }
        else if (user.lifecycle === 'Adulto Joven') { lifecycleBadgeColor = '#f3e8ff'; lifecycleTextColor = '#6b21a8'; }
        else if (user.lifecycle === 'Adulto Pleno') { lifecycleBadgeColor = '#fef3c7'; lifecycleTextColor = '#92400e'; }

        row.innerHTML = `
            <td>
                <div class="user-info">
                    <img src="${user.picture}" class="avatar" alt="${user.name}">
                    <span class="user-name">${user.name}</span>
                </div>
            </td>
            <td><span class="badge ${genderClass}">${user.gender}</span></td>
            <td>
                <span class="badge" style="background-color: ${lifecycleBadgeColor}; color: ${lifecycleTextColor};">
                    ${user.lifecycle} (${user.age} años)
                </span>
            </td>
            <td>${user.location}</td>
            <td><a href="mailto:${user.email}" class="email-link">${user.email}</a></td>
        `;
        usersBody.appendChild(row);
    });
    tableUsers.classList.remove('hidden');
}

// Función unificada para aplicar ambos filtros al mismo tiempo
function aplicarFiltros() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedLifecycle = lifecycleFilter.value;

    const filtered = allUsers.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm) || 
                              user.email.toLowerCase().includes(searchTerm) || 
                              user.location.toLowerCase().includes(searchTerm);
                              
        const matchesLifecycle = selectedLifecycle === 'todos' || user.lifecycle === selectedLifecycle;

        return matchesSearch && matchesLifecycle;
    });

    renderUsers(filtered);
}

// Escuchar eventos de entrada
searchInput.addEventListener('input', aplicarFiltros);
lifecycleFilter.addEventListener('change', aplicarFiltros);

btnLoad.addEventListener('click', fetchUsers);
document.addEventListener('DOMContentLoaded', fetchUsers);