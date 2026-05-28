const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Función auxiliar para calcular la etapa de vida según la edad
function obtenerEtapaVida(edad) {
    if (edad >= 18 && edad <= 25) return 'Universitario / Joven';
    if (edad >= 26 && edad <= 40) return 'Adulto Joven';
    if (edad >= 41 && edad <= 60) return 'Adulto Pleno';
    return 'Adulto Mayor';
}

app.get('/api/users', async (req, res) => {
    try {
        const response = await axios.get('https://randomuser.me/api/?results=10');
        const users = response.data.results;

        const formattedUsers = users.map(user => {
            const edad = user.dob.age;
            return {
                name: `${user.name.first} ${user.name.last}`,
                gender: user.gender === 'female' ? 'Femenino' : 'Masculino',
                location: `${user.location.city}, ${user.location.country}`,
                email: user.email,
                dob: user.dob.date.split('T')[0],
                age: edad,
                // 👇 NUEVO CAMPO CALCULADO DINÁMICAMENTE
                lifecycle: obtenerEtapaVida(edad),
                picture: user.picture.large
            };
        });

        res.json({ success: true, data: formattedUsers });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});